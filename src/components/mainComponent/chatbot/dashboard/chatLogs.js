/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import {
  convertDateToRelative,
  sortDate,
} from "../../../../utils/dataFormat/date";
import { truncateMessage } from "../../../../utils/truncateMsg";
import EmptyDashboard from "./emptyDashboard";
import BarHeader from "./header";
function Chat_logs({ botId }) {
  const { getChatbotChats, loading, chats, error } = useChatbotStore(
    (state) => ({
      getChatbotChats: state.getChatbotChats,
      loading: state.loading,
      chats: state.chats,
    })
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [FilteredChats, setFilteredChats] = useState(chats);

  useEffect(() => {
    getChatbotChats(botId);
  }, [botId, getChatbotChats]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = chats.filter(
        (chat) => sortDate(chat.createdAt) === selectedDate
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(chats);
    }
  }, [selectedDate, chats]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="w-full ">
      {chats ? (
        <Filled_bot_state
          chatData={FilteredChats}
          handleDateSelect={handleDateSelect}
        />
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
}

export default Chat_logs;

const Filled_bot_state = ({ chatData, handleDateSelect }) => {
  const [chatIndex, setIndex] = useState(0);
  const updateChatIndex = (id) => {
    setIndex(id);
  };

  const arrangedData = chatData?.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Chat logs
        </div>
        <BarHeader
          exportDataFile={chatData}
          exportDataTitle="chat_logs"
          date={true}
          exportData={true}
          onDateSelect={handleDateSelect}
        />

        <div className="flex gap-3 p-3 w-full flex-row items-start justify-start">
          <div className="flex border-none h-[400px] items-start overflow-y-scroll gap-2  flex-col w-[40%]">
            {arrangedData?.map((item, i) => {
              const lastUserMessage = item.messages.find(
                (message) => message.role === "user"
              );

              // Find the last message from the assistant

              return (
                <button
                  onClick={() => updateChatIndex(i)}
                  key={i}
                  className="flex border-[1px] h-[25%]  p-3 flex-col gap-y-3 shadow-lg rounded-lg decoration-none w-full items-start justify-start gap-3"
                >
                  <div className="w-full flex flex-row justify-between  text-zinc-500 my-3 text-xs font-normal font-manrope leading-none tracking-tight">
                    <div className="w-auto text-right text-zinc-500 text-xs font-normal font-manrope leading-none tracking-tight">
                      User:{" "}
                      {lastUserMessage
                        ? truncateMessage(lastUserMessage.content, 5)
                        : ""}
                    </div>
                    <div className="w-auto text-right text-zinc-500 text-xs font-normal font-manrope leading-none tracking-tight">
                      {convertDateToRelative(item.updatedAt)}
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

          <div className="flex flex-col  rounded-lg  items-start justify-start border-gray-200 border-[1px] w-[60%]">
            <div
              // ref={chatContainerRef}
              style={{ scrollBehavior: "smooth" }}
              className="w-full overflow-y-scroll h-[500px] flex flex-col gap-3 p-4"
            >
              {arrangedData?.[chatIndex]?.messages.map((message, index) => (
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
                          {/* <div className="flex my-2 w-fit text-nowrap p-1 rounded-lg bg-sky-50 border-[1px] border-[#1261AC] text-[#1261AC] bg-[] ">
                            Confidence score {message?.confidence_score}
                          </div> */}
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
