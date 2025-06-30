import React from "react";
import MediaView from "./MediaView";

const SenderMessage = ({ message }) => {
  return (
    <div className="flex justify-end">
      {message?.fileUrl ? (
        <MediaView message={message} bgColor={"bg-blue-700"} />
      ) : (
        <div className="bg-blue-700 text-white px-4 py-2 rounded-2xl max-w-xs">
          {message.text}
        </div>
      )}
    </div>
  );
};

export default SenderMessage;
