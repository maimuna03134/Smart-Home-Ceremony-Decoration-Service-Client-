import axios from "axios";
import { FaUserCheck, FaBan, FaUserPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const DecoratorRequestsDataRow = ({ req, refetch }) => {
  const updateDecoratorStatus = (decorator, status) => {
    const updateInfo = {
      status: status,
      email: decorator.email,
    };

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/decorators/${decorator._id}`,
        updateInfo
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Decorator status is set to ${status}.`,
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
          text: err?.response?.data?.message || "Something went wrong",
        });
      });
  };

  const handleApproval = (decorator) => {
    updateDecoratorStatus(decorator, "approved");
  };

  const handleRejection = (decorator) => {
    updateDecoratorStatus(decorator, "rejected");
  };

  const handleDisable = (decorator) => {
    Swal.fire({
      title: "Disable this decorator?",
      text: "The decorator won't be able to take new bookings",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, disable",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDecoratorStatus(decorator, "disabled");
      }
    });
  };

  const handleEnable = (decorator) => {
    updateDecoratorStatus(decorator, "approved");
  };

  const handleDeleteDecorator = (decorator) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This decorator will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/decorators/${decorator._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Decorator deleted successfully!",
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
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{req?.email}</p>
      </td>

      {/* Name */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        {req?.name || "N/A"}
      </td>

      {/* District */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        {req?.district || "N/A"}
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            req?.status === "approved"
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

      {/* Work Status */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            req?.workStatus === "available"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {req?.workStatus || "N/A"}
        </span>
      </td>

      {/* Action - Conditional buttons based on status */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <div className="flex gap-2">
          {/* For Pending Decorators */}
          {req?.status === "pending" && (
            <>
              <button
                onClick={() => handleApproval(req)}
                className="btn btn-sm btn-success"
                title="Approve"
              >
                <FaUserCheck />
              </button>
              <button
                onClick={() => handleRejection(req)}
                className="btn btn-sm btn-warning"
                title="Reject"
              >
                <IoPersonRemoveSharp />
              </button>
            </>
          )}

          {/* For Approved Decorators */}
          {req?.status === "approved" && (
            <button
              onClick={() => handleDisable(req)}
              className="btn btn-sm btn-warning"
              title="Disable Account"
            >
              <FaBan />
            </button>
          )}

          {/* For Disabled Decorators */}
          {req?.status === "disabled" && (
            <button
              onClick={() => handleEnable(req)}
              className="btn btn-sm btn-success"
              title="Enable Account"
            >
              <FaUserPlus />
            </button>
          )}

          {/* Delete button (available for all) */}
          <button
            onClick={() => handleDeleteDecorator(req)}
            className="btn btn-sm btn-error"
            title="Delete"
          >
            <FaTrashCan />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DecoratorRequestsDataRow;
