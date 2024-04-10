"use client";

import useChatbotSettings from "../../../../store/chatbot/useChatbotSettings";
import useKnowledgebase from "../../../../store/chatbot/useKnowledgebase";
import { useEffect } from "react";

export default function Retrain({chatbotId}) {
  const { website, urls, include, exclude, files, text, questions, getKnowledgebase, getTextLength, getIncludeCount, getFilesCount } = useKnowledgebase()

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

  const { updateKnowledgebase, updatingKnowledgebase } = useChatbotSettings((state) => ({
    updateKnowledgebase: state.updateKnowledgebase,
    updatingKnowledgebase: state.updatingKnowledgebase,
  }));

  async function retrainBot(e) {
    e.preventDefault();
    console.log(dataToSend);
    try {
      await updateKnowledgebase({ botData: dataToSend, botId: chatbotId });
      // router.push(`/bot/${newBot._id}`);
    } catch (error) {
      console.error("Failed to create bot:", error);
    }
  }
  useEffect(() => {
    if (chatbotId) getKnowledgebase(chatbotId)
  }, [chatbotId, getKnowledgebase])

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
          onClick={retrainBot}
          className={`text-white py-[16px] px-5 w-full text-sm font-bold font-manrope ${updatingKnowledgebase ? "bg-sky-700/20" : "bg-sky-700"
            }  rounded-lg shadow border border-sky-700  text-center leading-snug`}
        >
          {updatingKnowledgebase ? "Retraining Bot..." : "Retrain Chatbot"}
        </button>
      </div>
    </div>
  );
}
