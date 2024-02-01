import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";

import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { toast } from "react-toastify";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  function addClientHandler(e) {
    e.preventDefault();

    addClient(name, email, phone);

    toast.success("Added client...");

    setName("");
    setEmail("");
    setPhone("");
  }

  return (
    <div className="my-10">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-pink-800 hover:bg-pink-500 text-white"
        onClick={() => document.getElementById("addClientModal").showModal()}
      >
        <FaUser /> Add Client
      </button>
      <dialog
        id="addClientModal"
        className="modal modal-center sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-3xl text-pink-700">Add Client</h3>

          <form onSubmit={addClientHandler} className="my-2">
            <div className="form-control mt-4 pb-4">
              <label className="mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="input input-bordered w-full text-white"
              />
            </div>
            <div className="form-control pb-4">
              <label className="mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="john@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="input input-bordered w-full text-white"
              />
            </div>
            <div className="form-control pb-4">
              <label className="mb-2 text-sm font-medium">Phone</label>
              <input
                type="text"
                placeholder="9633424813"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="input input-bordered w-full text-white"
              />
            </div>

            <div className="form-control">
              <button className="btn bg-pink-800 hover:bg-pink-500 text-base text-white">
                <IoIosPersonAdd />
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
