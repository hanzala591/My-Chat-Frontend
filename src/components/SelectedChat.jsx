import React, { useEffect, useRef, useState } from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "@/apis";
import { getMessages } from "@/store/messageSlice";
import { LuMessageCircleOff } from "react-icons/lu";
import PdfView from "./PdfView";
import ImageView from "./ImageView";
import { socket } from "@/config/socket";

export default function SelectedChat() {
  const authUser = useSelector((state) => state.auth.authUser);
  const messages = useSelector((state) => state.message.messages);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser) {
      getAllMessages(selectedUser._id, selectedUser?.type)
        .then((res) => {
          dispatch(getMessages(res?.data?.data));
        })
        .catch((err) => {
          console.log("err");
        });
    }
    if (selectedUser.type === "group") {
      socket.emit("join-group", selectedUser?._id, authUser?._id);
    }

    return () => {};
  }, [selectedUser]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // const pdfUrl = "helloworld.pdf";

  return (
    <div className="flex flex-col gap-4 h-full">
      {messages.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <LuMessageCircleOff className="text-9xl" />
        </div>
      ) : (
        messages.map((msg, index) =>
          msg?.senderId === authUser?._id ? (
            <SenderMessage key={index} message={msg} />
          ) : selectedUser?._id === msg?.senderId ? (
            <RecieverMessage key={index} message={msg} />
          ) : (
            selectedUser?._id === msg?.receiverGroup && (
              <RecieverMessage key={index} message={msg} />
            )
          )
        )
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
