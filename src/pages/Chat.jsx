import React, { useState } from "react";
import SenderMessage from "../components/SenderMessage";
import RecieverMessage from "../components/RecieverMessage";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
const Chat = () => {
  const [messages] = useState([
    { sender: "me", content: "Hey, how are you?" },
    { sender: "friend", content: "I’m good! What about you?" },
    { sender: "me", content: "Doing well, thanks!" },
  ]);
  const [myMessage, setMyMessage] = useState("");
  console.log(myMessage);

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
        <div className="p-4 flex gap-2 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 border px-4 py-2 rounded-full outline-none"
            onChange={(e) => setMyMessage(e.target.value)}
          />
          <div className="bg-green-500 rounded-full flex justify-center items-center px-3 cursor-pointer">
            <FaMicrophone className="text-white" />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
