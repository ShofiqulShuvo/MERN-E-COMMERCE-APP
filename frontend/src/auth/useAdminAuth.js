import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
import { login, logout } from "../app/features/adminAuthSlice";

const useAdminAuth = () => {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("mern-ecommerce-admin-token"));

  const checkToken = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/tokenlogin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || data.message === "jwt expired") {
        throw new Error();
      }

      dispatch(login(data));
    } catch (error) {
      if (error) {
        dispatch(logout());
      }
    }
  };

  if (!token) {
    dispatch(logout());
  } else if (token) {
    checkToken();
  }
};

export default useAdminAuth;
