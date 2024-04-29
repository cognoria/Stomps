"use client";

import { useRouter } from "next/navigation";
import useChatbotStore from "../../../store/chatbot/useChatbotStore";
import useCreateChatbotStore from "../../../store/chatbot/useCreateChatbotStore";

export default function Sources() {
  const router = useRouter();
  const { website, urls, include, exclude, files, text, questions, clearStates } = useCreateChatbotStore()

  const dataToSend = {
    website: website,
    urls: urls,
    include: include,
    exclude: exclude,
    contents: [
      ...(questions.length > 0
        ? [{ url: "Q&A", content: `${JSON.stringify(questions)}` }]
        : []),
      ...(text.length > 1
        ? [{ url: "TXT", content: `${text}` }]
        : []),
      ...files.map((file) => ({
        url: file.name,
        content: file.content,
      })),
    ].filter(Boolean)
  };

  const { createChatbot, creatingChatbot } = useChatbotStore((state) => ({
    createChatbot: state.createChatbot,
    creatingChatbot: state.loading
  }))

  async function createBot(e) {
    e.preventDefault();
    // console.log(dataToSend);
    try {
      console.log(dataToSend)
      const newBot = await createChatbot(dataToSend);
      router.push(`/bot/${newBot._id}`);
      clearStates();
    } catch (error) {
      console.error("Failed to create bot:", error);
    }
  }

  return (
    <div className="w-[95%] lg:w-[275px]  mt-[60px] pb-3 h-auto  flex items-center justify-between flex-col rounded-lg border border-gray-200">
      <div className=" w-full mb-5 text-center border-[1px] text-sky-700  p-3 border-gray-200 text-base font-bold font-manrope leading-snug">
        Sources
      </div>

      <ul className="flex justify-start p-6 flex-col gap-y-2 items-start w-full circular-list">
        {files.length > 0 && (
          <li className="text-neutral-400  text-xs font-normal font-manrope leading-none tracking-tight">
            {files.length} Document
          </li>
        )}

        {text.length > 0 && (
          <li className="text-neutral-400  text-xs font-normal font-manrope leading-none tracking-tight">
            {text.length} text input characters
          </li>
        )}

        {urls.length > 1 && (
          <li className="text-neutral-400 text-xs font-normal font-manrope leading-none tracking-tight">
            {urls.length} websites
          </li>
        )}

        {include.length > 0 && (
          <li className="text-neutral-400 text-xs font-normal font-manrope leading-none tracking-tight">
            {include.length} links
          </li>
        )}

        {questions.length > 0 && (
          <li className="text-neutral-400 text-xs font-normal font-manrope leading-none tracking-tight">
            {questions.length} Q & A
          </li>
        )}
      </ul>

      <div className=" w-full  px-3  py-3 justify-center items-center gap-2 flex">
        <button
          onClick={createBot}
          className={`text-white py-[16px] px-5 w-full text-sm font-bold font-manrope ${creatingChatbot ? "bg-sky-700/20" : "bg-sky-700"
            }  rounded-lg shadow border border-sky-700  text-center leading-snug`}
        >
          {creatingChatbot ? "Creating Bot..." : "Create Chatbot"}
        </button>
      </div>
    </div>
  );
}
