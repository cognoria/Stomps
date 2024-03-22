"use client";

import { useEffect, useRef, useState } from "react";

import { remark } from "remark";
import remarkHTML from "remark-html";
import useBotMessagingStore from "../../../../store/chat_bot_state/chats_messaging";
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
  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null);
  const chatMessages = useBotMessagingStore((state) => state.chatMessages);
  const loading = useBotMessagingStore((state) => state.loading);
  const error = useBotMessagingStore((state) => state.error);

  // Function to convert Markdown to HTML
  const markdownToHtml = (markdown) => {
    return remark().use(remarkHTML).processSync(markdown).toString();
  };

  async function sendMessage(e) {
    e.preventDefault();

    if (!messageInput.trim()) return; // Prevent sending empty messages
    try {
      const data = {
        role: "user",
        content: messageInput,
      };
      await useBotMessagingStore.getState().chat_messaging({ id, data });
      setMessageInput("");
    } catch (error) {
      setMessageInput("");
      console.log("Failed to send message:", error);
    }
  }
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="border-[1px] w-[55%] h-[588px] border-gray-200  items-start flex-col ">
      <div className="flex border-b-[1px] border-gray-200  p-4 w-full flex-end items-end justify-end">
        <img src="/images/chatbox/refresh.svg" alt="" />
      </div>
      <div
        ref={chatContainerRef}
        style={{ scrollBehavior: "smooth" }}
        className="w-full overflow-y-scroll h-[75%] flex flex-col gap-3 p-4"
      >
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`w-full h-auto flex flex-col ${
              message?.role === "user"
                ? "justify-end items-end "
                : " justify-start"
            } `}
          >
            <div className="max-w-[70%] h-auto px-[15px] items-start py-[11px] bg-zinc-100 rounded-tl rounded-tr rounded-br border justify-center  flex-col flex">
              <div className="text-stone-900 text-start text-sm font-normal font-manrope leading-snug">
                {message?.role === "user" ? (
                  message?.content
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(message?.content),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="w-full h-[15%] relative p-4 items-center flex-col  flex"
      >
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="message... "
          className="text-neutral-700 outline-gray-200 w-full h-full border  flex flex-col  active:outline-gray-300 pl-[15px] rounded-lg  pr-[50px]   decoration-none placeholder:text-neutral-300 text-sm font-normal font-manrope leading-snug"
        />
        <button
          className="w-[32px] h-[32px] absolute top-7 right-7"
          type="submit"
        >
          <img
            src="/images/chatbox/send.svg"
            alt=""
            className="w-full h-full "
          />
        </button>
      </form>
    </div>
  );
}
