"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { remark } from "remark";
import remarkHTML from "remark-html";
import useWidgetStore from "../../../store/useWidgetStore";
import SkeletonLoader from "../../skeleton";

const Widget = ({ botId }) => {
  const chatContainerRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");
  const [isWidget, setIsWidget] = useState(false);
  const [widgetTheme, setWidgetTheme] = useState("LIGHT");
  const [userWidgetColor, setUserWidgetColor] = useState("#1261AC");
  const [userWidgetFontColor, setUserWidgetFontColor] = useState("#fff");
  const [showLeadForm, setShowLeadForm] = useState(false);

  const searchParams = useSearchParams();
  const host = searchParams.get("host");

  const {
    getChatbotState,
    getChatStyle,
    chat,
    refreshChat,
    setInitialMsg,
    resetError,
    userData,
    setUserData,
  } = useWidgetStore((state) => ({
    chat: state.chat,
    userData: state.userData,
    resetError: state.resetError,
    refreshChat: state.refreshChat,
    setUserData: state.setUserData,
    getChatStyle: state.getChatStyle,
    setInitialMsg: state.setInitialMsg,
    getChatbotState: state.getChatbotState,
  }));

  const { messages, chatting, error, loading, chatbotStyle, lastMsgTime } =
    getChatbotState(botId);

  useEffect(() => {
    if (!chatbotStyle) getChatStyle(botId);
    if (chatbotStyle) {
      setWidgetTheme(chatbotStyle?.widgetTheme);
      setUserWidgetColor(chatbotStyle?.userChatColor);
      setUserWidgetFontColor(chatbotStyle?.fontColor);
    }
  }, [getChatStyle, chatbotStyle, botId]);

  useEffect(() => {
    if (chatbotStyle && messages?.length < 1) {
      chatbotStyle?.welcomeMessages?.forEach((msg, i) => {
        setTimeout(
          () => setInitialMsg(botId, msg),
          chatbotStyle?.popupDelay + i * 100
        );
      });
    }
    if (chatbotStyle) {
      setShowLeadForm(
        chatbotStyle.collectEmail ||
        chatbotStyle.collectName ||
        chatbotStyle.collectPhone
      );
    }
  }, [chatbotStyle, setInitialMsg, messages, botId]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event?.origin === host) {
        setIsWidget(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [host]);

  useEffect(() => {
    if (error) {
      setTimeout(() => resetError(botId), 5000);
    }
  }, [error, botId, resetError]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshChat(botId);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshChat, botId, lastMsgTime]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    setUserData();
  }, []);

  useEffect(() => {
    if (chatting) {
      setMessageInput("");
    }
  }, [chatting]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (chatting) return;
    if (!messageInput.trim()) return;
    try {
      await chat(botId, { role: "user", content: messageInput });
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  const sendSuggestedMessage = async (e) => {
    if (chatting) return;
    try {
      await chat(botId, { role: "user", content: e });
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  function handleCloseWidget() {
    window.parent.postMessage({ closeWidget: true }, "*");
  }

  useEffect(() => {
    if (chatbotStyle) {
      setShowLeadForm(
        chatbotStyle.collectEmail ||
        chatbotStyle.collectName ||
        chatbotStyle.collectPhone
      );
    }
  }, [chatbotStyle]);

  return (
    <div
      className={`flex w-screen h-screen font-manrope flex-col overflow-hidden bg-transparent`}
    >
      <div className="w-full h-full overflow-y-hidden relative flex-col">
        <div
          className={`flex ${widgetTheme === "DARK" ? "bg-[#333]" : "bg-[#fff]"
            } fixed border-b-[1px] h-[60px] border-gray-200 flex-row px-4 py-2 w-full flex-start justify-between`}
        >
          <div className="flex flex-row items-center h-full gap-x-4">
            {chatbotStyle?.profileImage.startsWith("#") && (
              <div
                className={`h-12 w-12 rounded-full bg-[${chatbotStyle.profileImage}]`}
              />
            )}
            {chatbotStyle?.profileImage.startsWith("data:image") && (
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
                className={`font-medium text-nowrap text-md font-manrope ${widgetTheme === "DARK" ? "text-zinc-100" : ""
                  }`}
              >
                {chatbotStyle?.assistantTabHeader}
              </p>
            )}
          </div>
          <div className="flex flex-row h-full items-center gap-x-2">
            <p className="text-red-500 font-manrope font-normal text-sm">
              {error && error}
            </p>{" "}
            <Image
              width={20}
              height={20}
              onClick={() => refreshChat(botId, true)}
              className="hover:-rotate-90 cursor-pointer self-center"
              src="/images/chatbox/refresh.svg"
              alt=""
            />
            {isWidget && (
              <Image
                onClick={handleCloseWidget}
                width={30}
                height={30}
                className="hover:-rotate-90 cursor-pointer self-center"
                src="/images/auth/close_button.svg"
                alt=""
              />
            )}
          </div>
        </div>
        <div
          ref={chatContainerRef}
          style={{ scrollBehavior: "smooth" }}
          className="w-full h-[calc(100vh-180px)] overflow-y-scroll mt-16 flex flex-col gap-3 p-4"
        >
          {messages?.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isUser={message.role === "user"}
              isUserFontColors={userWidgetFontColor}
              isUserColor={userWidgetColor}
              theme={widgetTheme}
            />
          ))}

          {chatting && (
            <div className="flex flex-col mt-[10px] items-start w-full justify-start">
              <SkeletonLoader width={200} />
            </div>
          )}
          {showLeadForm &&
            !chatting &&
            messages?.filter((msg) => msg.role === "user").length > 0 && (
              <div className="flex flex-col mt-[10px] items-start w-full justify-start">
                <LeadCollector
                  theme={widgetTheme}
                  botId={botId}
                  title={chatbotStyle?.leadMsgDescription}
                  collectEmail={chatbotStyle?.collectEmail}
                  collectName={chatbotStyle?.collectName}
                  collectPhone={chatbotStyle?.collectPhone}
                  setDisplay={setShowLeadForm}
                />
              </div>
            )}
        </div>
        <div className={`${widgetTheme === "DARK" ? "bg-[#333]" : "bg-[#fff]"} w-full z-50 flex flex-col gap-2 fixed bottom-0 py-2`}>
          <div className={`flex flex-row w-full h-fit px-4 custom-scrollbar py-2 overflow-x-scroll items-start justify-start gap-x-2`}>
            {chatbotStyle?.questionExamples &&
              chatbotStyle?.questionExamples?.map((msg, i) => {
                return (
                  <p
                    onClick={() => sendSuggestedMessage(msg.question)}
                    className={`rounded-lg p-1 cursor-pointer text-sm font-manrope text-center whitespace-nowrap ${widgetTheme === "DARK"
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
          <div className={` p-2 m-1 border rounded-lg h-fit w-full font-manrope justify-center items-center flex`}>
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={chatbotStyle?.chatInputPlaceholderText}
              className={`text-neutral-700 max-h-full h-[40px] w-full ${widgetTheme === "DARK"
                ? "bg-transparent text-zinc-100 placeholder:text-neutral-300"
                : "bg-transparent text-zinc-700 placeholder:text-neutral-400"
                } overflow-y-scroll focus:outline-none flex-[90%] text-sm font-manrope leading-snug`}
            />
            <button
              disabled={chatting}
              onClick={sendMessage}
              className="w-[30px] h-[30px] disabled:cursor-wait flex-[10%]"
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
    </div>
  );
};

const markdownToHtml = (markdown) =>
  remark().use(remarkHTML).processSync(markdown).toString();

const ChatMessage = memo(({ message, isUser, isUserColor, isUserFontColors, theme }) => (
  <div
    className={`w-full h-auto font-manrope text-sm items-start justify-center flex-col flex  ${isUser ? "justify-end items-end " : "justify-start"
      }`}
  >
    {/* <div
      className={`max-w-[85%] p-[10px] font-manrope text-sm ${theme === "DARK"
        ? "bg-gray-800 text-zinc-100"
        : "bg-zinc-100 text-stone-900"
        } ${isUser ? "bg-[#0C4173] rounded-l rounded-tr" : "rounded-tl rounded-r"
        } text-start text-smleading-snug `}
    > */}
    <div
      style={{
        background: isUser && (isUserColor ? isUserColor : "#0C4173"),
        color: isUser && (isUserFontColors ? isUserFontColors : ""),
      }}
      className={`max-w-[85%] p-[10px] font-manrope text-sm ${theme === "DARK"
          ? "bg-gray-800 text-zinc-100"
          : "bg-zinc-100 text-stone-900"
        } ${isUser ? " rounded-l rounded-tr" : "rounded-tl rounded-r"
        } text-start text-smleading-snug `}
    >
      {isUser ? (
        message.content
      ) : (
        <div className="custom_chat_style"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content) }}
        />
      )}
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";

function LeadCollector({
  title,
  collectEmail,
  collectName,
  collectPhone,
  setDisplay,
  theme,
  botId,
}) {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setDisplay(false);
  };

  async function handleSubmitLead() {
    setLoading(true);
    const data = { name, email, phone };
    const res = await fetch(`/api/v1/embed/${botId}/lead`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      // console.log(result);
      setLoading(false);
      return toast.error(result.message);
    }

    toast.success("sent");
    setLoading(false);
    return handleCancel();
  }

  return (
    <div
      className={`max-w-[85%] flex flex-col font-manrope  p-[10px] relative gap-1 ${theme === "DARK"
        ? "bg-gray-800 text-zinc-100"
        : "bg-zinc-100 text-stone-900"
        } rounded-tl-[8px] rounded-r-[8px] text-start text-sm leading-snug `}
    >
      <button
        onClick={handleCancel}
        className="absolute top-2 right-2 text-gray-500 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {title && <p className="font-manrope text-sm mt-[15px]">{title}</p>}
      {collectName && (
        <div>
          <input
            required={collectName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="h-10 w-full p-2  bg-transparent border placeholder:text-xs placeholder:font-manrope border-gray-300 rounded-md"
            placeholder="What is your name? e.g John Deo"
          />
        </div>
      )}
      {collectEmail && (
        <div>
          <input
            required={collectEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="h-10 w-full p-2 bg-transparent placeholder:text-xs placeholder:font-manrope border border-gray-300 rounded-md"
            placeholder="What is your email? e.g johndoe@gmail.com"
          />
        </div>
      )}
      {collectPhone && (
        <div>
          <input
            value={phone}
            required={collectPhone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="h-10 w-full p-2 placeholder:text-xs placeholder:font-manrope bg-transparent border border-gray-300 rounded-md "
            placeholder="What is your phone number? e.g +1 0234 56789"
          />
        </div>
      )}
      {(collectEmail || collectPhone || collectName) && (
        <button
          disabled={loading}
          className="bg-sky-700 text-center text-sm font-manrope disabled:cursor-not-allowed text-white w-full flex flex-col items-center rounded-lg justify-center p-2"
          onClick={handleSubmitLead}
        >
          Submit
        </button>
      )}
    </div>
  );
}

// function LeadCollector({ title, collectEmail, collectName, collectPhone, setDisplay }) {
//   return <div className={`max-w-[85%] p-[10px] ${theme === "DARK"
//     ? "bg-gray-800 text-zinc-100"
//     : "bg-zinc-100 text-stone-900"} flex flex-col gap-2 rounded-tl-[8px] rounded-r-[8px] text-start text-sm leading-snug `}>
//     {title && <p className="font-bold text-lg">{title}</p>}
//     {collectName && <div>
//       <input
//         value={inputValue}
//         onChange={onInputChange}
//         type={type}
//         className="h-10 w-full p-2 pl-10 bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         placeholder="what is your name? e.g John Deo"
//       />

//     </div>}
//     {collectEmail && <div>
//       <input
//         value={inputValue}
//         onChange={onInputChange}
//         type={type}
//         className="h-10 w-full p-2 pl-10 bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         placeholder="what is your name? e.g johndoe@gmail.com"
//       /></div>}
//     {collectPhone && <p>
//       <input
//         value={inputValue}
//         onChange={onInputChange}
//         type={type}
//         className="h-10 w-full p-2 pl-10 bg-transparent border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         placeholder="what is your phone number? e.g +1 0234 56789"
//       /></p>}
//   </div>
// }
export default memo(Widget);
