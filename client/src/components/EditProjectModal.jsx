/* eslint-disable react/prop-types */
import { useState } from "react";

import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECT } from "../queries/projectQueries";

import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa";

export default function EditProjectModal({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  function updateProjectHandler(e) {
    e.preventDefault();

    updateProject(name, description, status);
    toast.success("Updated project details...");
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-pink-800 hover:bg-pink-500 text-white"
        onClick={() =>
          document.getElementById("editProjectDetailModal").showModal()
        }
      >
        <FaPen /> Edit Project Details
      </button>
      <dialog
        id="editProjectDetailModal"
        className="modal modal-center sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-3xl text-p  ink-700">
            Update Project Details
          </h3>

          <form onSubmit={updateProjectHandler} className="my-2">
            <div className="form-control mt-4 pb-4">
              <label className="mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder={project.name}
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="input input-bordered w-full text-white"
              />
            </div>
            <div className="form-control pb-4">
              <label className="mb-2 text-sm font-medium">Description</label>
              <textarea
                rows={5}
                placeholder={project.description}
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

            <div className="form-control">
              <button className="btn bg-pink-800 hover:bg-pink-500 text-base text-white">
                <FaPen />
                Update
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
    </>
  );
}
