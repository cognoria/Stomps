"use client";

import { useEffect, useRef, useState } from "react";

import { remark } from "remark";
import remarkHTML from "remark-html";
import useBotMessagingStore from "../../../store/chatbot/useChatbotMessaging";
import useChatbotStore from "../../../store/chatbot/useChatbotStore";

export default function Widget({ botId, cookies }) {
  const [userData, setUserData] = useState()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageInput, setMessageInput] = useState("");

  const { getChatbot, chatbot } = useChatbotStore((state) => ({
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

  useEffect(() => {
    if (!cookies) {
      async function fetchData() {
        try {
          const ipRes = await fetch("/api/v1/data/ip");
          if (!ipRes.ok) {
            throw new Error("Failed to fetch IP data");
          }
          const ipData = await ipRes.json();

          const ipDetailsRes = await fetch(`http://ip-api.com/json/${ipData.ip}`);
          if (!ipDetailsRes.ok) {
            throw new Error("Failed to fetch IP details");
          }
          const ipDetailsData = await ipDetailsRes.json();

          const { query, ...rest } = ipDetailsData;
          const ipDetails = { ip: query, ...rest };
          delete ipDetails.status;

          setUserData(ipDetails);
        } catch (error) {
          console.error("Error:", error);
        }
      }

      fetchData();
    }
  }, [cookies])


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

  async function getChatWidgetResponse() {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessages((prevMsg) => [...prevMsg, { role: "user", content: messageInput }])
    setLoading(true)
    try {
      const msgRes = await fetch(`/api/v1/embed/${botId}/chat`, {
        method: 'POST',
        body: JSON.stringify({
          messages: messages,
          userData: userData,
        })
      })
      if (!msgRes.ok) throw new Error("chat response failed")
      const newMsg = await msgRes.json()
      setLoading(false)
      setMessages((prevMsg) => [...prevMsg, newMsg])
    } catch (e) {
      console.error("Error:", e);
    }
  }

  async function sendMessage(e) {
    // Prevent sending empty messages
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
              className={`w-full h-auto flex flex-col ${message?.role === "user"
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
