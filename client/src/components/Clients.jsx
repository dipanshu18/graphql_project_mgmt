import Spinner from "./Spinner";
import ClientRow from "./ClientRow";

import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-pink-800">
        <span>Something went wrong!</span>
      </div>
    );
  }

  return (
    <>
      {!loading && !error && data && (
        <>
          <h1 className="my-6 text-2xl lg:text-4xl font-bold">Clients</h1>
          <div className="overflow-x-auto bg-base-300 rounded-lg shadow-xl shadow-base-300">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((client) => (
                  <ClientRow key={client.id} client={client} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
