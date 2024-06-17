import Image from "next/image";
import BarHeader from "./header";

function EmptyDashboard({ header, msg }) {
  return (
    <div className="lg:w-full w-[95%]  lg:p-[6%]  flex flex-col justify-center items-center  ">
      <div className="flex flex-col items-start justify-center w-full border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          {header}
        </div>
        <BarHeader />
        <div className="w-full gap-4 h-[541px] flex flex-col items-center justify-center">
          <Image width={50} height={50} src="/images/chatbox/chatbox.svg" alt="" className="w-[220px] h-[220px]" />

          <div className="text-zinc-500 text-sm font-medium font-manrope leading-tight tracking-tight">
            {msg}.
          </div>
          <div className="flex flex-row gap-2  items-center justify-center w-full ">
            <div className="text-sky-700 text-sm font-bold font-manrope  leading-snug">
              Refresh
            </div>
            <Image width={20} height={20} alt="" src="/images/chatbox/refres.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyDashboard;
