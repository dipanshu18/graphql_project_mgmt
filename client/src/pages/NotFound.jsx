import { FaExclamationTriangle } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-5xl font-bold">Oops....</h1>
      <FaExclamationTriangle className="text-9xl text-pink-700" />
      <h2 className="text-3xl text-center md:text-left">
        The resource you are trying to access does not exist!
      </h2>
      <Link to="/" className="btn bg-pink-700 hover:bg-pink-600 text-white">
        <BiExit className="text-xl" />
        Go Back
      </Link>
    </div>
  );
}
