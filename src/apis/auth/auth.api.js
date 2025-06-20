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
  return await axiosInstance.post("/auth/signin", formData, {
    withCredentials: true,
  });
};
export const verfiyCodeForSignUp = async (formData) => {
  return await axiosInstance.post("/auth/verifyOTPSignUp", formData, {
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

export const logout = async () => {
  return await axiosInstance.get("/auth/logout", {
    withCredentials: true,
  });
};
