"use client";

import { useEffect, useRef, useState, memo } from "react";
import { remark } from "remark";
import remarkHTML from "remark-html";
import SkeletonLoader from "../../skeleton";
import useWidgetStore from "../../../store/useWidgetStore";
import Image from "next/image";


const Widget = ({ botId, cookies }) => {
  const chatContainerRef = useRef(null);
  const messageInputRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");

  const { getChatbotState, getChatStyle, chat, setUserData, setInitialMsg, userData } = useWidgetStore(state => ({
    chat: state.chat,
    userData: state.userData,
    setUserData: state.setUserData,
    getChatStyle: state.getChatStyle,
    setInitialMsg: state.setInitialMsg,
    getChatbotState: state.getChatbotState,
  }));

  const { messages, chatting, error, loading, chatbotStyle } = getChatbotState(botId);

  useEffect(() => {
    if (!chatbotStyle) getChatStyle(botId);
  }, [getChatStyle, chatbotStyle, botId]);

  useEffect(() => {
    if (!cookies || userData) setUserData();
  }, [cookies, setUserData, userData]);

  useEffect(() => {
    if (chatbotStyle && messages?.length < 1) {
      chatbotStyle?.welcomeMessages?.forEach((msg, i) => {
        setTimeout(() => setInitialMsg(botId, msg), chatbotStyle?.popupDelay + (i * 100));
      });
    }
  }, [chatbotStyle, setInitialMsg, messages, botId]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (e) => {
    messageInputRef.current.textContent = "";
    try {
      await chat(botId, { role: "user", content: messageInput });
      setMessageInput("");
    } catch (error) {
      setMessageInput("");
      console.log("Failed to send message:", error);
    }
  };

  return (
    <div className="flex w-full h-screen font-manrope rounded-md flex-col items-start border-gray-200 justify-center border-[1px]">
      <div className="border-[1px] w-full h-full border-gray-200  items-start flex-col">
        <div className="flex border-b-[1px] border-gray-200 flex-row h-[10%]  p-4 w-full flex-end items-end justify-end">
          <p className="mx-3 text-red-500 font-manrope font-normal text-sm">{error && error}</p>
          <Image width={20} height={20} src="/images/chatbox/refresh.svg" alt="" />
        </div>
        <div
          ref={chatContainerRef}
          style={{ scrollBehavior: "smooth" }}
          className="w-full overflow-y-scroll h-[75%] flex flex-col gap-3 p-4"
        >
          {messages?.map((message, index) => (
            <ChatMessage key={index} message={message} isUser={message.role === "user"} />
          ))}
          {chatting && (
            <div className="flex flex-col mt-[10px] items-start w-full justify-start">
              <SkeletonLoader width={200} />
            </div>
          )}
        </div>
        <div className="relative p-4 h-[17%] font-manrope overflow-y-scroll items-center flex-col  flex">
          <div
            contentEditable
            onInput={(e) => setMessageInput(e.target.textContent)}
            placeholder="message..."
            ref={messageInputRef}
            style={{ overflowAnchor: "none" }}
            className="text-neutral-700 max-h-full  w-full  border p-3  overflow-y-scroll   flex flex-col   pl-[15px] rounded-lg  pr-[50px]   decoration-none placeholder:text-neutral-300 text-sm font-normal font-manrope leading-snug"
          />
          <button
            disabled={chatting}
            onClick={sendMessage}
            className="w-[32px] h-[32px] disabled:cursor-wait absolute top-[24px] right-7"
          >
            <Image
              height={20}
              width={20}
              src="/images/chatbox/send.svg"
              alt=""
              className={`w-full h-full disabled:animate-pulse`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const markdownToHtml = (markdown) => remark().use(remarkHTML).processSync(markdown).toString();
const ChatMessage = memo(({ message, isUser }) => (
  <div
    className={`w-full h-auto font-manrope text-[16px] items-start justify-center flex-col flex ${isUser ? "justify-end items-end" : "justify-start"
      }`}
  >
    <div className="max-w-[85%] p-[10px] bg-zinc-100 text-stone-900  rounded-tl rounded-tr rounded-br border text-start text-sm font-normal leading-snug">
      {isUser ? message.content : (
        <div dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content) }} />
      )}
    </div>
  </div>
));

ChatMessage.displayName = 'ChatMessage';
export default memo(Widget);