import { getAllAdminMessages } from "@/apis";
import RecieverMessage from "@/components/RecieverMessage";
import { socket } from "@/config/socket";
import { getMessages, setMessages } from "@/store/messageSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Admin() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages);
  const authUser = useSelector((state) => state.auth.authUser);
  useEffect(() => {
    socket.emit("register", authUser?._id);
    socket.on("registered", (res) => {
      console.log(res);
    });
    socket.on("newmessage", (message) => {
      dispatch(setMessages(message));
    });
    getAllAdminMessages()
      .then((res) => {
        dispatch(getMessages(res?.data?.data));
      })
      .catch((err) => {
        toast.error(err);
      });
    socket.on("newmessage", (message) => {
      dispatch(setMessages(message));
    });
  }, []);

  return (
    <div className="w-ful h-[100vh]">
      <div className="p-5">
        <div className="text-4xl font-extrabold mb-5">
          Admin : {authUser.username}
        </div>
        <div>
          {messages.map((value, index) => (
            <div className="felx flex-col gap-3" key={index}>
              <div className="flex gap-3 items-center">
                <div className="f text-xl font-bold">
                  {value?.senderId?.username}
                </div>{" "}
                :
                <RecieverMessage message={value?.message} />
              </div>
              <hr className="m-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
