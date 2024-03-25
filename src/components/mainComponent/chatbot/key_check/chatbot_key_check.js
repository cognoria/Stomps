"use client";

import { useState } from "react";
import useAddApiKeyStore from "../../../../store/chat_bot_state/api_key/add_api_key";

function Chatbot_key_check() {
  const [openaikey, setOpenaikey] = useState("");
  const [pineconeKey, setPineconeKey] = useState("");
  const { add_api_key, loading, error } = useAddApiKeyStore((state) => ({
    add_api_key: state.add_api_key,
    loading: state.loading,
    error: state.error,
  }));
  const onSubmit = (e) => {
    e.preventDefault();
    const data = { openaikey, pineconeKey };
    add_api_key(data, () => {
      router.push("/");
    });
  };
  return (
    <div className="flex flex-col overflow-x-hidden w-[98%] lg:w-full mt-[150px] items-center justify-center">
      <div className="text-center text-sky-700 text-[32px] font-bold font-manrope leading-[44.80px] tracking-tight">
        Welcome to Stomps
      </div>
      <div className="text-center w-[90%] lg:w-full  my-[50px] text-zinc-800 text-base font-normal font-manrope leading-relaxed tracking-tight">
        To proceed, you will have to input your Pinecone and OpenAI API keys
      </div>

      <form
        onSubmit={onSubmit}
        className="w-full lg:w-[479px] p-1  flex flex-col items-center justify-center gap-y-[20px] "
      >
        <div className="flex flex-col items-center    gap-y-4  w-full">
          <div className="text-zinc-500  w-full items-start text-xs font-bold font-manrope leading-none tracking-tight">
            Pinecone API key
          </div>
          <input
            onChange={(e) => setPineconeKey(e.target.value)}
            placeholder="Enter Pinecone API key"
            type="text/number"
            className="w-full lg:w-[479px] h-[43px] p-3 rounded shadow border border-blue-100 "
          />
        </div>
        <div className="flex flex-col items-center gap-y-4   w-full">
          <div className="text-zinc-500 text-xs w-full items-start font-bold font-manrope leading-none tracking-tight">
            OpenAI API key
          </div>
          <input
            onChange={(e) => setOpenaikey(e.target.value)}
            placeholder="Enter OpenAI API key"
            type="text/number"
            className="w-full lg:w-[479px] h-[43px] p-3 rounded shadow border border-blue-100 "
          />
        </div>

        <button
          disabled={loading}
          className={`lg:w-[481px] w-full mt-[40px] h-11 rounded-[12px] px-5 py-3 ${
            loading ? "bg-sky-700/30" : "bg-sky-700"
          }  text-white text-sm font-bold font-manrope leading-snug`}
        >
          {loading ? "Adding" : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default Chatbot_key_check;
