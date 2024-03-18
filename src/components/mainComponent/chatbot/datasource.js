"use client";

import { useState } from "react";
import useBotCreationStore from "../../../store/chat_bot_state/create_new_bot";
import useFormDataStore from "../../../store/chat_bot_state/chat_bot_store";

import { extractTextFromDoc, extractTextFromPDF, extractTextFromTXT, isDOCFile, isPDFFile, isTXTFile } from "../../../utils/extractDoc/file_extract";
function Datasource() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([])
  const loading = useBotCreationStore((state) => state.loading);
  const createBot = useBotCreationStore((state) => state.createBot);
  const {addContent, deleteContent, deleteAllContent} = useFormDataStore((state) => ({
    addContent: state.addFileToContent,
    deleteContent: state.deleteFileFromContent,
    deleteAllContent: state.deleteAllContent
  }))

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
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
      console.log("Dropped file:", file);
      if(!isTXTFile(file) && !isPDFFile(file) && !isDOCFile(file)){
        return //toaste file not supported
      } else {
      setSelectedFile(file);
      //add file to content;

      }
    }
  };

  async function deleteFile(index){
    return await useFormDataStore.getStore().deleteFileFromContent(index)
  }

  async function deleteAllFile(){
    if(files.length == 0) return;

    for(const file of files){
      deleteFile(file.index)
    }
  }

  async function handleAddFile(){
    if(!selectedFile) return //toast error please add file
    try{
      if(isTXTFile(selectedFile)){
        const file = extractTextFromTXT(selectedFile)
        const savedFile = await addContent(file)
        return setFiles(savedFile)
      }
      
      if(isDOCFile(selectedFile)){
        const file = extractTextFromDoc(selectedFile)
        const savedFile = await addContent(file)
        setFiles(savedFile)
      }
      
      if(isPDFFile(selectedFile)){
        const file = extractTextFromPDF(selectedFile)
        const savedFile = await addContent(file)
        setFiles(savedFile)
      }
      //send to controller
    }catch(e){
      comsole.log(e)
      //toast
    }
  }

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
                  <div className="file-name">Selected file: {selectedFile.name}</div>
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
      </div>
    </div>
  );
}

export default Datasource;
