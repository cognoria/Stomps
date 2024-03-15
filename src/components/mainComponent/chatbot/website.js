"use client";

function Website() {
  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className="flex mt-[60px] items-center lg:flex-row lg:items-start gap-3 flex-col  justify-center">
        <div className="w-[95%] lg:w-[570px] h-auto lg:h-[603px] border-[1px]  rounded-lg  border-gray-200">
          <div className="w-full h-auto  border-[1px] text-sky-700 px-3 py-4 border-gray-200 text-base font-bold font-manrope leading-snug">
            Website
          </div>
          <div className="lg:h-[85%] h-auto w-full">
            <div className="p-3 h-[60%] flex w-full flex-col items-center lg:items-start gap-2">
              <div className="flex flex-col  w-full items-start justify-between gap-4">
                <div className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                  Crawl
                </div>
                <div className="flex w-full flex-col lg:flex-row items-center justify-between gap-2">
                  <input
                    type="text"
                    className="w-full lg:w-[413px] h-[47px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex"
                  />
                  <button className="h-11 w-full lg:w-fit px-5 py-3 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex">
                    <p className="text-white text-sm font-bold font-manrope leading-snug">
                      Fetch link
                    </p>
                  </button>
                </div>
                <div className="text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  This will crawl all the links starting with the URL [not
                  including files on the website].
                </div>
              </div>

              <div className="flex gap-3 flex-row w-full items-center ">
                <hr className="bg-gray-200 h-[2px] w-full" />
                or
                <hr className="bg-gray-200 h-[2px] w-full" />
              </div>

              <div className="flex flex-col w-full items-start justify-between gap-4">
                <div className="text-zinc-800 w-full text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                  Submit Sitemap
                </div>
                <div className="flex flex-col w-full lg:flex-row items-center justify-between gap-2">
                  <input
                    type="text"
                    className="w-full lg:w-[383px] h-[47px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex"
                  />
                  <button className="h-11 w-full lg:w-fit px-5 py-3 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex">
                    <p className="text-white text-sm font-bold font-manrope leading-snug">
                      Load Sitemap
                    </p>
                  </button>
                </div>
                <div className="text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  This will crawl all the links starting with the URL [not
                  including files on the website].
                </div>
              </div>
            </div>
            <div className="h-auto lg:h-[40%] mt-[20px] lg:mt-0 p-3  w-full  flex flex-col">
              <div className="flex gap-3 h-[30%] flex-row w-full items-center ">
                <hr className="bg-gray-200 h-[2px] w-full" />
                <div className="text-center text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  Included links
                </div>
                <hr className="bg-gray-200 h-[2px] w-full" />
              </div>
              <div className="flex flex-row  p-5 items-end lg:mt-0 mt-[70px]  h-auto lg:h-[70%] justify-end">
                <div className="flex flex-row items-center  gap-x-5 ">
                  <button className="bg-transparent items-center gap-2 flex flex-row">
                    <img src="/images/chatbox/trash.svg" />
                    <p className="text-red-500 text-xs font-bold font-manrope leading-snug">
                      Delete all
                    </p>
                  </button>
                  <button className=" px-5 py-3 text-[#1261AC] text-xs font-bold font-manrope leading-snug bg-[#EEF8FF] flex items-center justify-center flex-col  rounded-lg">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[95%] lg:w-[275px] pb-3 h-[204px]  flex items-center justify-between flex-col rounded-lg border border-gray-200">
          <div className=" w-full  text-center border-[1px] text-sky-700  p-3 border-gray-200 text-base font-bold font-manrope leading-snug">
            Sources
          </div>
          <div className=" w-full  px-3  py-3 justify-center items-center gap-2 flex">
            <button className="text-white py-[16px] px-5 w-full text-sm font-bold font-manrope bg-sky-700 rounded-lg shadow border border-sky-700  text-center leading-snug">
              Create Chatbot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Website;
