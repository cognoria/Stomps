/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "../../store/auth/userState";
import bot_nav from "../../store/chat_bot_state/chatbot_state";

function Chat_bot_nav({ nav, tag }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // const { user } = useLoginAuthStore((state) => ({
  //   user: state.user,
  // }));
  const setCurrentPage = bot_nav((state) => state.setCurrentPage);
  const currentPage = bot_nav((state) => state.currentPage);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (lastScrollY > currentScrollY) {
          setIsVisible(true);
        } else if (lastScrollY < currentScrollY) {
          setIsVisible(false);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  const navbarStyles = {
    top: 0,
    width: "100%",
    transition: "top 0.2s",
    top: isVisible ? "0" : "-60px",
  };

  return (
    <div style={navbarStyles} className={`flex  flex-col  z-50  w-full`}>
      {/* desktop nav for chat bot */}
      <div className="lg:flex hidden flex-col gap-2 ">
        {nav.map((items, i) => {
          return (
            <button
              onClick={() => setCurrentPage(items.link_name.trim())}
              key={i}
              className={`flex p-2 active:bg-[#F3FAFF] w-[212px] ${
                currentPage == items.link_name
                  ? "border-r-[4px] border-[#1261AC]"
                  : ""
              }  flex-row gap-4 items-start justify-start`}
            >
              <img src={items.img_link} alt="" />
              <p className="text-zinc-500 text-sm font-bold font-manrope leading-snug">
                {items.link_name}
              </p>
            </button>
          );
        })}
      </div>
      {/* desktop nav for chat bot */}

      {/* mobile nav for chatbot */}
      <div className="w-full  flex flex-col items-center lg:hidden  px-5">
        <div className="flex flex-row w-full justify-between ">
          <div className="text-sky-700 text-2xl font-bold font-manrope leading-[28.80px]">
            {tag}
          </div>

          <div className="flex  ">
            <button
              type="button"
              className="text-gray-900  "
              onClick={toggleExpansion}
              aria-expanded={expanded}
            >
              {!expanded && (
                <span>
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </span>
              )}

              {expanded && (
                <span>
                  <svg
                    className="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="flex flex-col w-screen top-[100px] mt-4 bg-white  pl-[3%] pr-[5%]  gap-2 lg:hidden  ">
          {nav.map((items, i) => {
            return (
              <button
                onClick={() => setCurrentPage(items.link_name.trim())}
                key={i}
                className={`flex py-2 w-full active:bg-[#F3FAFF] lg:w-[212px]  ${
                  currentPage == items.link_name
                    ? "border-r-[4px] border-[#1261AC]"
                    : ""
                } flex-row gap-4 items-start justify-start`}
              >
                <img src={items.img_link} alt="" />
                <p className="text-zinc-500 text-sm font-bold font-manrope leading-snug">
                  {items.link_name}
                </p>
              </button>
            );
          })}
        </div>
      )}
      {/* mobile nav for chatbot */}
    </div>
  );
}

export default Chat_bot_nav;
