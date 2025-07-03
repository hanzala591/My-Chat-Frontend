import { setMessages } from "@/store/messageSlice";
import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaShareAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { sendMessage } from "@/apis";
export default function ChatSend() {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const shareFileRef = useRef(null);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const dispatch = useDispatch();

  const handlesendMessage = (e) => {
    if (selectedUser) {
      let media = null;
      if (shareFileRef?.current?.value) {
        media = shareFileRef?.current?.files[0];
      }
      const formData = new FormData();
      formData.append("text", message);
      formData.append("media", media);

      sendMessage(formData, selectedUser._id)
        .then((res) => {
          console.log("res");
          dispatch(setMessages(res?.data?.data));
          setMessage("");
          shareFileRef.current.value = "";
        })
        .catch((err) => {
          console.log("err");
          toast.error(err);
          setMessage("");
        });
    }
  };

  // Initialize SpeechRecognition on component mount
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prevText) => prevText + transcript + " ");
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        toast.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          setIsListening(false);
        }
      };
    } else {
      toast.error("Web Speech API is not supported in this browser.");
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech Recognition not initialized or not supported.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="p-4 flex gap-2 border-t bg-white">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 border px-4 py-2 rounded-full outline-none"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div
        className="bg-blue-700 rounded-full text-white flex justify-center items-center px-3 cursor-pointer"
        onClick={() => {
          shareFileRef.current.click();
        }}
      >
        <FaShareAlt />
        <input
          type="file"
          ref={shareFileRef}
          className="hidden"
          onChange={() => {
            if (shareFileRef?.current?.value) {
              toast.success("File Is Selected.");
            }
            if (!shareFileRef?.current?.value) {
              toast.success("File Is Un Selected.");
            }
          }}
          accept=".pdf,image/*"
        />
      </div>
      <div
        className="bg-blue-700 rounded-full flex justify-center items-center px-3 cursor-pointer"
        onClick={toggleListening}
      >
        {isListening ? (
          <>
            <FaMicrophoneSlash className="text-white" />
          </>
        ) : (
          <>
            <FaMicrophone className="text-white" />
          </>
        )}
      </div>
      <button
        className="bg-blue-700 text-white px-4 p-2 rounded-full cursor-pointer"
        onClick={handlesendMessage}
      >
        <IoIosSend className="text-xl" />
      </button>

      {!("webkitSpeechRecognition" in window) &&
        toast.error(
          "Your browser does not support Web Speech API. Please try Chrome or Edge."
        )}
    </div>
  );
}
