"use client";

import { useState } from "react";
import useBotCreationStore from "../../../store/chat_bot_state/create_new_bot";
function Datasource() {
  const [selectedFile, setSelectedFile] = useState(null);
  const loading = useBotCreationStore((state) => state.loading);
  const createBot = useBotCreationStore((state) => state.createBot);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
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
      console.log("Dropped file:", file);
      setSelectedFile(file);
    }
  };

  const [text, setText] = useState("");

  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className="flex mt-[60px] flex-col lg:flex-row items-center lg:items-start gap-3  justify-center">
        <div className="w-[95%] lg:w-[570px] h-auto border-[1px]  rounded-lg pb-2  border-gray-200">
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
                  <div className="file-name">
                    Selected file: {selectedFile.name}
                  </div>
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

            <div className="h-auto  mt-[20px] lg:mt-0 p-3  w-full  flex flex-col">
              <div className="flex gap-3 mt-[50px] flex-row w-full items-center ">
                <hr className="bg-gray-200 h-[2px] w-full" />
                <div className="text-center text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  Attached File
                </div>
                <hr className="bg-gray-200 h-[2px] w-full" />
              </div>
              <div className="flex flex-row  p-5 items-end lg:mt-0 mt-[70px] [mt-50px]  h-auto lg:h-[70%] justify-end">
                <div className="flex flex-row items-center  gap-x-5 ">
                  <button className="bg-transparent items-center gap-2 flex flex-row">
                    <img src="/images/chatbox/trash.svg" />
                    <p className="text-red-500 text-xs font-bold font-manrope leading-snug">
                      Delete all
                    </p>
                  </button>
                  <button className=" px-5 py-3 text-[#1261AC] text-xs font-bold font-manrope leading-snug bg-[#EEF8FF] flex items-center justify-center flex-col  rounded-lg">
                    Add
                  </button>
                </div>
              </div>
              {files && (
                <div className="w-full px-2 mt-[40px]">
                  <ul className="w-full">
                    {files.slice(0, 10).map((files, index) => (
                      <li
                        key={index}
                        className="w-full flex flex-row items-center gap-2 justify-between "
                      >
                        <div className="w-[94%]  h-[42px] pl-[15px] pr-4 pt-3 pb-[13px] rounded-lg border border-gray-200 justify-between items-start gap-[158px] flex flex-row">
                          <div className="text-gray-900  w-full  w-[92%] text-xs font-normal font-['Manrope'] leading-none tracking-tight">
                            {files.name}
                          </div>
                        </div>
                        <button>
                          <img
                            src="/images/chatbox/trash.svg"
                            alt=""
                            classNAme="w-full h-auto"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datasource;
const files = [
  { name: "file " },
  { name: "file " },
  { name: "file " },
  { name: "file " },
];
