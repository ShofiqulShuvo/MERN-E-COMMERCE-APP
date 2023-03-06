import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className="container">
        <section className="section error-404 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          <button className="btn" onClick={handleBack}>
            Back to Dashboard
          </button>
        </section>
      </div>
    </>
  );
};

export default NotFound;
