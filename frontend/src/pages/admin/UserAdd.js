import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../../app/features/UsersSlice";

const UserAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.admin);

  const initialstate = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
    role: "",
    image: null,
  };
  const [userData, setUserData] = useState(initialstate);
  const [viewImage, setViewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setViewImage(null);
      setUserData((prev) => ({ ...prev, image: null }));
    } else {
      const file = e.target.files[0];
      setViewImage(URL.createObjectURL(file));
      setUserData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.password2) {
      toast.dismiss();
      toast.error("password and re-password not same");
    } else {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("mobile", userData.mobile);
      formData.append("role", userData.role);

      if (userData.image) {
        formData.append("image", userData.image);
      }

      dispatch(addUser({ formData, token }))
        .unwrap(unwrapResult)
        .then((res) => {
          if (res.message === "success") {
            setUserData(initialstate);
            setViewImage(null);

            navigate("/admin/users");
          }
        });
    }
  };

  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="card mb-4 mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Add User</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="addusername" className="mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addusername"
                  placeholder="Enter name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="adduseremail" className="mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="adduseremail"
                  placeholder="Enter email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="adduseremobile" className="mb-1">
                  Mobile
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="adduseremobile"
                  placeholder="Enter mobile"
                  name="mobile"
                  value={userData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="adduserpass" className="mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="adduserpass"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="adduserrepass" className="mb-1">
                  Re-Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="adduserrepass"
                  placeholder="Password"
                  name="password2"
                  value={userData.password2}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3 mb-2">
                <label htmlFor="adduserselect" className="mb-2">
                  Select Role
                </label>
                <select
                  className="select2-single form-control"
                  id="adduserselect"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  required
                >
                  <option value=""> --- Select Role For User --- </option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-group mt-3 mb-2">
                <input
                  type="file"
                  className="form-control mb-2"
                  accept={"image/png" && "image/jpg" && "image/jpeg"}
                  onChange={handleImageChange}
                />
                {viewImage && (
                  <img
                    src={viewImage}
                    alt=""
                    style={{ height: "90px", width: "90px" }}
                  />
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary text-center w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdd;
