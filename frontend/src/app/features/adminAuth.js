import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BASE_URL, putConfigureMultipartToken } from "../../api/api";

export const updateProfile = createAsyncThunk(
  "admin/updateProfile",
  async ([updateData, token, id]) => {
    const res = await fetch(
      `${BASE_URL}/user/${id}`,
      putConfigureMultipartToken(updateData, token)
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    } else {
      return data;
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    isLoggedIn: undefined,
    token: null,
    profileInfo: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, () => {
      toast.dismiss();
      toast.info("updating profile");
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.profileInfo = { ...state.profileInfo, ...data };

      toast.dismiss();
      toast.success("profile update successfull");
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });
  },
  reducers: {
    login: (state, action) => {
      const { data, token } = action.payload;

      localStorage.setItem("mern-ecommerce-admin-token", JSON.stringify(token));

      state.token = token;
      state.profileInfo = data;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem("mern-ecommerce-admin-token");

      state.isLoggedIn = false;
      state.token = null;
      state.profileInfo = null;
    },
  },
});

export const { login, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
