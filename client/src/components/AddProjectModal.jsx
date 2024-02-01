import { useState } from "react";
import { FaDiagramProject } from "react-icons/fa6";

import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";

import { toast } from "react-toastify";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const { data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  function addClientHandler(e) {
    e.preventDefault();
    addProject(name, description, status, clientId);
    toast.success("Added project...");

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  }

  return (
    <div className="my-10">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-pink-800 hover:bg-pink-500 text-white"
        onClick={() => document.getElementById("addProjectModal").showModal()}
      >
        <FaDiagramProject /> Add Project
      </button>
      <dialog
        id="addProjectModal"
        className="modal modal-center sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-3xl text-pink-700">Add Project</h3>

          <form onSubmit={addClientHandler} className="my-2">
            <div className="form-control mt-4 pb-4">
              <label className="mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Web App"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="input input-bordered w-full text-white"
              />
            </div>
            <div className="form-control pb-4">
              <label className="mb-2 text-sm font-medium">Description</label>
              <textarea
                rows={5}
                placeholder="This is project that..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="textarea textarea-bordered w-full text-white"
              ></textarea>
            </div>
            <div className="form-control pb-4">
              <label className="mb-2 text-sm font-medium">Status</label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="select select-bordered w-full text-white"
              >
                <option value="new">Not Started</option>
                <option value="progress">Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-control pb-4">
              <label className="mb-2 text-sm font-medium">Client</label>
              <select
                onChange={(e) => setClientId(e.target.value)}
                value={clientId}
                className="select select-bordered w-full text-white"
              >
                <option>Select Client</option>
                {data &&
                  data.clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-control">
              <button className="btn bg-pink-800 hover:bg-pink-500 text-base text-white">
                <FaDiagramProject />
                Create
              </button>
            </div>
          </form>

          <small className="py-4">
            Press ESC key or click the button below to close
          </small>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-pink-800 hover:bg-pink-500 text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
