import { configureStore } from "@reduxjs/toolkit";

import adminAuth from "./features/adminAuthSlice";
import UsersSlice from "./features/UsersSlice";

const store = configureStore({
  reducer: {
    admin: adminAuth,
    users: UsersSlice,
  },
});

export default store;
