function Support() {
  return (
    <div className="w-screen mt-[120px] flex flex-col justify-center font-manrope items-center">
      <div className="text-sky-700 my-[50px] text-[28px] font-extrabold font-manrope leading-[33.60px]">
        Complaint Form
      </div>
      <div className="w-[45%] my-[30px] h-[711px] relative rounded-lg border border-gray-200">
        <div className="w-full  p-[17px] text-sky-700 text-base font-bold font-manrope leading-snug">
          Submit a case to our customer support team
        </div>
        <div className="w-full my-[5px] border border-gray-200" />
        <div className="flex flex-col gap-1 items-start w-full">
          <div className="flex w-full gap-3 flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Email
            </div>
            <input className="w-full h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex" />
          </div>
          <div className="flex gap-3 w-full flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Select Chatbot
            </div>
            <select className="w-full h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex">
              <option>Example 1 Chatbot</option>
            </select>
          </div>
          <div className="flex px-[3%] flex-row items-start justify-between">
            <div className="flex flex-1 gap-3 w-full flex-col items-start  py-[2%]">
              <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                Selected Problem
              </div>
              <select className="w-full h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex">
                <option>Example 1 Chatbot</option>
              </select>
            </div>
            <div className="flex flex-1 gap-3 w-full flex-col items-start px-[3%] py-[2%]">
              <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                Level of Severity
              </div>
              <select className="w-full h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex">
                <option>Example 1 Chatbot</option>
              </select>
            </div>
          </div>
          <div className="flex w-full gap-3 flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Subject
            </div>
            <input className="w-full h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex" />
          </div>

          <div className="flex w-full gap-3 flex-col items-start px-[3%] py-[2%]">
            <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Description
            </div>
            <textarea className="w-full h-[120px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
