import { GrGraphQl } from "react-icons/gr";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start text-pink-700">
        <GrGraphQl className="text-2xl" />
        <span className="btn btn-ghost text-xl font-extrabold">
          Project Mgmt
        </span>
      </div>
      {/* <div className="navbar-end gap-2">
        <button className="btn">Button</button>
        <button className="btn">Button</button>
      </div> */}
    </div>
  );
}
