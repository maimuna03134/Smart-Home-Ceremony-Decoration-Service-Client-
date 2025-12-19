import axios from "axios";
// import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";


const DecoratorRequestsDataRow = ({
  req, refetch
}) => {
    // const {user}=useAuth()
  const handleRoleUpdate = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/update-role`, {
        email: req?.email,
        role: "decorator",
      });
      toast.success("Role Updated!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 ">
                  {req?.email}
              </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={handleRoleUpdate}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Make Seller</span>
        </span>
      </td>
    </tr>
  );
};

export default DecoratorRequestsDataRow;
