import { axiosInstance } from "./axios";

export const sendMessage = async (message, id, chatType) => {
  const response = await axiosInstance.post(
    `/message/sendmessage/${id}`,
    message,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        chatType,
      },
    }
  );
  return response;
};

export const getAllMessages = async (id, chatType) => {
  const response = await axiosInstance.get(
    `/message/getAllChatMessages/${id}`,
    {
      withCredentials: true,
      params: {
        chatType: chatType,
      },
    }
  );
  return response;
};

export const getAllAdminMessages = async () => {
  return await axiosInstance.get("/message/getAllAdminMessages", {
    withCredentials: true,
  });
};
