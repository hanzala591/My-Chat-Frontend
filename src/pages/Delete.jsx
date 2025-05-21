import React, { useState, useRef, useEffect } from "react";

function Delete() {
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
      setInputText(""); // Clear input before starting new recognition
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Speech-to-Text Input</h1>

      <div style={{ marginBottom: "15px" }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Speak or type here..."
          rows="5"
          cols="50"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <button
        onClick={toggleListening}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: isListening ? "#dc3545" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isListening ? (
          <>
            <span style={{ marginRight: "8px" }}>🔴</span> Stop Listening
          </>
        ) : (
          <>
            <span style={{ marginRight: "8px" }}>🎤</span> Start Listening
          </>
        )}
      </button>

      {!("webkitSpeechRecognition" in window) && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Your browser does not support Web Speech API. Please try Chrome or
          Edge.
        </p>
      )}
    </div>
  );
}

export default Delete;
