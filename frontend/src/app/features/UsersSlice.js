import { toast } from "react-toastify";
import {
  BASE_URL,
  getConfigureToken,
  postConfigureMultipartToken,
  putConfigureMultipartToken,
} from "../../api/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ token, signal }) => {
    const res = await fetch(
      `${BASE_URL}/user`,
      getConfigureToken(token, signal)
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  }
);

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async ({ token, id, signal }) => {
    const res = await fetch(
      `${BASE_URL}/user/${id}`,
      getConfigureToken(token, signal)
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ formData, token }) => {
    const res = await fetch(
      `${BASE_URL}/user/add`,
      postConfigureMultipartToken(formData, token)
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ formData, _id, token }) => {
    const res = await fetch(
      `${BASE_URL}/user/${_id}`,
      putConfigureMultipartToken(formData, token)
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: true,
    users: null,
    error: false,
    singleLoading: true,
    singleUser: null,
    singleError: false,
  },
  extraReducers: (builder) => {
    // get users
    builder.addCase(getUsers.pending, (state) => {
      if (state.error) {
        state.loading = true;
      }
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.error = false;
      state.users = data;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      const error = action.error;

      if (error.name !== "AbortError") {
        state.error = error.message;
        state.loading = false;
      }
    });

    // get single users
    builder.addCase(getSingleUser.pending, (state) => {
      state.singleLoading = true;
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.singleLoading = false;
      state.singleError = false;
      state.singleUser = data;
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      const error = action.error;

      if (error.name !== "AbortError") {
        state.singleError = error.message;
        state.singleLoading = false;
      }
    });

    // add a user
    builder.addCase(addUser.pending, () => {
      toast.dismiss();
      toast.info("Adding user...");
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      const { data } = action.payload;

      if (state.users) {
        state.users = [data, ...state.users];
      } else {
        state.users = [data];
      }
      toast.dismiss();
      toast.success("User Added");
    });
    builder.addCase(addUser.rejected, (state, action) => {
      const error = action.error;

      toast.dismiss();
      toast.error(error.message);
    });

    // update a user
    builder.addCase(updateUser.pending, () => {
      toast.dismiss();
      toast.info("Updating user...");
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { data } = action.payload;
      const { _id } = data;

      const targetUser = state.users.findIndex((user) => user._id === _id);

      if (targetUser > -1) {
        state.users[targetUser] = { ...state.users[targetUser], ...data };
      } else {
        state.users.unshift(data);
      }
      toast.dismiss();
      toast.success("User Updated");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      const error = action.error;

      toast.dismiss();
      toast.error(error.message);
    });
  },
  reducers: {},
});

export default usersSlice.reducer;
