import { axiosInstance } from "./axios";
export const getAllGroups = async () => {
  const response = await axiosInstance.get(`/groups/getAllGroups`, {
    withCredentials: true,
  });
  return response;
};
export const createGroup = async (formData) => {
  const response = await axiosInstance.post("/groups/createGroup/", formData, {
    withCredentials: true,
  });
  return response;
};
