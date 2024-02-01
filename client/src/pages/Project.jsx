import { BiExit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import { FaTrashAlt } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { toast } from "react-toastify";
import EditProjectModal from "../components/EditProjectModal";

export default function Project() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id,
    },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  function deleteProjectHandler() {
    deleteProject(id);
    toast.success("Deleted project successfully...");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-pink-600">Something went wrong...</h1>;
  }

  return (
    <>
      {!loading && !error && data.project && (
        <div className="card w-full bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl">{data.project.name}</h2>
            <p className="text-xl">{data.project.description}</p>
            <p className="text-md mb-10">
              <span>Status: </span>
              <small className="text-pink-800 font-semibold">
                {data.project.status}
              </small>
            </p>

            <ClientInfo client={data.project.client} />

            <div className="mt-10 card-actions justify-end gap-6">
              <EditProjectModal project={data.project} />
              <button
                onClick={deleteProjectHandler}
                className="btn bg-pink-700 hover:bg-pink-800 text-white"
              >
                <FaTrashAlt className="text-xl" />
                Delete Project
              </button>
              <Link to="/">
                <button className="btn bg-pink-700 hover:bg-pink-800 text-white">
                  <BiExit className="text-xl" />
                  Go back
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
