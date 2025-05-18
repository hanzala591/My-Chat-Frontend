import React, { useState, useEffect, useRef } from "react";

const VoiceToText = () => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in this browser.");
      return;
    }

    // Create recognition instance
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setText((prev) => prev + transcript + " ");
        } else {
          interimTranscript += transcript;
        }
      }
    };

    recognition.onend = () => {
      if (listening) recognition.start(); // restart if still listening
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [listening]);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setListening(false);
      recognitionRef.current.stop();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Voice to Text Converter</h2>
      <button onClick={startListening} disabled={listening}>
        Start
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop
      </button>
      <p>
        <strong>Transcribed Text:</strong>
      </p>
      <textarea value={text} rows="10" cols="80" readOnly />
    </div>
  );
};

export default VoiceToText;
