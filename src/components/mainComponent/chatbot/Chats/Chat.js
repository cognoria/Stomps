"use client";

import { useEffect, useRef, useState } from "react";

import { remark } from "remark";
import remarkHTML from "remark-html";
import useBotMessagingStore from "../../../../store/chatbot/useChatbotMessaging";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { formatDate } from "../../../../utils/data_format/date";
import Temprature_slider from "../../../customComponents/slider/temprature_slider";
import SkeletonLoader from "../../../skeleton";

function ChatPage({ botId }) {
  const { getChatbot, loading, chatbot } = useChatbotStore((state) => ({
    getChatbot: state.getChatbot,
    loading: state.loading,
    chatbot: state.chatbot,
  }));

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getChatbot(botId);
        if (data.chatbot.status === "READY") {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [botId, getChatbot]);

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
    <div className="flex w-[95%]  lg:w-[767px] h-auto rounded-md flex-col items-start  border-gray-200 justify-center border-[1px] ">
      <div className="text-gray-900 text-base font-bold font-manrope p-4 border-b-[1px] border-gray-200 w-full  leading-snug">
        {chatbot?._id != botId || !chatbot ? (
          <SkeletonLoader width={100} />
        ) : (
          <>{chatbot?.name}</>
        )}
      </div>
      <div className="w-full py-6 px-2 items-start flex gap-y-3 flex-col lg:flex-row  justify-start ">
        <div className="w-full lg:w-[50%] pl-2 h-auto lg:h-[588px]  flex flex-col items-start justify-start">
          <div className="flex w-full mt-10 flex-col gap-y-8 justify-start h-[90%]">
            <div className="flex flex-col w-full">
              <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                Chatbot ID
              </div>
              <div className="flex flex-row items-start gap-3">
                <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                  {chatbot?._id != botId || !chatbot ? (
                    <SkeletonLoader width={200} />
                  ) : (
                    <>{chatbot?._id}</>
                  )}
                </div>
                <img src="/images/chatbox/copy.svg" className="w-6 h-6" />
              </div>
            </div>
            <div className=" flex flex-row w-full justify-between gap-1 items-start">
              <div className="flex-1 w-full flex flex-col gap-y-2 items-start">
                <div className="text-gray-900 w-full text-sm font-normal font-manrope leading-snug">
                  Status
                </div>
                <div className="flex flex-row w-full gap-1 items-center">
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
                    {chatbot?._id != botId || !chatbot ? (
                      <SkeletonLoader width={100} />
                    ) : (
                      <>{chatbot?.status}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-y-2 items-start">
                <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                  Model
                </div>
                <div>
                  <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                    {chatbot?._id != botId || !chatbot ? (
                      <SkeletonLoader width={100} />
                    ) : (
                      <>{chatbot?.chatBotCustomizeData?.model}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className=" flex flex-row w-full justify-between gap-1 items-start">
              <div className="flex-1 w-full flex flex-col gap-y-2 items-start">
                <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                  Visibility
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
                    {chatbot?._id != botId || !chatbot ? (
                      <SkeletonLoader width={100} />
                    ) : (
                      <>{chatbot?.visibility}</>
                    )}
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
                    {chatbot?._id != botId || !chatbot ? (
                      <SkeletonLoader width={100} />
                    ) : (
                      <>{chatbot?.crawlData.charCount}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
            <div className="flex w-full flex-col gap-y-2  items-start">
              <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
                Temperature
              </div>
              {chatbot?._id != botId || !chatbot ? (
                <SkeletonLoader width={100} />
              ) : (
                <div className="w-[70%] my-3">
                  <Temprature_slider
                    height={"h-2"}
                    value={
                      chatbot?._id != botId || !chatbot
                        ? 0
                        : chatbot?.chatBotCustomizeData?.temparature
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="lg:my-0 my-10">
            <div className="text-gray-900 text-sm font-normal font-manrope leading-snug">
              Last Trained:
            </div>
            <div className="text-gray-900 text-sm font-bold font-manrope leading-snug">
              {chatbot?._id != botId || !chatbot ? (
                <SkeletonLoader width={250} />
              ) : (
                <>{formatDate(chatbot?.updatedAt)}</>
              )}
            </div>
          </div>
        </div>
        <Chat className="h-full" id={botId} status={chatbot?.status} />
      </div>
    </div>
  );
}

export default ChatPage;

function Chat({ id, status }) {
  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null);
  const chatMessages = useBotMessagingStore((state) => state.chatMessages);
  const loading = useBotMessagingStore((state) => state.loading);
  const error = useBotMessagingStore((state) => state.error);
  const chatting = useBotMessagingStore((state) => state.chatting);
  const messageInputRef = useRef(null);
  // Function to convert Markdown to HTML
  const markdownToHtml = (markdown) => {
    return remark().use(remarkHTML).processSync(markdown).toString();
  };

  useEffect(() => {
    if (chatting) {
      setMessageInput("");
    }
  }, [chatting]);

  async function sendMessage(e) {
    e.preventDefault();

    if (!messageInput.trim()) return; // Prevent sending empty messages
    messageInputRef.current.textContent = ""; // clear input field
    try {
      const data = {
        role: "user",
        content: messageInput,
      };
      await useBotMessagingStore.getState().chat({ id, data });
      setMessageInput("");
    } catch (error) {
      setMessageInput("");
      console.log("Failed to send message:", error);
    }
  }

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatMessages]);

  // console.log(status);
  return (
    <div className="border-[1px] w-full lg:w-[53%] h-[588px] border-gray-200  items-start flex-col ">
      <div className="flex border-b-[1px] border-gray-200 flex-row  p-4 w-full flex-end items-end justify-end">
        <p className="mx-3 text-red-500 font-manrope font-normal text-sm">
          {error && error}
        </p>{" "}
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
          readOnly={status !== "READY"}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="message... "
          className="text-neutral-700 read-only:cursor-help outline-gray-200 w-full h-full border flex flex-col  active:outline-gray-300 pl-[15px] rounded-lg  pr-[50px]   decoration-none placeholder:text-neutral-300 text-sm font-normal font-manrope leading-snug"
        />
        <button
          disabled={chatting || status !== "READY"}
          className="w-[32px] h-[32px] absolute top-7 right-7 disabled:cursor-not-allowed"
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
