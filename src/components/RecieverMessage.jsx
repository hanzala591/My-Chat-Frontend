// components/ReceiverBubble.jsx
import React from "react";
import MediaView from "./MediaView";

const RecieverMessage = ({ message }) => {
  return (
    <div className="flex justify-start">
      {message?.fileUrl ? (
        <MediaView message={message} bgColor={"bg-black"} />
      ) : (
        <div className="bg-black text-white border px-4 py-2 rounded-2xl max-w-xs">
          {message.text}
        </div>
      )}
    </div>
  );
};

export default RecieverMessage;
