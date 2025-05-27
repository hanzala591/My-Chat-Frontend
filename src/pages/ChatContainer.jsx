import React, { useEffect, useState } from "react";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/RecieverMessage";
import { FaSearch } from "react-icons/fa";

import ChatSend from "@/components/ChatSend";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "@/config/socket";
import { getAllUsers } from "@/apis";
import { setUser } from "@/store/userSlice";
import { toast } from "react-toastify";
import { setMessages, setSelectedUser } from "@/store/messageSlice";
import SelectedChat from "@/components/SelectedChat";
const ChatContainer = () => {
  const user = useSelector((state) => state.auth.authUser);
  const users = useSelector((state) => state.user.users);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("register", user._id);
    socket.on("registered", (res) => {
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
      dispatch(setMessages(message));
    });
    return () => {};
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r p-4 hidden md:block">
        <div className="flex justify-between items-center my-4">
          <h2 className="text-lg font-bold">
            {user ? user.username : "My Chat"}
          </h2>
        </div>
        <div className="space-y-2">
          {users.map((value, index) => (
            <div
              key={index}
              className="p-2 bg-white rounded shadow cursor-pointer"
              onClick={(e) => {
                dispatch(setSelectedUser(value));
              }}
            >
              {value.username}
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b font-semibold">
          {selectedUser ? selectedUser.username : "Friend"}
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
