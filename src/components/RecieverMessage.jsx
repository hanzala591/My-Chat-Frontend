// components/ReceiverBubble.jsx
import React from "react";

const RecieverMessage = ({ message }) => {
  return (
    <div className="flex justify-start">
      <div className="bg-white border px-4 py-2 rounded-2xl max-w-xs">
        {message}
      </div>
    </div>
  );
};

export default RecieverMessage;
