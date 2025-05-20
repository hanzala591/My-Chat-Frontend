import { axiosInstance } from "@/axios/axios";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
  },
  reducers: {
    signin: (state, action) => {
      console.log(action.payload);
      state.authUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signin } = authSlice.actions;

export default authSlice.reducer;
