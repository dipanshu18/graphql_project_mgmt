/* eslint-disable react/prop-types */
import { PiIdentificationBadgeBold } from "react-icons/pi";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

export default function ClientInfo({ client }) {
  return (
    <div className="overflow-x-auto">
      <table className="table text-white">
        {/* head */}
        <thead>
          <tr>
            <th>Client Info</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <td className="flex items-center gap-4">
              <PiIdentificationBadgeBold className="text-pink-600" />{" "}
              {client.name}
            </td>
          </tr>
          <tr className="hover">
            <td className="flex items-center gap-4">
              <IoMail className="text-pink-600" />
              {client.email}
            </td>
          </tr>
          <tr className="hover">
            <td className="flex items-center gap-4">
              <FaPhoneAlt className="text-pink-600" />
              {client.phone}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
