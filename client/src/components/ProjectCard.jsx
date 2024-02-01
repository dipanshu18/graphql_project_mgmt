/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="card w-72 bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-normal">{project.name}</h2>
        <span className="text-sm">
          Status:{" "}
          <small className="text-pink-700">
            <strong>{project.status}</strong>
          </small>
        </span>
        <div className="card-actions justify-end mt-10">
          <Link to={`/projects/${project.id}`}>
            <button className="btn text-white bg-pink-700 hover:bg-pink-800">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
