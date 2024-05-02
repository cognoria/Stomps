"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import useCreateChatbotStore from "../../../store/chatbot/useCreateChatbotStore";
import {
  extractTextFromDoc,
  extractTextFromPDF,
  extractTextFromTXT,
  isDOCFile,
  isPDFFile,
  isTXTFile,
} from "../../../utils/extractDoc/file_extract";

export default function Datasource() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { files, addFiles, deleteFile, deleteAllFiles } = useCreateChatbotStore(
    (state) => ({
      files: state.files,
      addFiles: state.addFiles,
      deleteFile: state.deleteFile,
      deleteAllFiles: state.deleteAllFiles,
    })
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // console.log("Dropped file:", file);
      if (!isTXTFile(file) && !isPDFFile(file) && !isDOCFile(file)) {
        return; //toaste file not supported
      } else {
        setSelectedFile(file);
        //add file to content;
      }
    }
  };

  async function handleAddFile() {
    if (!selectedFile) return toast.error("Please select a file first");
    try {
      let file;
      if (isTXTFile(selectedFile)) {
        file = await extractTextFromTXT(selectedFile);
      } else if (isDOCFile(selectedFile)) {
        file = await extractTextFromDoc(selectedFile);
      } else if (isPDFFile(selectedFile)) {
        file = await extractTextFromPDF(selectedFile);
      } else {
        return toast.error("unspported file selected"); //toast file not supported
      }
      await addFiles(file);
      setSelectedFile(null);
    } catch (e) {
      console.error("error adding file: ", e);
      toast.error("Failed to add file");
    }
  }

  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className="flex mt-[60px] flex-col lg:flex-row items-center lg:items-start gap-3  justify-center">
        <div className="w-[95%] lg:w-[570px] h-auto border-[1px]  rounded-lg pb-2  border-gray-200">
          <div className="w-full h-auto px-3 py-4 border-[1px] text-sky-700   border-gray-200 text-base font-bold font-manrope leading-snug">
            File
          </div>
          <div className="flex flex-col  justify-between  h-[83%] items-center">
            <div className="flex flex-col py-5 px-3 w-full h-full">
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
                  <Image
                    width={90}
                    height={90}
                    src="/images/chatbox/folder-add.svg"
                    alt="Upload icon"
                  />
                  <div className="main-text">
                    Select a File Upload, or Drag and Drop it here
                  </div>
                  <div className="sub-text mb-2">
                    Supported file type: .doc, .txt, .docx
                  </div>
                </label>
                {selectedFile && (
                  <div className="file-name">
                    Selected file: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>

            {/* <div className="items-center flex flex-row justify-center gap-x-2 text-neutral-400 py-4 lg:p-0 p-2 text-xs w-full tracking-tigh leading-none  font-normal font-manrope">
              <Image
                width={20}
                height={20}
                src="/images/chatbox/warning-2.svg"
                alt=""
              />
              <p>
                If you’re uploading a PDF, be sure that the texts can be
                highlighted
              </p>
            </div> */}

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
                  <button
                    onClick={deleteAllFiles}
                    className="bg-transparent items-center gap-2 flex flex-row"
                  >
                    <Image
                      width={20}
                      height={20}
                      alt=""
                      src="/images/chatbox/trash.svg"
                    />
                    <p className="text-red-500 text-xs font-bold font-manrope leading-snug">
                      Delete all
                    </p>
                  </button>
                  <button
                    onClick={handleAddFile}
                    className=" px-5 py-3 text-[#1261AC] text-xs font-bold font-manrope leading-snug bg-[#EEF8FF] flex items-center justify-center flex-col  rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              {files.length > 0 && (
                <div className="w-full px-2 mt-[40px]">
                  <ul className="w-full">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="w-full flex flex-row items-center gap-2 justify-between "
                      >
                        <div className="w-[94%]  h-[42px] pl-[15px] pr-4 pt-3 pb-[13px] rounded-lg border border-gray-200 justify-between items-start gap-[158px] flex flex-row">
                          <div className="text-gray-900  w-[92%] text-xs font-normal font-manrope leading-none tracking-tight">
                            {file.name}
                          </div>
                        </div>
                        <button onClick={() => deleteFile(index)}>
                          <Image
                            width={20}
                            height={20}
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
