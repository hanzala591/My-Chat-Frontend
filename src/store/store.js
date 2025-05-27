import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import messageReducer from "./messageSlice.js";
import userReducer from "./userSlice.js";
export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    user: userReducer,
  },
});
