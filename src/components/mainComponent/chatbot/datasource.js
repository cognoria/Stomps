"use client";

import { useState } from "react";

function Datasource() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      setSelectedFile(file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log("Dropped file:", file.name);
      setSelectedFile(file.name);
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className="flex mt-[60px] flex-col lg:flex-row items-center lg:items-start gap-3  justify-center">
        <div className="w-[95%] lg:w-[570px] h-[389px] border-[1px]  rounded-lg  border-gray-200">
          <div className="w-full h-auto px-3 py-4 border-[1px] text-sky-700   border-gray-200 text-base font-bold font-manrope leading-snug">
            File
          </div>
          <div className="flex flex-col  justify-between  h-[83%] items-center">
            <div className="flex flex-col p-3 w-full h-full">
              <div
                className="upload-container"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-input"
                  accept=".pdf,.doc,.txt,.docx"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-input" className="upload-label">
                  <img src="/images/chatbox/folder-add.svg" alt="Upload icon" />
                  <div className="main-text">
                    Select a File Upload, or Drag and Drop it here
                  </div>
                  <div className="sub-text">
                    Supported file type: .pdf, .doc, .txt, .docx
                  </div>
                </label>
                {selectedFile && (
                  <div className="file-name">Selected file: {selectedFile}</div>
                )}
              </div>
            </div>

            <div className="items-center flex flex-row justify-center gap-x-2 text-neutral-400 py-4 lg:p-0 p-2 text-xs w-full tracking-tigh leading-none  font-normal font-manrope">
              <img src="/images/chatbox/warning-2.svg" alt="" />
              <p>
                If you’re uploading a PDF, be sure that the texts can be
                highlighted
              </p>
            </div>
          </div>
        </div>
        <div className="w-[95%] lg:w-[275px] pb-3 h-[204px]  flex items-center justify-between flex-col rounded-lg border border-gray-200">
          <div className=" w-full  text-center border-[1px] text-sky-700  p-3 border-gray-200 text-base font-bold font-manrope leading-snug">
            Sources
          </div>
          <div className=" w-full  px-3  py-3 justify-center items-center gap-2 flex">
            <button className="text-white py-[16px] px-5 w-full text-sm font-bold font-manrope bg-sky-700 rounded-lg shadow border border-sky-700  text-center leading-snug">
              Create Chatbot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datasource;
