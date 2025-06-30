import { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PdfView({ fileUrl, fileName, text, bgColor }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <a
      className={`flex w-[450px] flex-col m-1 p-1 ${bgColor} rounded  cursor-pointer`}
      href={`${fileUrl}`}
      target="_blank"
    >
      <Document
        // file="https://res.cloudinary.com/do1x1erel/image/upload/v1750778573/my_chat/nl8udvilcdycniat2ikg.pdf"
        // file="https://res.cloudinary.com/do1x1erel/image/upload/v1750785665/my_chat/fjqvz5j5yfzea3lkkugl.pdf"
        file={`${fileUrl}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <div className=" h-[140px] overflow-hidden w-full">
          <Page pageNumber={pageNumber} width={450} />
        </div>
      </Document>
      <div className=" bg-gray-200 py-4 px-12">{text ? text : fileName}</div>

      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </a>
  );
}
