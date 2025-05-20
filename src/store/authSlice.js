import { axiosInstance } from "@/axios/axios";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
  },
  reducers: {
    signup: async (state, action) => {
      axiosInstance
        .post("/auth/signup", action.payload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const { signup } = authSlice.actions;

export default authSlice.reducer;
