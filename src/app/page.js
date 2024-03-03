import { ToastContainer } from "react-toastify";
import Nav_bar from "../components/navigation/nav_bar";

import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  return (
    <main className="h-auto  overflow-x-hidden">
      <ToastContainer />
      <Nav_bar />
    </main>
  );
}
