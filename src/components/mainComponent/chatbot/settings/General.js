"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useChatbotSettings from "../../../../store/chatbot/useChatbotSettings";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { copyCode } from "../../../../utils/dataFormat/copyCode";

export default function GeneralSettings({ botId }) {
  const { getChatbot, loading, chatbot } = useChatbotStore((state) => ({
    getChatbot: state.getChatbot,
    loading: state.loading,
    chatbot: state.chatbot,
  }));

  const { updateBotName, loadingName } = useChatbotSettings((state) => ({
    updateBotName: state.updateBotName,
    loadingName: state.updatingBotName,
  }));

  useEffect(() => {
    getChatbot(botId);
  }, [botId, getChatbot]);

  // chatbot name
  const [name, setName] = useState(chatbot ? chatbot?.name : "");
  // chatbot name

  //handle update name
  const handleUpdateName = () => {
    const botName = {
      name: name.trim(),
    };
    updateBotName({ botName, botId });
  };
  //handle update udate name

  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          General
        </div>
        <div className="flex flex-col w-full p-3 gap-y-4">
          <div className="flex flex-col my-3 w-full">
            <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
              Chatbot ID
            </div>
            <div className="flex flex-row items-start gap-3">
              <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                {chatbot?._id}
              </div>
              <Image
                onClick={() => copyCode(chatbot?._id)}
                width={20}
                height={20}
                alt=""
                src="/images/chatbox/copy.svg"
                className="w-6 h-6"
              />
            </div>
          </div>

          <div className="flex-1 w-full flex my-3 flex-col gap-y-2 items-start">
            <div
              style={{ whiteSpace: "nowrap" }}
              className="  text-gray-900  text-sm font-normal font-manrope leading-snug"
            >
              Number of character
            </div>

            <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
              {chatbot?.crawlData.charCount}
            </div>
          </div>

          <div className="flex-1 w-full my-3 flex flex-col gap-y-2 items-start">
            <div
              style={{ whiteSpace: "nowrap" }}
              className="  text-gray-900  text-sm font-normal font-manrope leading-snug"
            >
              Name
            </div>

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={chatbot ? chatbot?.name : "examplesite.com"}
              className="w-full  h-[44px] p-4 active:border-gray-200 border-[1px]  text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
            />
          </div>
        </div>

        <div className="w-full p-3 flex-end items-end flex flex-col">
          <button
            onClick={handleUpdateName}
            disabled={loadingName}
            className="text-white justify-center items-center text center disabled:bg-sky-300 lg:w-auto font-manrope w-[150px] h-11 flex-end rounded-lg     p-2 bg-sky-700  shadow border border-sky-700   "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
