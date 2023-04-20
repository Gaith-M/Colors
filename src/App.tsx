import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
}

export default App;
