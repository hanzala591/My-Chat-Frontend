import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ChatSend() {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize SpeechRecognition on component mount
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false; // Listen for a single utterance
      recognitionRef.current.interimResults = false; // Only return final results
      recognitionRef.current.lang = "en-US"; // Set language

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prevText) => prevText + transcript + " "); // Append recognized text
        setIsListening(false); // Stop listening after result
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        // This fires even if recognition stopped due to a result or error
        // We only want to set isListening to false if we explicitly stopped it
        // or if an error occurred. If a result came in, onresult already handled it.
        if (isListening) {
          // If it was still listening when onend fired
          setIsListening(false);
        }
      };
    } else {
      console.warn("Web Speech API is not supported in this browser.");
    }
  }, []); // Empty dependency array means this runs once on mount

  const toggleListening = () => {
    if (!recognitionRef.current) {
      console.warn("Speech Recognition not initialized or not supported.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // setInputText(""); // Clear input before starting new recognition
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
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <div
        className="bg-green-500 rounded-full flex justify-center items-center px-3 cursor-pointer"
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
      <button className="bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer">
        Send
      </button>

      {!("webkitSpeechRecognition" in window) &&
        toast.error(
          "Your browser does not support Web Speech API. Please try Chrome or Edge."
        )}
    </div>
  );
}
