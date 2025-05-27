import { useDispatch } from "react-redux";
import { axiosInstance } from "../axios/axios";

export const getAllUsers = async () => {
  return await axiosInstance.get("/users/getAllUser", {
    withCredentials: true,
  });
};
