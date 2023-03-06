import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, postConfigureJson } from "../../api/api";
import { login } from "../../app/features/adminAuth";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.admin);

  const initialState = { email: "", password: "" };
  const [loginData, setLoginData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.dismiss();
      toast.error("please enter email and password");
    } else {
      try {
        const res = await fetch(
          `${BASE_URL}/user/login`,
          postConfigureJson(loginData)
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        } else {
          dispatch(login(data));
          toast.dismiss();
          toast.success("login successfull");
          setLoginData(initialState);
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error.message);
      }
    }
  };

  if (isLoggedIn === true) return <Navigate to={"/admin"} />;

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-2 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your email &amp; password to login
                        </p>
                      </div>

                      <form
                        className="row g-3 needs-validation"
                        onSubmit={handleSubmit}
                      >
                        <div className="col-12">
                          <label htmlFor="adminemail" className="form-label">
                            Email
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="adminemail"
                              value={loginData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="adminPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="adminPassword"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        {/* <div className="col-12">
                          <p className="small mb-0">
                            Don't have account?{" "}
                            <a href="pages-register.html">Create an account</a>
                          </p>
                        </div> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
