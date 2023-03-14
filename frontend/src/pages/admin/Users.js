import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, updateUser } from "../../app/features/UsersSlice";
import SearchBar from "../../components/admin/SearchBar";
import SelectLimit from "../../components/admin/SelectLimit";
import UsersTable from "../../components/admin/UsersTable";
import ErrorMessage from "../../components/ErrorMessage";
import Paginate from "../../components/Paginate";
import Spiner from "../../components/Spiner";

const Users = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.admin);
  const { loading, users, total, error } = useSelector((state) => state.users);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const contoler = new AbortController();
    const signal = contoler.signal;

    dispatch(getUsers({ token, signal, page, search, limit }));

    return () => {
      contoler.abort();
    };
  }, [dispatch, token, page, search, limit]);

  const handleSearch = (data) => {
    setSearch(data);
  };

  const handleLimit = (limit) => {
    setPage(1);
    setLimit(limit);
  };

  const handleStatus = (status, _id) => {
    const newStatus = status === "active" ? "block" : "active";
    const formData = new FormData();

    formData.append("status", newStatus);

    dispatch(updateUser({ formData, _id, token }));
  };

  if (loading) return <Spiner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="card mb-4 p-3">
          <div className="mb-3">
            <Link className="btn btn-sm btn-primary" to={"/admin/users/add"}>
              Add User
            </Link>
          </div>
          <div className="row g-2">
            <div className="col-sm-6 d-flex justify-content-between">
              <SelectLimit limit={limit} handleLimit={handleLimit} />
            </div>
            <div className="col-sm-6">
              <SearchBar
                placeholder={"Search User name"}
                onSearch={handleSearch}
              />
            </div>
          </div>

          {users &&
            (!users.length ? (
              <div className="mt-3 text-center">No User Found</div>
            ) : (
              <>
                <UsersTable users={users} handleStatus={handleStatus} />
                <Paginate
                  page={page}
                  setPage={setPage}
                  total={total}
                  limit={limit}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Users;
