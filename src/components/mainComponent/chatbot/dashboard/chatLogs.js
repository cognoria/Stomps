/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { convertDateToRelative } from "../../../../utils/data_format/date";
import { truncateMessage } from "../../../../utils/truncateMsg";
import EmptyDashboard from "./emptyDashboard";
import BarHeader from "./header";
function Chat_logs({ botId }) {
  //TODO: call the endpoint.
  const { getChatbotChats, loading, chats, error } = useChatbotStore(
    (state) => ({
      getChatbotChats: state.getChatbotChats,
      loading: state.loading,
      chats: state.chats,
    })
  );

  useEffect(() => {
    getChatbotChats(botId);
  }, [botId, getChatbotChats]);
  console.log(chats);
  return (
    <div className="w-full ">
      {chats ? <Filled_bot_state chatData={chats} /> : <EmptyDashboard />}
    </div>
  );
}

export default Chat_logs;

const Filled_bot_state = ({ chatData }) => {
  console.log(chatData);
  const chatMessages = [
    { role: "user", content: "Tell me about learnable" },
    {
      content:
        "Learnable is a learning initiative offered by Genesys Tech Hub. It is designed to help young techies in Africa acquire technical skills within a short period of time, usually around 6 months. The program aims to prepare individuals for opportunities in top tech teams worldwide. Learnable provides a platform for young Africans to enhance their technical capabilities and kickstart their careers in the technology industry.",
      role: "client",
      confidence_score: "1.3",
    },
  ];
  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Chat logs
        </div>
        <BarHeader date={true} exportData={true} confidence={false} />

        <div className="flex gap-3 p-3 w-full flex-row items-start justify-start">
          <div className="flex border-none h-[75%] items-start overflow-y-scroll  flex-col w-[40%]">
            {chatData.map((item, i) => {
              const lastUserMessage = item.messages
                .slice()
                .reverse()
                .find((message) => message.role === "user");

              // Find the last message from the assistant
              const lastAssistantMessage = item.messages
                .slice()
                .reverse()
                .find((message) => message.role === "assistant");
              return (
                <button
                  key={i}
                  className="flex border-[1px] h-[30%]  p-3 flex-col gap-y-3 shadow-lg rounded-lg decoration-none w-full items-start justify-start gap-3"
                >
                  <div className="w-full flex flex-row justify-between  text-zinc-500 my-3 text-xs font-normal font-manrope leading-none tracking-tight">
                    <div className="w-auto text-right text-zinc-500 text-xs font-normal font-manrope leading-none tracking-tight">
                      User:{" "}
                      {lastUserMessage
                        ? truncateMessage(lastUserMessage.content, 8)
                        : ""}
                    </div>
                    <div className="w-auto text-right text-zinc-500 text-xs font-normal font-manrope leading-none tracking-tight">
                      {convertDateToRelative(item.createdAt)}
                    </div>
                  </div>
                  <div className="w-full text-start text-stone-900 text-xs font-normal font-manrope leading-[20px] tracking-tight">
                    Bot:
                    {truncateMessage(
                      item.messages[item.messages.length - 1]?.content,
                      12
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col   items-start justify-start border-gray-200 border-[1px] w-[60%]">
            <div
              // ref={chatContainerRef}
              style={{ scrollBehavior: "smooth" }}
              className="w-full overflow-y-scroll h-[75%] flex flex-col gap-3 p-4"
            >
              {chatData[0]?.messages.map((message, index) => (
                <div
                  key={index}
                  className={`w-full h-auto flex flex-col ${
                    message?.role === "user"
                      ? "justify-end  items-end"
                      : " justify-start"
                  } `}
                >
                  <div
                    className={`max-w-[85%] h-auto px-[15px] items-start py-[11px] ${
                      message?.role === "user"
                        ? "bg-[#0C4173] text-white"
                        : "bg-zinc-100 text-stone-900 "
                    }  rounded-tl rounded-tr rounded-br border justify-center  flex-col flex`}
                  >
                    <div className=" text-start text-sm font-normal font-manrope leading-snug">
                      {message?.role === "user" ? (
                        message?.content
                      ) : (
                        <div>
                          <div className="flex my-2 w-fit text-nowrap p-1 rounded-lg bg-sky-50 border-[1px] border-[#1261AC] text-[#1261AC] bg-[] ">
                            Confidence score {message?.confidence_score}
                          </div>
                          {message?.content}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
