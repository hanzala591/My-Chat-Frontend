import { axiosInstance } from "./axios";

export const sendMessage = async (message, id) => {
  const response = await axiosInstance.post(
    `/message/sendmessage/${id}`,
    message,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const getAllMessages = async (id) => {
  const response = await axiosInstance.get(
    `/message/getAllChatMessages/${id}`,
    {
      withCredentials: true,
    }
  );
  console.log(response);
  return response;
};

export const getAllAdminMessages = async () => {
  return await axiosInstance.get("/message/getAllAdminMessages", {
    withCredentials: true,
  });
};
