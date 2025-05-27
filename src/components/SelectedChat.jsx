import React, { useEffect, useState } from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "@/apis";
import { getMessages } from "@/store/messageSlice";
import { socket } from "@/config/socket";

export default function SelectedChat() {
  // const [messages] = useState([
  //   { sender: "me", content: "Hey, how are you?" },
  //   { sender: "friend", content: "I’m good! What about you?" },
  //   { sender: "me", content: "Doing well, thanks!" },
  // ]);
  const authUser = useSelector((state) => state.auth.authUser);
  const messages = useSelector((state) => state.message.messages);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser) {
      getAllMessages(selectedUser._id)
        .then((res) => {
          dispatch(getMessages(res?.data?.data));
        })
        .catch((err) => {
          console.log(err);
          console.log(err);
        });
    }

    return () => {};
  }, [selectedUser]);

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, index) =>
        msg?.senderId === authUser?._id ? (
          <SenderMessage key={index} message={msg.message} />
        ) : (
          <RecieverMessage key={index} message={msg.message} />
        )
      )}
    </div>
  );
}
