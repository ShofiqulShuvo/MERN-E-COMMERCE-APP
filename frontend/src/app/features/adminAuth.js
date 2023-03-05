import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    isLoggedIn: true,
  },
  reducers: {},
});

export default adminAuthSlice.reducer;
