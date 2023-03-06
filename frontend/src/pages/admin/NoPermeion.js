import React from "react";
import { useNavigate } from "react-router-dom";

const NoPermeion = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className="container">
        <section className="section error-404 d-flex flex-column align-items-center justify-content-center">
          <h1>401</h1>
          <h2>You don't have access this task</h2>
          <button className="btn" onClick={handleBack}>
            Back to Dashboard
          </button>
        </section>
      </div>
    </>
  );
};

export default NoPermeion;
