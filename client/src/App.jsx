import AddClientModal from "./components/AddClientModal";
import Clients from "./components/Clients";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <AddClientModal />
        <Clients />
      </div>

      <ToastContainer autoClose={2000} />
    </>
  );
}
