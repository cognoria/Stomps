"use client";

import { useState } from "react";
import useFormDataStore from "../../../store/chat_bot_state/chat_bot_store";
import useLinkStore from "../../../store/chat_bot_state/generate_links";
import useSitemapStore from "../../../store/chat_bot_state/generate_sitemap";

function Website() {
  const loading = useLinkStore((state) => state.loading);
  const loading2 = useSitemapStore((state) => state.loading);
  const include = useFormDataStore((state) => state.formData.include);
  const website = useFormDataStore((state) => state.formData.website);
  const sitemap = useFormDataStore((state) => state.formData.sitemap);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!website.startsWith("http://") && !website.startsWith("https://")) {
      return setError("invalid Url , Must contain http:// or https://");
    }

    await useLinkStore.getState().fetchLinksAndUpdateInclude(website);
  };

  const sitemapSubmit = async (e) => {
    e.preventDefault();
    await useSitemapStore.getState().fetchSitemapAndUpdateInclude(sitemap);
  };

  const handleWebsite = (e) => {
    const website = e.target.value;
    useFormDataStore.getState().addWebsite(website);
  };

  const handleSitemap = (e) => {
    const sitemap = e.target.value;
    useFormDataStore.getState().addSitemap(sitemap);
  };
  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className="flex mt-[60px] items-center lg:flex-row lg:items-start gap-3 flex-col  justify-center">
        <div className="w-[95%] lg:w-[570px] h-auto lg:h-auto border-[1px]  rounded-lg  mb-5 border-gray-200">
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
                    onChange={handleWebsite}
                    type="text"
                    value={website}
                    className="w-full lg:w-[413px] h-[47px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex"
                  />
                  <button
                    onClick={handleSubmit}
                    className={`h-11 w-full lg:w-fit px-5 py-3    ${
                      !loading ? "bg-sky-700" : "bg-sky-700/20"
                    } rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex`}
                  >
                    <p className="text-white text-sm font-bold font-manrope leading-snug">
                      {loading ? "fetching..." : " Fetch link"}
                    </p>
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-[10px] font-normal font-manrope leading-[10px] tracking-tight">
                    {error}
                  </p>
                )}

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
                    value={sitemap}
                    type="text"
                    onChange={handleSitemap}
                    className="w-full lg:w-[383px] h-[47px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center gap-2 inline-flex"
                  />
                  <button
                    onClick={sitemapSubmit}
                    className={`h-11 w-full lg:w-fit px-5 py-3 ${
                      loading2 ? "bg-sky-700/20" : "bg-sky-700"
                    }  rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex`}
                  >
                    <p className="text-white text-sm font-bold font-manrope leading-snug">
                      {loading2 ? "Loading Sitemap..." : "Load Sitemap"}
                    </p>
                  </button>
                </div>
                <div className="text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  This will crawl all the links starting with the URL [not
                  including files on the website].
                </div>
              </div>
            </div>
            <div className="h-auto  mt-[20px] lg:mt-0 p-3  w-full  flex flex-col">
              <div className="flex gap-3 mt-[50px] flex-row w-full items-center ">
                <hr className="bg-gray-200 h-[2px] w-full" />
                <div className="text-center text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  Included links
                </div>
                <hr className="bg-gray-200 h-[2px] w-full" />
              </div>
              <div className="flex flex-row  p-5 items-end lg:mt-0 mt-[70px] [mt-50px]  h-auto lg:h-[70%] justify-end">
                <div className="flex flex-row items-center  gap-x-5 ">
                  <button
                    onClick={() =>
                      useFormDataStore.getState().deleteAll(["include", "urls"])
                    }
                    className="bg-transparent items-center gap-2 flex flex-row"
                  >
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
              {include && (
                <div className="w-full px-2 mt-[40px]">
                  <ul className="w-full">
                    {include.slice(0, 10).map((link, index) => (
                      <li
                        key={index}
                        className="w-full flex flex-row items-center gap-2 justify-between "
                      >
                        <div className="w-[94%]  h-[42px] pl-[15px] pr-4 pt-3 pb-[13px] rounded-lg border border-gray-200 justify-between items-start gap-[158px] flex flex-row">
                          <div className="text-gray-900  lg:max-w-[85%] w-[92%] text-xs font-normal font-manrope leading-none tracking-tight">
                            {link}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            useFormDataStore.getState().deleteInclude(index)
                          }
                        >
                          <img
                            src="/images/chatbox/trash.svg"
                            alt=""
                            classNAme="w-full h-auto"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Website;
