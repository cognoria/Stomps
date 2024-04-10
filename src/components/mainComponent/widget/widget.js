"use client";

import { useEffect, useRef, useState } from "react";

import { remark } from "remark";
import remarkHTML from "remark-html";
import useBotMessagingStore from "../../../store/chatbot/useChatbotMessaging";
import useChatbotStore from "../../../store/chatbot/useChatbotStore";

export default function Widget({ botId }) {
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

  //temperture slider

  // const [selectedTemperature, setSelectedTemperature] = useState();
  // const handleTemperatureChange = (value) => {
  //   setSelectedTemperature(value);
  // };

  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null);
  const chatMessages = useBotMessagingStore((state) => state.chatMessages);
  //   const loading = useBotMessagingStore((state) => state.loading);
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
  return (
    <div className="flex w-[95%]  lg:w-[350px] h-auto rounded-md flex-col items-start  border-gray-200 justify-center border-[1px] ">
      <div className="border-[1px] w-full h-[588px]  border-gray-200  items-start flex-col ">
        <div className="flex border-b-[1px] border-gray-200 flex-row h-[10%]  p-4 w-full flex-end items-end justify-end">
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

        <div className=" relative p-4 h-[17%] overflow-y-scroll items-center flex-col  flex">
          <div
            contentEditable={true}
            onInput={(e) => setMessageInput(e.target.textContent)}
            placeholder="message... "
            ref={messageInputRef}
            readOnly={chatting || status !== "READY"}
            style={{ overflowAnchor: "none" }}
            className="text-neutral-700 max-h-full  w-full  border p-3  overflow-y-scroll   flex flex-col   pl-[15px] rounded-lg  pr-[50px]   decoration-none placeholder:text-neutral-300 text-sm font-normal font-manrope leading-snug"
          />
          <button
            onClick={sendMessage}
            className="w-[32px] h-[32px] absolute top-[24px] right-7"
          >
            <img
              src="/images/chatbox/send.svg"
              alt=""
              className="w-full h-full "
            />
          </button>
        </div>
      </div>
    </div>
  );
}
