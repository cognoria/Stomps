/* eslint-disable @next/next/no-img-element */
"use client";

import { remark } from "remark";
import remarkHTML from "remark-html";
function Chat_logs() {
  const bot = true;

  return (
    <div className="w-full ">{bot ? <Filled_bot_state /> : <Empty_bot />}</div>
  );
}

export default Chat_logs;
const markdownToHtml = (markdown) => {
  return remark().use(remarkHTML).processSync(markdown).toString();
};

const Filled_bot_state = () => {
  const data = [{ question: "", answer: "" }];
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
        <div className="flex flex-row gap-6 w-full p-3 ">
          <div class="relative">
            <input
              type="date"
              class="appearance-none py-[20px] border border-gray-300 font-manrope rounded  px-4 w-[150px] leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Select a date"
            />

            <img
              src="/images/chatbox/calendar.svg"
              alt="Calendar Icon"
              class="absolute right-0 top-0 mt-2 mr-3 h-6 w-6 pointer-events-none"
            />
          </div>
        </div>
        <div className="flex gap-3 p-3 w-full flex-row items-start justify-start">
          <div className="flex border-[1px]  p-3 flex-col max-w-[40%] items-start justify-start gap-3">
            <div className="w-full flex flex-row justify-between  text-zinc-500 my-3 text-xs font-normal font-manrope leading-none tracking-tight">
              <div className="w-auto text-right text-zinc-500 text-xs font-normal font-manrope leading-none tracking-tight">
                User: Tell me about Learnable
              </div>
              <div className="w-auto text-right text-zinc-500 text-xs font-normal font-manrope leading-none tracking-tight">
                3 days ago
              </div>
            </div>
            <div className="w-full text-stone-900 text-xs font-normal font-manrope leading-[20px] tracking-tight">
              Bot: Learnable is a learning initiative offered by Genesys Tech
              Hub. It is designed to help young techies in Africa acquire
              technical skills within a short period of time, usually around 6
              months. The program aims to prepare individuals for opportunities
              in top tech teams worldwide. Learnable provides a platform for
              young Africans to enhance their technical capabilities and
              kickstart their careers in the technology industry.
            </div>
          </div>
          <div className="flex flex-col  items-start justify-start border-gray-200 border-[1px] w-[60%]">
            <div
              // ref={chatContainerRef}
              style={{ scrollBehavior: "smooth" }}
              className="w-full overflow-y-scroll h-[75%] flex flex-col gap-3 p-4"
            >
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`w-full h-auto flex flex-col ${
                    message?.role === "user"
                      ? "justify-end  items-end"
                      : " justify-start"
                  } `}
                >
                  <div
                    className={`max-w-[70%] h-auto px-[15px] items-start py-[11px] ${
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
                          {" "}
                          <div>
                            <div className="flex my-2 w-[60%] p-1 rounded-lg bg-sky-50 border-[1px] border-[#1261AC] text-[#1261AC] bg-[] ">
                              Confidence score {message?.confidence_score}
                            </div>
                            {message?.content}
                          </div>
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

const Empty_bot = () => {
  return (
    <div className="lg:w-full w-[98%]  lg:p-[6%]  flex flex-col items-start  ">
      <div className="flex flex-col items-start justify-center w-full border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Chat logs
        </div>
        <div className="flex w-full flex-col lg:flex-row gap-6 p-3 ">
          <div class="relative">
            <input
              type="date"
              class="appearance-none py-[10px] lg:py-[20px] border border-gray-300 font-manrope rounded  px-4 w-[100px] lg:w-[150px] leading-tight focus:outline-none focus:border-blue-500"
              placeholder="Select a date"
            />

            <img
              src="/images/chatbox/calendar.svg"
              alt="Calendar Icon"
              class="absolute right-0 top-0 hidden lg:block mt-2 mr-3 h-6 w-6 pointer-events-none"
            />
          </div>
          <div class="relative">
            <select className="text-zinc-500 text-[15px] lg:text-[18px] font-normal py-[10px]  lg:py-[20px] font-manrope tracking-tight border w-150 lg:w-[250px] appearance-none border-gray-300 rounded pl-16 pr-3 leading-tight focus:outline-none focus:border-blue-500">
              <option>confidence 1</option>
              <option>confidence 2</option>
              <option>confidence 3</option>
              <option>confidence 4</option>
            </select>
            <img
              src="/images/chatbox/arrow-down.svg"
              alt="Calendar Icon"
              class="absolute right-1 hidden lg:block top-0 mt-4 mr-3 h-6 w-6 pointer-events-none"
            />
            <img
              src="/images/chatbox/filter.svg"
              alt="Calendar Icon"
              class="absolute left-1 hidden lg:block top-0 mt-4 mr-3 h-6 w-6 pointer-events-none"
            />
          </div>
        </div>
        <div className="w-full gap-4 h-[541px] flex flex-col items-center justify-center">
          <img src="/images/chatbox/chatbox.svg" alt="" className="" />

          <div className="text-zinc-500 text-sm font-medium font-manrope leading-tight tracking-tight">
            No Conversations yet.
          </div>
          <div className="flex flex-row gap-2  items-center justify-center w-full ">
            <div className="text-sky-700 text-sm font-bold font-manrope  leading-snug">
              Refresh
            </div>
            <img src="/images/chatbox/refres.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
