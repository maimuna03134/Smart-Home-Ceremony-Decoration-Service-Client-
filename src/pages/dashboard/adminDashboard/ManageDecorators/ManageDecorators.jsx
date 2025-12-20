
import useAuth from "../../../../hooks/useAuth";
import DecoratorRequestsDataRow from "../../../../components/Dashboard/tablerows/DecoratorRequestsDataRow";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../shared/loader/Loader";

const ManageDecorators = () => {

     const { user } = useAuth();
     const {
       data: requests = [],
         isLoading,
       refetch
     } = useQuery({
       queryKey: ["decorator-requests", user?.email],
       queryFn: async () => {
         const result = await axios.get(
           `${import.meta.env.VITE_API_URL}/decorators`
         )
         return result.data;
       },
     });
     console.log(requests);

     if (isLoading) return <Loader/>;
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-3xl text-primary font-semibold">Decorator Pending Approval : {requests.length}</h2>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Email
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    District
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Work Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
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
