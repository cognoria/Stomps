/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/auth/userState";
import { RoundedSubmitButton } from "../customComponents/custom_buttons/button1";

function Nav_bar() {
  const [expanded, setExpanded] = useState(false);
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // const { user } = useLoginAuthStore((state) => ({
  //   user: state.user,
  // }));

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
    position: "fixed",
    top: 0,
    width: "100%",
    transition: "top 0.2s",
    top: isVisible ? "0" : "-60px",
  };

  return (
    <div style={navbarStyles} className={`flex flex-col   z-50 mb-[20px]`}>
      <div className="w-screen hidden    fixed  lg:flex  bg-white px-[8%] pt-[5%] md:pt-0 lg:py-[2.2%] h-[2%]  flex-row justify-between items-center">
        <img src="/images/landing/logo.svg" alt="logo" />
        {!user && (
          <div className="flex-row gap-4 md:flex hidden items-center justify-center">
            <div className="text-[#1261AC] text-sm font-bold font-manrope leading-snug">
              <Link href="https://stomp-ai.vercel.app/">Home</Link>
            </div>
            <div className="text-black text-sm font-400 font-manrope leading-snug">
              <Link href="https://stomp-ai.vercel.app/#price">Pricing</Link>
            </div>
          </div>
        )}

        {!user ? (
          <div className="md:flex hidden flex-row gap-4">
            <Link href="/signin">
              <RoundedSubmitButton
                button_content={"login"}
                color={"bg-transparent"}
                radius={"rounded-[8px]"}
                width={"w-[107px]"}
                text_color={"text-[#1261AC]"}
                text_size={"text-[14px]"}
                border_color={"border-[#1261AC]"}
                border={"border-[1px]"}
              />
            </Link>
            <Link href="/signup">
              <RoundedSubmitButton
                button_content={"Create Account"}
                color={"bg-[#1261AC] "}
                radius={"rounded-[8px]"}
                width={"w-[147px]"}
                text_color={"text-[#fff]"}
                text_size={"text-[14px]"}
              />
            </Link>
          </div>
        ) : (
          <div className="flex text-[14px] text-black gap-x-3 flex-row items-center justify-end">
            <Link href="/">
              <div>ChatBot</div>
            </Link>
            <Link href="/support">
              <div>Help</div>
            </Link>
            <Link href="/account">
              <div>Account</div>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full px-[4%] py-[2.5%] lg:hidden bg-white z-50 items-center justify-between">
        <div className="flex flex-row w-full justify-between">
          {expanded ? (
            <div className="text-[#1261AC]   text-2xl font-extrabold font-manrope leading-[28.80px]">
              Stomps.io
            </div>
          ) : (
            <img src="/images/landing/logo1.svg" alt="logo" />
          )}

          <div className="flex ">
            <button
              type="button"
              className="text-gray-900"
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
        {expanded && (
          <nav className="px-[4%] w-full">
            <div className="px-1 py-8">
              <div className="grid gap-y-7">
                {!user && (
                  <div>
                    <div
                      href="#"
                      title=""
                      className="flex items-center p-3 -m-3 border-b-[1px] border-[#DBDDE0] text-base font-medium text-gray-900 transition-all duration-200  hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                    >
                      <Link
                        className="w-full"
                        href="https://stomp-ai.vercel.app/"
                      >
                        Home
                      </Link>
                    </div>

                    <div className="flex items-center p-3 -m-3 border-b-[1px] border-[#DBDDE0] text-base font-medium text-gray-900 transition-all duration-200  hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                      <Link
                        className="w-full"
                        href="https://stomp-ai.vercel.app/#price"
                      >
                        Pricing
                      </Link>
                    </div>
                  </div>
                )}

                {!user ? (
                  <div className="flex flex-col w-full gap-y-5">
                    <Link
                      href="/signin"
                      title=""
                      className="inline-flex mt-[100px]  items-center justify-center  px-6 py-3 text-base font-bold leading-7 text-[#1261AC] transition-all rounded-[8px] duration-200 bg-[#fff] border-[1px] border-[#1261AC]  hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      title=""
                      className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all rounded-[8px] duration-200  bg-[#1261AC] border border-transparent  hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      role="button"
                    >
                      Create Account
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col w-full gap-y-3">
                    <Link
                      href="/"
                      title=""
                      className="flex items-center p-3 -m-3 border-b-[1px] border-[#DBDDE0] text-base font-medium text-gray-900 transition-all duration-200  hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                      role="button"
                    >
                      Chatbot
                    </Link>
                    <Link
                      href="/support"
                      title=""
                      className="flex items-center p-3 -m-3 border-b-[1px] border-[#DBDDE0] text-base font-medium text-gray-900 transition-all duration-200  hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                      role="button"
                    >
                      Help
                    </Link>
                    <Link
                      href="/account"
                      title=""
                      className="flex items-center p-3 -m-3 border-b-[1px] border-[#DBDDE0] text-base font-medium text-gray-900 transition-all duration-200  hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                      role="button"
                    >
                      Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Nav_bar;
