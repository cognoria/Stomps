"use client";

import { useRouter } from "next/navigation";
import useFormDataStore from "../../../store/chat_bot_state/chat_bot_store";
import useBotCreationStore from "../../../store/chat_bot_state/create_new_bot";

export default function Sources() {
  const formData = useFormDataStore((state) => state.formData);
  const textLength = useFormDataStore((state) => state.getTextLength());
  const includeCount = useFormDataStore((state) => state.getIncludeCount());
  const questionCount = useFormDataStore((state) => state.getQuestionCount());
  const filesCount = useFormDataStore((state) => state.getFilesCount());
  const questionsJSON = JSON.stringify(formData.questions);

  const dataToSend = {
    website: formData.website,
    urls: formData.urls,
    include: formData.include,
    exclude: formData.exclude,
    contents: [
      { url: "Q&A", content: `${questionsJSON}` },
      { url: "TXT", content: `${formData.text}` },
      ...formData.files,
    ],
  };

  const isLoading = useBotCreationStore((state) => state.loading);
  const router = useRouter();
  async function createBot(e) {
    e.preventDefault();
    console.log(dataToSend);
    try {
      const newBot = await useBotCreationStore.getState().createBot(dataToSend);
      useFormDataStore.getState().clearFormData(newBot.id);
      router.push(`/bot/${newBot.id}`);
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
        {filesCount >= 1 && (
          <li className="text-neutral-400  text-xs font-normal font-manrope leading-none tracking-tight">
            {filesCount} Document detected
          </li>
        )}

        {textLength >= 1 && (
          <li className="text-neutral-400  text-xs font-normal font-manrope leading-none tracking-tight">
            {textLength} text input characters
          </li>
        )}

        {includeCount >= 1 && (
          <li className="text-neutral-400 text-xs font-normal font-manrope leading-none tracking-tight">
            {includeCount} links detected
          </li>
        )}

        {questionCount >= 1 && (
          <li className="text-neutral-400 text-xs font-normal font-manrope leading-none tracking-tight">
            {questionCount} Q & A detected
          </li>
        )}
      </ul>

      <div className=" w-full  px-3  py-3 justify-center items-center gap-2 flex">
        <button
          onClick={createBot}
          className={`text-white py-[16px] px-5 w-full text-sm font-bold font-manrope ${
            isLoading ? "bg-sky-700/20" : "bg-sky-700"
          }  rounded-lg shadow border border-sky-700  text-center leading-snug`}
        >
          {isLoading ? "Creating Bot..." : "Create Chatbot"}
        </button>
      </div>
    </div>
  );
}
