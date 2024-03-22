function Chatbot_key_check() {
  return (
    <div className="flex flex-col overflow-x-hidden w-[95%] lg:w-full mt-[150px] items-center justify-center">
      <div className="text-center text-sky-700 text-[32px] font-bold font-manrope leading-[44.80px] tracking-tight">
        Welcome to Stomps
      </div>
      <div className="text-center w-[90%] lg:w-full  my-[50px] text-zinc-800 text-base font-normal font-manrope leading-relaxed tracking-tight">
        To proceed, you will have to input your Pinecone and OpenAI API keys
      </div>
      <form className="w-screen lg:w-[479px]  flex flex-col items-center justify-center   gap-y-[20px] ">
        <div className="flex flex-col items-center justify-center    gap-y-4  w-full">
          <div className="text-zinc-500  w-full items-start text-xs font-bold font-manrope leading-none tracking-tight">
            Pinecone API key
          </div>
          <input
            placeholder="Enter Pinecone API key"
            type="text/number"
            className="w-full lg:w-[479px] h-[43px] p-3 rounded shadow border border-blue-100  items-center"
          />
        </div>
        <div className="flex flex-col items-center gap-y-4   w-full">
          <div className="text-zinc-500 text-xs w-full items-start font-bold font-manrope leading-none tracking-tight">
            OpenAI API key
          </div>
          <input
            placeholder="Enter OpenAI API key"
            type="text/number"
            className="w-full lg:w-[479px] h-[43px] p-3 rounded shadow border border-blue-100  items-center"
          />
        </div>

        <button className="w-[481px] mt-[40px] h-11 rounded-lg px-5 py-3 bg-sky-700 text-white text-sm font-bold font-manrope leading-snug">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Chatbot_key_check;
