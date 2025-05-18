import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <div className="flex justify-end">
      <div className="bg-green-500 text-white px-4 py-2 rounded-2xl max-w-xs">
        {message}
      </div>
    </div>
  );
};

export default SenderMessage;
