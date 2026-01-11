import { FaUserCheck, FaBan, FaUserPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DecoratorRequestsDataRow = ({ req, refetch, isDemoAccount, checkActionPermission, isDark }) => {
  const axiosSecure = useAxiosSecure();

  const updateDecoratorStatus = async (decorator, status, actionName) => {
    // Demo protection
    if (!checkActionPermission(actionName)) return;

    const updateInfo = {
      status: status,
      email: decorator.email,
    };

    try {
      const res = await axiosSecure.patch(`/decorators/${decorator._id}`, updateInfo);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `✅ Decorator status set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err?.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleApproval = (decorator) => {
    updateDecoratorStatus(decorator, "approved", "approve_decorator");
  };

  const handleRejection = (decorator) => {
    updateDecoratorStatus(decorator, "rejected", "reject_decorator");
  };

  const handleDisable = (decorator) => {
    // Demo protection
    if (!checkActionPermission("disable_decorator")) return;

    Swal.fire({
      title: "Disable this decorator?",
      text: "The decorator won't be able to take new bookings",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, disable",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDecoratorStatus(decorator, "disabled", "disable_decorator");
      }
    });
  };

  const handleEnable = (decorator) => {
    updateDecoratorStatus(decorator, "approved", "enable_decorator");
  };

  const handleDeleteDecorator = (decorator) => {
    // Demo protection
    if (!checkActionPermission("delete_decorator")) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This decorator will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/decorators/${decorator._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "✅ Decorator deleted successfully!",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Could not delete decorator",
            });
          });
      }
    });
  };

  return (
    <tr className={`
      transition-colors duration-200 border-b
      ${isDark ? 'border-gray-700' : 'border-gray-200'}
    `}>
      <td className={`px-5 py-5 border-b text-sm ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{req?.email}</p>
      </td>

      <td className={`px-5 py-5 border-b text-sm ${
        isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-900'
      }`}>{req?.name || "N/A"}</td>

      <td className={`px-5 py-5 border-b text-sm ${
        isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-900'
      }`}>{req?.district || "N/A"}</td>

      <td className={`px-5 py-5 border-b text-sm ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${req?.status === "approved"
              ? "bg-green-100 text-green-800"
              : req?.status === "rejected"
                ? "bg-red-100 text-red-800"
                : req?.status === "disabled"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {req?.status || "pending"}
        </span>
      </td>

      <td className={`px-5 py-5 border-b text-sm ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${req?.workStatus === "available"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
            }`}
        >
          {req?.workStatus || "N/A"}
        </span>
      </td>

      <td className={`px-5 py-5 border-b text-sm ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex gap-2">
          {req?.status === "pending" && (
            <>
              <button
                onClick={() => handleApproval(req)}
                disabled={isDemoAccount}
                className={`btn btn-sm ${isDemoAccount 
                  ? "btn-disabled" 
                  : isDark 
                    ? "bg-green-600 hover:bg-green-700 text-white border-green-600" 
                    : "btn-success"
                }`}
                title={isDemoAccount ? "Demo mode" : "Approve"}
              >
                <FaUserCheck />
              </button>
              <button
                onClick={() => handleRejection(req)}
                disabled={isDemoAccount}
                className={`btn btn-sm ${isDemoAccount 
                  ? "btn-disabled" 
                  : isDark 
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600" 
                    : "btn-warning"
                }`}
                title={isDemoAccount ? "Demo mode" : "Reject"}
              >
                <IoPersonRemoveSharp />
              </button>
            </>
          )}

          {req?.status === "approved" && (
            <button
              onClick={() => handleDisable(req)}
              disabled={isDemoAccount}
              className={`btn btn-sm ${isDemoAccount 
                ? "btn-disabled" 
                : isDark 
                  ? "bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600" 
                  : "btn-warning"
              }`}
              title={isDemoAccount ? "Demo mode" : "Disable Account"}
            >
              <FaBan />
            </button>
          )}

          {req?.status === "disabled" && (
            <button
              onClick={() => handleEnable(req)}
              disabled={isDemoAccount}
              className={`btn btn-sm ${isDemoAccount 
                ? "btn-disabled" 
                : isDark 
                  ? "bg-green-600 hover:bg-green-700 text-white border-green-600" 
                  : "btn-success"
              }`}
              title={isDemoAccount ? "Demo mode" : "Enable Account"}
            >
              <FaUserPlus />
            </button>
          )}

          <button
            onClick={() => handleDeleteDecorator(req)}
            disabled={isDemoAccount}
            className={`btn btn-sm ${isDemoAccount 
              ? "btn-disabled" 
              : isDark 
                ? "bg-red-600 hover:bg-red-700 text-white border-red-600" 
                : "btn-error"
            }`}
            title={isDemoAccount ? "Demo mode" : "Delete"}
          >
            <FaTrashCan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DecoratorRequestsDataRow;