import { color } from "@/lib/generateRandomColor";
import { setSelectedUser } from "@/store/messageSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function SelectUser({ value, index }) {
  const dispatch = useDispatch();
  return (
    <div
      className="p-2 bg-white rounded shadow cursor-pointer"
      onClick={() => {
        dispatch(setSelectedUser(value));
        localStorage.setItem("selected-user", JSON.stringify(value));
      }}
    >
      <div className="flex flex-row gap-3">
        <div
          className={`w-[17%]  rounded-full`}
          style={{ backgroundColor: color.backgroundColor[index] }}
        >
          <div className="w-full h-full font-bold flex justify-center items-center">
            {value.username[0].toUpperCase()}
          </div>
        </div>
        <div className="w-[80%] flex flex-col justify-between">
          <div className="font-bold uppercase"> {value.username}</div>
          <div>{value.about.split(" ").slice(0, 3).join(" ")} ...</div>
        </div>
      </div>
    </div>
  );
}
