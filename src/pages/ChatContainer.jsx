import React, { useState } from "react";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/RecieverMessage";
import { FaSearch } from "react-icons/fa";

import ChatSend from "@/components/ChatSend";
const ChatContainer = () => {
  const [messages] = useState([
    { sender: "me", content: "Hey, how are you?" },
    { sender: "friend", content: "I’m good! What about you?" },
    { sender: "me", content: "Doing well, thanks!" },
  ]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r p-4 hidden md:block">
        <div className="flex justify-between items-center my-4">
          <h2 className="text-lg font-bold">Chats</h2>
          <FaSearch className="text-xl cursor-pointer" />
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-white rounded shadow cursor-pointer">
            Friend
          </div>
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b font-semibold">Friend</div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {messages.map((msg, index) =>
            msg.sender === "me" ? (
              <SenderMessage key={index} message={msg.content} />
            ) : (
              <RecieverMessage key={index} message={msg.content} />
            )
          )}
        </div>
        <ChatSend />
      </div>
    </div>
  );
};

export default ChatContainer;
