"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useCreateChatbotStore from "../../../store/chatbot/useCreateChatbotStore";

function Website() {
  const [error, setError] = useState(null);

  const {
    urls,
    sitemap,
    website,
    include,
    loading,
    deleteUrl,
    addLinksWithSitemap,
    deleteInclude,
    deleteAllInclude,
    addLinksWithWebsite,
    updateWebsite,
    updateSiteMap,
  } = useCreateChatbotStore((state) => ({
    urls: state.urls,
    sitemap: state.sitemap,
    website: state.website,
    include: state.include,
    loading: state.fetching,
    deleteUrl: state.deleteUrl,
    updateWebsite: state.updateWebsite,
    updateSiteMap: state.updateSiteMap,
    deleteInclude: state.deleteInclude,
    deleteAllInclude: state.deleteAllInclude,
    addLinksWithWebsite: state.addLinksWithWebsite,
    addLinksWithSitemap: state.addLinksWithSitemap,
  }));

  useEffect(() => {
    if (!website.startsWith("http://") && !website.startsWith("https://")) {
      setError("Invalid URL, must contain http:// or https://");
    } else {
      setError(null);
    }
  }, [website]);

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    if (error) return;
    await addLinksWithWebsite(website);
  };

  const handleAddSitemap = async (e) => {
    e.preventDefault();
    if (error) return;
    await addLinksWithSitemap(sitemap);
  };

  const handleWebsite = (e) => {
    const website = e.target.value;
    updateWebsite(website);
  };

  const handleSitemap = (e) => {
    const sitemap = e.target.value;
    updateSiteMap(sitemap);
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
                    onClick={handleAddWebsite}
                    className={`h-11 w-full lg:w-fit px-5 py-3    ${!loading ? "bg-sky-700" : "bg-sky-700/20"
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
                    onClick={handleAddSitemap}
                    className={`h-11 w-full lg:w-fit px-5 py-3 ${loading ? "bg-sky-700/20" : "bg-sky-700"
                      }  rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex`}
                  >
                    <p className="text-white text-sm font-bold font-manrope leading-snug">
                      {loading ? "Loading Sitemap..." : "Load Sitemap"}
                    </p>
                  </button>
                </div>
                <div className="text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  This will crawl all the links starting with the URL [not
                  including files on the website].
                </div>
              </div>
            </div>
            {urls && urls.length > 1 && (<div className="h-auto  mt-[20px] lg:mt-0 p-3  w-full  flex flex-col">
              <div className="flex gap-3 mt-[50px] flex-row w-full items-center ">
                <hr className="bg-gray-200 h-[2px] w-full" />
                <div className="text-center text-gray-900 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                  websites
                </div>
                <hr className="bg-gray-200 h-[2px] w-full" />
              </div>
              <div className="w-full px-2 mt-[40px] max-h-[420px] overflow-y-scroll">
                <ul className="w-full flex-col gap-1 flex">
                  {urls.map((link, index) => (
                    <li
                      key={index}
                      className="w-full flex flex-row items-center gap-2 justify-between "
                    >
                      <div className="w-[94%]  h-[42px] pl-[15px] pr-4 pt-3 pb-[13px] rounded-lg border border-gray-200 justify-between items-start gap-[158px] flex flex-row">
                        <div className="text-gray-900  lg:max-w-[85%] w-[92%] text-xs font-normal font-manrope leading-none tracking-tight">
                          {link}
                        </div>
                      </div>
                      <button onClick={() => deleteUrl(index)}>
                        <Image
                          width={15}
                          height={15}
                          src="/images/chatbox/trash.svg"
                          alt=""
                          className="w-full h-auto"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )}
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
                    onClick={() => deleteAllInclude()}
                    className="bg-transparent items-center gap-2 flex flex-row"
                  >
                    <Image
                      width={20}
                      height={20}
                      alt=""
                      src="/images/chatbox/trash.svg"
                    />
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
                <div className="w-full px-2 mt-[40px]  max-h-[420px] overflow-y-scroll">
                  <ul className="w-full flex-col gap-1 flex">
                    {include.map((link, index) => (
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
                          onClick={() => deleteInclude(index)}>
                          <Image
                            width={20}
                            height={20}
                            src="/images/chatbox/trash.svg"
                            alt=""
                            className="w-full h-auto"
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
