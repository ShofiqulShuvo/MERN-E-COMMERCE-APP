import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersTable = ({ users, handleStatus }) => {
  const { profileInfo } = useSelector((state) => state.admin);

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="table-responsive p-3">
            <div
              id="dataTableHover_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <table
                className="table align-items-center table-flush table-hover dataTable"
                id="dataTableHover"
                role="grid"
                aria-describedby="dataTableHover_info"
              >
                <thead className="thead-light">
                  <tr role="row">
                    <th
                      className="sorting_asc"
                      tabIndex="0"
                      aria-controls="dataTableHover"
                      rowSpan="1"
                      colSpan="1"
                      aria-sort="ascending"
                      aria-label="Name: activate to sort column descending"
                    >
                      Name
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTableHover"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Position: activate to sort column ascending"
                    >
                      Email
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTableHover"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Office: activate to sort column ascending"
                    >
                      Mobile
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTableHover"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Age: activate to sort column ascending"
                    >
                      Role
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTableHover"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Start date: activate to sort column ascending"
                    >
                      Update By
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTableHover"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Salary: activate to sort column ascending"
                    >
                      Status
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTableHover"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Salary: activate to sort column ascending"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const { _id, name, email, mobile, role, updateBy, status } =
                      user;
                    return (
                      <tr key={_id} role="row" className="odd">
                        <td>
                          <Link
                            className="text-decoration-none text-dark fw-bold px-3 py-2"
                            to={`/admin/users/${_id}`}
                          >
                            {name}
                          </Link>
                        </td>
                        <td>{email}</td>
                        <td>{mobile}</td>
                        <td>{role}</td>
                        <td>{updateBy ? updateBy.name : "---"}</td>
                        <td>{status}</td>
                        <td>
                          <button
                            type="button"
                            className={`btn btn-sm ${
                              status === "active" ? "btn-danger" : "btn-success"
                            }`}
                            onDoubleClick={() => handleStatus(status, _id)}
                            disabled={profileInfo.role !== "admin"}
                          >
                            {status === "active" ? "Block" : "Active"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="row">
                          <div className="col-sm-12 col-md-5">
                              <div
                              className="dataTables_info"
                              id="dataTableHover_info"
                              role="status"
                              aria-live="polite"
                              >
                              Showing 1 to 10 of 57 entries
                              </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                              <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="dataTableHover_paginate"
                              >
                              <ul className="pagination">
                                  <li
                                  className="paginate_button page-item previous disabled"
                                  id="dataTableHover_previous"
                                  >
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="0"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      Previous
                                  </a>
                                  </li>
                                  <li className="paginate_button page-item active">
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="1"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      1
                                  </a>
                                  </li>
                                  <li className="paginate_button page-item ">
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="2"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      2
                                  </a>
                                  </li>
                                  <li className="paginate_button page-item ">
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="3"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      3
                                  </a>
                                  </li>
                                  <li className="paginate_button page-item ">
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="4"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      4
                                  </a>
                                  </li>
                                  <li className="paginate_button page-item ">
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="5"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      5
                                  </a>
                                  </li>
                                  <li className="paginate_button page-item ">
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="6"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      6
                                  </a>
                                  </li>
                                  <li
                                  className="paginate_button page-item next"
                                  id="dataTableHover_next"
                                  >
                                  <a
                                      href="#"
                                      aria-controls="dataTableHover"
                                      data-dt-idx="7"
                                      tabIndex="0"
                                      className="page-link"
                                  >
                                      Next
                                  </a>
                                  </li>
                              </ul>
                              </div>
                          </div>
                          </div> */}
      </div>
    </>
  );
};

export default UsersTable;
