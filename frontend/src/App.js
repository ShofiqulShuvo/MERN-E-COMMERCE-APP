import React from "react";
import Index from "./routes/Index";

// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Index />
      <ToastContainer />
    </>
  );
};

export default App;
