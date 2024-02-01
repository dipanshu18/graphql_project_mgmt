/* eslint-disable react/prop-types */
import { FaTrashAlt } from "react-icons/fa";

import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr className="hover">
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <th>
        <button
          onClick={deleteClient}
          className="btn hover:bg-red-800 text-white bg-red-600"
        >
          <FaTrashAlt />
        </button>
      </th>
    </tr>
  );
}
