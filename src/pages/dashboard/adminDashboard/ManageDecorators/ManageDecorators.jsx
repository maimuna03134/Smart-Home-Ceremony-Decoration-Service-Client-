import useAuth from "../../../../hooks/useAuth";
import DecoratorRequestsDataRow from "../../../../components/Dashboard/tablerows/DecoratorRequestsDataRow";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../shared/loader/Loader";
import useDemoProtection from "../../../../hooks/useDemoProtection";
import { FaLock } from "react-icons/fa";


const ManageDecorators = () => {
  const { isDemoAccount,checkActionPermission } = useDemoProtection();
  const { user } = useAuth();
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["decorator-requests", user?.email],
    queryFn: async () => {
      const result = await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/decorators`
      );
      return result.data;
    },
  });
  console.log(requests);

  if (isLoading) return <Loader />;
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-3xl text-primary font-semibold text-center">
          Decorators List
        </h2>
        <h2 className="text-xl text-gray-800 ">
          Total Decorators : {requests.length}
        </h2>
        {isDemoAccount && (
          <div className="alert alert-warning flex items-center gap-2 mt-4 mb-4">
            <FaLock />
            <span>
              Demo Admin - You can view everything but cannot make changes
            </span>
          </div>
        )}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Email
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    District
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Work Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <DecoratorRequestsDataRow
                    refetch={refetch}
                    key={req._id}
                    req={req}
                    isDemoAccount={isDemoAccount} 
                    checkActionPermission={checkActionPermission} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDecorators;
