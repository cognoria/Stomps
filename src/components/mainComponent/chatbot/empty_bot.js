import Link from "next/link";

function Empty_bot() {
  return (
    <div className="w-full p-[6%] mt-[80px] flex flex-col itmes-center justify-center ">
      <div className="flex flex-col gap-4">
        <p className="text-sky-700 text-[32px] font-bold font-manrope leading-[38.40px]">
          ChatBots
        </p>
        <div className="w-full gap-4 bg-[#EEF8FF] h-[541px] flex flex-col items-center justify-center">
          <img src="/images/chatbox/chatbox.svg" alt="" className="" />
          <div className="text-zinc-500 mt-5 text-sm font-bold font-manrope leading-tight tracking-tight">
            You haven’t created any chatbots yet.
          </div>
          <Link
            href="/create_bot"
            className="w-64  text-white text-sm font-bold font-manrope leading-snug shrink basis-0 mt-5 h-11 px-5 py-3 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex"
          >
            Create ChatBot
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Empty_bot;
