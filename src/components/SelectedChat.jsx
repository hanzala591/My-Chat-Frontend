import React, { useEffect, useState } from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "@/apis";
import { getMessages } from "@/store/messageSlice";
import { LuMessageCircleOff } from "react-icons/lu";
import PdfView from "./PdfView";
import ImageView from "./ImageView";

export default function SelectedChat() {
  const authUser = useSelector((state) => state.auth.authUser);
  const messages = useSelector((state) => state.message.messages);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser) {
      getAllMessages(selectedUser._id)
        .then((res) => {
          console.log("res");
          dispatch(getMessages(res?.data?.data));
        })
        .catch((err) => {
          console.log("err");
        });
    }

    return () => {};
  }, [selectedUser]);
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
          ) : (
            selectedUser?._id === msg?.senderId && (
              <RecieverMessage key={index} message={msg} />
            )
          )
        )
      )}
      {/* <PdfView /> */}
      {/* <ImageView /> */}
    </div>
  );
}
