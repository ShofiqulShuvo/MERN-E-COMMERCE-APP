import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
import { login, logout } from "../app/features/adminAuth";

const useAdminAuth = () => {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("mern-ecommerce-admin-token"));

  const checkToken = async () => {
    const res = await fetch(`${BASE_URL}/user/tokenlogin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok || data.message === "jwt expired") {
      dispatch(logout);
    } else {
      dispatch(login(data));
    }
  };

  if (!token) {
    dispatch(logout());
  } else if (token) {
    checkToken();
  }
};

export default useAdminAuth;
