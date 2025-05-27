import { axiosInstance } from "../axios/axios";

export const getCurrentUser = async () => {
  return await axiosInstance.get("/auth/getCurrentUser", {
    withCredentials: true,
  });
};
export const signUpUser = async (formData) => {
  return await axiosInstance.post("/auth/signup", formData);
};
export const signInUser = async (formData) => {
  return await axiosInstance.post("/auth/signin", formData);
};
export const verfiyCodeForSignIn = async (formData) => {
  return await axiosInstance.post("/auth/verifyOTPSignIn", formData, {
    withCredentials: true,
  });
};
export const forgetPassword = async (email) => {
  return await axiosInstance.post("/auth/forgetPassword", { email });
};
export const verfiyCodeForForgetPassword = async (formData) => {
  return await axiosInstance.post("/auth/verifyOTPForgetPassword", formData, {
    withCredentials: true,
  });
};
