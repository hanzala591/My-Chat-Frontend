import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
  },
  reducers: {
    signin: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { signin } = authSlice.actions;

export default authSlice.reducer;
