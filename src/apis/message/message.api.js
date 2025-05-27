import { axiosInstance } from "../axios/axios";

export const sendMessage = async (message, id) => {
  return await axiosInstance.post(`/message/sendmessage/${id}`, message, {
    withCredentials: true,
  });
};

export const getAllMessages = async (id) => {
  return await axiosInstance.get(`/message/getAllMessages/${id}`, {
    withCredentials: true,
  });
};

export const getAllAdminMessages = async () => {
  return await axiosInstance.get("/message/getAllAdminMessages", {
    withCredentials: true,
  });
};
