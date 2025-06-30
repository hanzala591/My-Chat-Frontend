import React from "react";

export default function ({ fileUrl, fileName, text, bgColor }) {
  return (
    <div
      className={`flex w-[230px] flex-col m-1 p-1 rounded ${bgColor} cursor-pointer overflow-hidden`}
    >
      <img
        // src="https://res.cloudinary.com/do1x1erel/image/upload/v1750855392/my_chat/peubjviqamfxwegf7tze.png"
        src={`${fileUrl}`}
        alt="Not load"
        className="object-cover"
      />
      <div className=" bg-gray-200 py-1 px-10"> {text ? text : fileName}</div>
    </div>
  );
}
