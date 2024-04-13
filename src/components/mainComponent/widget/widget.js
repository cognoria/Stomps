"use client";

import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { remark } from "remark";
import remarkHTML from "remark-html";
import useWidgetStore from "../../../store/useWidgetStore";
import SkeletonLoader from "../../skeleton";
import { useSearchParams } from "next/navigation";

const Widget = ({ botId, cookies }) => {
  const chatContainerRef = useRef(null);
  const messageInputRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");
  const [openWidget, setOpenWidget] = useState(null)
  const [widgetTheme, setWidgetTheme] = useState('LIGHT')

  const searchParams = useSearchParams();
  const host = searchParams.get('host');

  const { getChatbotState, getChatStyle, chat, refreshChat, setUserData, setInitialMsg, userData } = useWidgetStore(state => ({
    chat: state.chat,
    userData: state.userData,
    refreshChat: state.refreshChat,
    setUserData: state.setUserData,
    getChatStyle: state.getChatStyle,
    setInitialMsg: state.setInitialMsg,
    getChatbotState: state.getChatbotState,
  }));

  const { messages, chatting, error, loading, chatbotStyle } =
    getChatbotState(botId);

  useEffect(() => {
    if (!chatbotStyle) getChatStyle(botId);
    if (chatbotStyle) {
      setWidgetTheme(chatbotStyle?.widgetTheme)
    }
  }, [getChatStyle, chatbotStyle, botId]);

  useEffect(() => {
    if (!cookies || userData == null) setUserData();
  }, [cookies, setUserData, userData]);

  useEffect(() => {
    if (chatbotStyle && messages?.length < 1) {
      chatbotStyle?.welcomeMessages?.forEach((msg, i) => {
        setTimeout(
          () => setInitialMsg(botId, msg),
          chatbotStyle?.popupDelay + i * 100
        );
      });
    }
  }, [chatbotStyle, setInitialMsg, messages, botId]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === host) {
        if (event.data.openChat) {
          setOpenWidget(true)
        } else if (event.data.closeChat) {
          setOpenWidget(false)
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [host]);

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

  const sendSuggestedMessage = async (e) => {
    messageInputRef.current.textContent = "";
    try {
      await chat(botId, { role: "user", content: e });
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  function handleCloseWidget() {
    window.parent.postMessage({ closeWidget: true }, '*');
  }

  return (
    <div
      className={`flex w-screen h-screen font-manrope flex-col items-start  ${widgetTheme === "DARK" ? "bg-black" : "bg-transparent"
        } justify-center`}
    >
      <div className="w-full h-full items-start flex-col">
        <div className={`flex ${widgetTheme === "DARK" ? "bg-black" : "bg-white"} fixed border-b-[1px] h-[8%] border-gray-200 flex-row  px-4 py-2 w-full flex-start items-start justify-between`}>
          <div className="flex flex-row items-center h-full gap-x-4">
            {chatbotStyle?.profileImage && (
              <Image
                width={30}
                height={30}
                className="w-[40px] h-[40px] rounded-full"
                src={chatbotStyle?.profileImage}
                alt={chatbotStyle?.assistantTabHeader}
              />
            )}
            {chatbotStyle?.assistantTabHeader && (
              <p
                className={`font-bold text-xl ${widgetTheme === "DARK" ? "text-zinc-100" : ""
                  }`}
              >
                {chatbotStyle?.assistantTabHeader}
              </p>
            )}
          </div>
          <div className="flex flex-row h-full items-center gap-x-2">
            <p className="mx-3 text-red-500 font-manrope font-normal text-sm">
              {error && error}
            </p>{" "}
            <Image width={20} height={20} onClick={() => refreshChat(botId)} className="hover:-rotate-90 cursor-pointer self-center" src="/images/chatbox/refresh.svg" alt="" />
            {typeof openWidget == "boolean" && <Image onClick={handleCloseWidget} width={30} height={30} className="hover:-rotate-90 self-center" src="/images/auth/close_button.svg" alt="" />}
          </div>
        </div>
        <div
          ref={chatContainerRef}
          style={{ scrollBehavior: "smooth" }}
          className="w-full overflow-y-scroll h-[75%] mt-16 flex flex-col gap-3 p-4"
        >
          {messages?.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isUser={message.role === "user"}
              theme={widgetTheme}
            />
          ))}

          {chatting && (
            <div className="flex flex-col mt-[10px] items-start w-full justify-start">
              <SkeletonLoader width={200} />
            </div>
          )}
        </div>

        <div className="flex flex-row w-full px-4 overflow-x-scroll h-[7%] items-start justify-start gap-x-3">
          {chatbotStyle?.questionExamples &&
            chatbotStyle?.questionExamples?.map((msg, i) => {
              return (
                <p onClick={() => sendSuggestedMessage(msg.question)}
                  className={`rounded-lg p-1 text-sm text-center whitespace-nowrap ${widgetTheme === "DARK"
                    ? "bg-gray-800 hover:bg-gray-600 text-zinc-100"
                    : "bg-sky-700 text-white"
                    } `}
                  key={i}
                >
                  {msg.question}
                </p>
              );
            })}
        </div>
        <div className="relative p-4 h-[17%] bottom-2 font-manrope overflow-y-scroll items-center flex-col  flex">
          <div
            contentEditable
            onInput={(e) => setMessageInput(e.target.textContent)}
            placeholder="message..."
            ref={messageInputRef}
            style={{ overflowAnchor: "none" }}
            className={`text-neutral-700 max-h-full  w-full ${widgetTheme === "DARK"
              ? "bg-transparent text-zinc-100 placeholder:text-neutral-300"
              : "bg-transparent text-white placeholder:text-neutral-300"
              }  border p-3 overflow-y-scroll flex flex-col pl-[15px] rounded-lg pr-[50px] decoration-none text-sm font-normal font-manrope leading-snug`}
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

const markdownToHtml = (markdown) =>
  remark().use(remarkHTML).processSync(markdown).toString();

const ChatMessage = memo(({ message, isUser, theme }) => (
  <div
    className={`w-full h-auto font-manrope text-[16px] items-start justify-center flex-col flex  ${isUser ? "justify-end items-end " : "justify-start"
      }`}
  >
    <div
      className={`max-w-[85%] p-[10px] ${theme === "DARK"
        ? "bg-gray-800 text-zinc-100"
        : "bg-zinc-100 text-stone-900"
        } ${isUser ? "bg-[#0C4173] " : ""
        }  rounded-tl rounded-tr rounded-br border text-start text-sm font-normal leading-snug `}
    >
      {isUser ? (
        message.content
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content) }}
        />
      )}
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";
export default memo(Widget);
