import { configureStore } from "@reduxjs/toolkit";
import adminAuth from "./features/adminAuth";

const store = configureStore({
  reducer: {
    admin: adminAuth,
  },
});

export default store;
