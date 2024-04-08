"use client";

import useKnowledgebase from "../../../../store/chatbot/useKnowledgebase";

function Source_Text() {;
  const { text, updateText} = useKnowledgebase((state) => ({
    text: state.text,
    updateText: state.updateText,
  }))

  const handleInputChange = (event) => {
    event.preventDefault()
    updateText(event.target.value);
  };

  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className="flex mt-[60px] w-full flex-col lg:flex-row items-center lg:items-start gap-3  justify-center">
        <div className="w-[95%] lg:w-[570px] h-[389px] border-[1px]  rounded-lg  border-gray-200">
          <div className="w-full h-auto px-3 py-4 border-[1px] text-sky-700  border-gray-200 text-base font-bold font-manrope leading-snug">
            Text
          </div>
          <div className="h-[85%] ">
            <div className="p-3 h-[80%]">
              <textarea
                value={text}
                onChange={handleInputChange}
                placeholder="paste text here"
                className="h-full placeholder:text-gray-700 p-3 placeholder:text-xs placeholder:font-manrope w-full border-[1px] border-gray-200"
              ></textarea>
            </div>
            <div className="h-[20%] p-5 border-gray-200 flex flex-col items-end justify-end">
              <button
                // onClick={handleSubmit}
                className=" px-5 py-3 text-[#1261AC] text-xs font-bold font-manrope leading-snug bg-[#EEF8FF] flex items-center justify-center flex-col  rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Source_Text;
