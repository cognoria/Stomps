import BarHeader from "./header";

function EmptyDashboard() {
  return (
    <div className="lg:w-full w-[98%]  lg:p-[6%]  flex flex-col items-start  ">
      <div className="flex flex-col items-start justify-center w-full border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Chat logs
        </div>

        <BarHeader />

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
}

export default EmptyDashboard;
