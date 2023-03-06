import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../app/features/UsersSlice";
import ErrorMessage from "../../components/ErrorMessage";
import Spiner from "../../components/Spiner";
import ProfilePic from "../../assets/profile.png";
import { dateConverter } from "../../utility/dateConverter";

const UserSingle = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.admin);
  const { singleUser, singleLoading, singleError } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    const contoler = new AbortController();
    const signal = contoler.signal;

    dispatch(getSingleUser({ token, id, signal }));

    return () => {
      contoler.abort();
    };

    // eslint-disable-next-line
  }, [id]);

  if (singleLoading) return <Spiner />;

  if (singleError) return <ErrorMessage error={singleError} />;

  return (
    <>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <img
                  src={singleUser.image ? singleUser.image.link : ProfilePic}
                  alt=""
                  className="rounded-circle"
                  style={{ height: "100px", width: "100px" }}
                />
                <h2>{singleUser.name}</h2>
                <h3>{singleUser.email}</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Overview
                    </button>
                  </li>

                  {/* <li className="nav-item">
                    <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                    >
                        Edit Profile
                    </button>
                    </li> */}

                  {/* <li className="nav-item">
                    <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                    >
                        Change Password
                    </button>
                    </li> */}
                </ul>
                <div className="tab-content pt-2">
                  {/* profile detail */}
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title">Profile Details</h5>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Name</div>
                      <div className="col-lg-9 col-md-8">{singleUser.name}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">
                        {singleUser.email}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Mobile</div>
                      <div className="col-lg-9 col-md-8">
                        {singleUser.mobile}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Role</div>
                      <div className="col-lg-9 col-md-8">{singleUser.role}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Status</div>
                      <div className="col-lg-9 col-md-8">
                        {singleUser.status}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Joined</div>
                      <div className="col-lg-9 col-md-8">
                        {dateConverter(singleUser.createdAt)}
                      </div>
                    </div>

                    {singleUser.updateBy && (
                      <>
                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            User Data Update At
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {dateConverter(singleUser.updatedAt)}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-3 col-md-4 label">
                            Update By
                          </div>
                          <div className="col-lg-9 col-md-8">
                            {singleUser.updateBy.name}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/*  Profile Edit  */}
                  {/* <div
                    className="tab-pane fade profile-edit pt-3"
                    id="profile-edit"
                    >
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                        <label
                            htmlFor="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            Profile Image
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <img
                            src={userImage ? userImage : ProfilePic}
                            alt=""
                            />
                        </div>
                        </div>
        
                        <div className="row mb-3">
                        <label
                            htmlFor="fullUserName"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            Change Image
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                            type="file"
                            id="fullUserName"
                            className="form-control"
                            accept={"image/png" && "image/jpg" && "image/jpeg"}
                            name="image"
                            onChange={handleImageChange}
                            />
                        </div>
                        </div>
        
                        <div className="row mb-3">
                        <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                            type="text"
                            id="fullName"
                            className="form-control"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>
        
                        <div className="row mb-3">
                        <label
                            htmlFor="profileEmail"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            Email
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                            id="profileEmail"
                            type="text"
                            className="form-control"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>
        
                        <div className="row mb-3">
                        <label
                            htmlFor="profileMobile"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            Mobile
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                            id="profileMobile"
                            type="text"
                            className="form-control"
                            name="mobile"
                            value={userInfo.mobile}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>
        
                        <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                        </div>
                    </form>
                    </div> */}

                  {/* Change Password */}
                  {/* <div
                    className="tab-pane fade pt-3"
                    id="profile-change-password"
                    >
                    <form onSubmit={handlePassChange}>
                        <div className="row mb-3">
                        <label
                            htmlFor="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            Current Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            name="password"
                            value={pass.password}
                            onChange={handlePasswordChange}
                            />
                        </div>
                        </div>
        
                        <div className="row mb-3">
                        <label
                            htmlFor="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            New Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                            id="newPassword"
                            type="password"
                            className="form-control"
                            name="newPassword"
                            value={pass.newPassword}
                            onChange={handlePasswordChange}
                            />
                        </div>
                        </div>
        
                        <div className="row mb-3">
                        <label
                            htmlFor="renewPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                        >
                            Re-enter New Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                            <input
                            id="renewPassword"
                            type="password"
                            className="form-control"
                            name="renewPassword"
                            value={pass.renewPassword}
                            onChange={handlePasswordChange}
                            />
                        </div>
                        </div>
        
                        <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Change Password
                        </button>
                        </div>
                    </form>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserSingle;
