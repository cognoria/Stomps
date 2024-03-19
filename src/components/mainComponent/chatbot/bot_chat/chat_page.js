"use client";

import { useEffect } from "react";
import useSingleChatbot from "../../../../store/chat_bot_state/single_chat_bot";
import { formatDate } from "../../../../utils/data_format/date";

function ChatPage({ bot_id }) {
  const { singleChatBot, loading, error, chatbot } = useSingleChatbot(
    (state) => ({
      singleChatBot: state.singleChatBot,
      loading: state.loading,
      error: state.error,
      chatbot: state.chatbot,
    })
  );

  useEffect(() => {
    singleChatBot(bot_id);
  }, [bot_id, singleChatBot]);

  console.log(chatbot);

  function getStatusColor(status) {
    switch (status) {
      case "READY":
        return "green";
      case "EMBEDDING_ERROR":
      case "CRAWL_ERROR":
        return "red";
      default:
        return "yellow";
    }
  }

  return (
    <div className="flex w-full lg:w-[767px] rounded-md flex-col h-auto items-start  border-gray-200 justify-center border-[1px] ">
      <div className="text-gray-900 text-base font-bold font-manrope p-4 border-b-[1px] border-gray-200 w-full  leading-snug">
        {chatbot?.name}
      </div>
      <div className="w-full py-6 px-2 items-start flex flex-row  justify-start ">
        <div className="w-[45%] pl-2 h-[588px]  flex flex-col items-start justify-start">
          <div className="flex w-full mt-10 flex-col gap-y-8 justify-start h-[90%]">
            <div className="flex flex-col w-full">
              <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                Chatbot ID
              </div>
              <div className="flex flex-row items-start gap-3">
                <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                  {chatbot?._id}
                </div>
                <img src="/images/chatbox/copy.svg" className="w-6 h-6" />
              </div>
            </div>
            <div className=" flex flex-row w-full justify-between items-start">
              <div className="flex-1 flex flex-col gap-y-2 items-start">
                <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                  Status
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <div
                    className={`w-3 h-3 ${
                      getStatusColor(chatbot?.status) === "green"
                        ? "bg-emerald-500"
                        : getStatusColor(chatbot?.status) === "red"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } rounded-full`}
                  />
                  <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                    {chatbot?.status}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-y-2 items-start">
                <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                  Model
                </div>
                <div>
                  <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                    {chatbot?.chatBotCustomizeData?.model}
                  </div>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className=" flex flex-row w-full justify-between items-start">
              <div className="flex-1 w-full flex flex-col gap-y-2 items-start">
                <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                  Visibility
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                    {chatbot?.visibility}
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full flex flex-col gap-y-2 items-start">
                <div
                  style={{ whiteSpace: "nowrap" }}
                  className="  text-gray-900  text-sm font-normal font-manrope leading-snug"
                >
                  Number of character
                </div>
                <div>
                  <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                    30,465
                  </div>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className="flex flex-col items-start">
              <div className="text-gray-900 text-sm font-normal font-['Manrope'] leading-snug">
                Temperature
              </div>
            </div>
          </div>
          <div>
            <div className="text-gray-900 text-sm font-normal font-['Manrope'] leading-snug">
              Last Trained:
            </div>
            <div className="text-gray-900 text-sm font-bold font-['Manrope'] leading-snug">
              {formatDate(chatbot?.updatedAt)}
            </div>
          </div>
        </div>
        <Chat id={bot_id} />
      </div>
    </div>
  );
}

export default ChatPage;

function Chat({ id }) {
  console.log(id);
  return (
    <div className="border-[1px] w-[55%] h-[588px] border-gray-200  items-start flex-col ">
      <div className="flex border-b-[1px] border-gray-200  p-4 w-full flex-end items-end justify-end">
        <img src="/images/chatbox/refresh.svg" alt="" />
      </div>
      <div className="w-full h-[75%] p-4">
        <div className="w-[45%] h-[45px] px-[15px] py-[11px] bg-zinc-100 rounded-tl rounded-tr rounded-br border justify-center items-center gap-2.5 flex-col flex">
          <div className="text-stone-900 text-sm font-normal font-manrope leading-snug">
            👋 Hi! How can I help
          </div>
        </div>
      </div>

      <div className="w-full h-[15%] relative p-4 items-center flex-col  flex">
        <input
          placeholder="message... "
          className="text-neutral-700 outline-gray-200 w-full h-full border  active:outline-gray-300 pl-[15px] rounded-lg  pr-[9px]   decoration-none placeholder:text-neutral-300 text-sm font-normal font-manrope leading-snug"
        />

        <img
          src="/images/chatbox/send.svg"
          alt=""
          className="w-[32px] h-[32px] absolute top-7 right-7 "
        />
      </div>
    </div>
  );
}
