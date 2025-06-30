import React from "react";
import ImageView from "./ImageView";
import PdfView from "./PdfView";

export default function MediaView({ message, bgColor }) {
  return (
    <div>
      {message?.fileType?.includes("application") ? (
        <PdfView
          fileUrl={message?.fileUrl}
          fileName={message?.fileName}
          text={message.text}
          bgColor={bgColor}
        />
      ) : (
        <ImageView
          fileUrl={message?.fileUrl}
          fileName={message?.fileName}
          text={message.text}
          bgColor={bgColor}
        />
      )}
    </div>
  );
}
