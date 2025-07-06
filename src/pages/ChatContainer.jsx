import React, { useEffect, useState } from "react";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/RecieverMessage";
import { FaSearch } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import ChatSend from "@/components/ChatSend";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/config/socket";
import { getAllUsers, logout } from "@/apis";
import { setUser } from "@/store/userSlice";
import { toast } from "react-toastify";
import { addMeesage, setMessages, setSelectedUser } from "@/store/messageSlice";
import SelectedChat from "@/components/SelectedChat";
import ChatSidebar from "@/components/ChatSidebar";
import { setAuthUser } from "@/store/authSlice";
const ChatContainer = () => {
  const user = useSelector((state) => state.auth.authUser);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("register", user._id, (res) => {
      console.log(res);
    });
    getAllUsers()
      .then((res) => {
        dispatch(setUser(res?.data?.data));
      })
      .catch((err) => {
        toast.error(err?.message);
      });

    socket.on("newmessage", (message) => {
      dispatch(addMeesage(message));
    });
    return () => {};
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b font-semibold uppercase flex justify-between items-center">
          <div>
            {selectedUser
              ? selectedUser?.username || selectedUser?.name
              : "Friend"}
          </div>
          <div
            className="cursor-pointer text-3xl"
            onClick={() => {
              logout();
              dispatch(setAuthUser(null));
              localStorage.clear();
            }}
          >
            <IoLogOut />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          <SelectedChat />
        </div>
        <ChatSend />
      </div>
    </div>
  );
};

export default ChatContainer;
