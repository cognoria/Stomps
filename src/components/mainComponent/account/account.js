"use client";

import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "../../../store/auth/userState";
import useModalStore from "../../../store/modal/modalState";
import { PlanCards } from "../../customComponents/cards/planCards";
import { AccountModal } from "../../customComponents/modals/dashboardModal/accountModal";

function Account() {
  const key = "6ecee3b3-81ee-496d-b5d4-f30290a9b172";

  async function logout() {
    useUserStore.getState().removeUser();
    await fetch("/api/v1/auth/logout");
  }

  const user = useUserStore((state) => state.user);
  // console.log(user);
  return (
    <div className="mt-[80px] lg:mt-[120px] w-full mb-[50px] flex flex-col items-center justify-center gap-y-6">
      <div className="w-full text-center text-sky-700 text-sm lg:text-[28px] font-extrabold font-manrope leading-tight tracking-tight lg:leading-[33.60px]">
        Account
      </div>

      <div className="w-[95%] lg:w-[570px] h-[149px] items-center rounded-lg  border border-gray-200">
        <div className="left-[17px]  p-4 text-sky-700 text-base font-bold font-manrope leading-snug">
          Your Email address
        </div>

        <div className="w-full lg:w-[570px] h-[0px] my-2  border border-gray-200" />
        <div className="p-4 mt-3 text-gray-900 text-xl font-medium font-manrope leading-7 tracking-tight">
          {user?.email}
        </div>
      </div>

      <div className="w-[95%] lg:w-[570px] flex flex-col items-center rounded-lg border border-gray-200">
        <div className="text-sky-700  p-4 lg:text-base  text-sm font-bold font-manrope leading-snug">
          Your API Key
        </div>
        <div className="w-full h-[0px] lg:w-[570px]  my-2  border border-gray-200" />
        <div className="flex gap-y-4 flex-col lg:flex-row items-start justify-between w-full p-4">
          <div className="w-[260px] text-gray-900 text-sm font-medium font-manrope leading-tight tracking-tight">
            Make sure to keep your keys secret and never expose them.
          </div>
          <div className="flex items-end flex-col justify-end w-full lg:w-auto bg:block">
            <div className="w-[210px] flex-end px-2.5 py-2 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex">
              <Link
                href="/account/keys"
                className="text-sky-700 text-sm font-bold font-manrope leading-snug"
              >
                Create New Secret key
              </Link>
              <Image
                width={15}
                height={15}
                className="w-5 h-5"
                alt=""
                src="/images/main/support/add.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between p-4 ">
          <div className="rounded-lg flex flex-col gap-y-4 lg:flex-row items-start justify-between  border w-full border-gray-200 p-4">
            <div className="flex flex-row gap-4 mt-2">
              <div className="w-[287px] text-zinc-800 text-sm font-medium font-manrope leading-tight tracking-tight">
                {key}
              </div>
              <Image
                width={15}
                height={15}
                alt=""
                src="/images/main/support/eye-slash.svg"
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-end flex-col justify-end w-full lg:w-auto bg:block">
              <div className="flex flex-row gap-4 justify-start items-center">
                <button>
                  <Image
                    width={80}
                    height={80}
                    alt=""
                    src="/images/main/support/_Parent Button Base.svg"
                  />
                </button>
                <Image
                  width={20}
                  height={20}
                  alt=""
                  src="/images/main/support/trash.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col items-center w-[95%] lg:w-[570px]">
        <PlanCards />
        <div className="px-[4%] py-[12px] flex flex-row  justify-start lg:justify-center items-start">
          <img alt="" src="/images/landing/warning.svg" />
          <div className="w-full lg:w-[454px] mt-4 text-gray-900 text-base font-normal font-manrope leading-relaxed tracking-tight">
             API costs not included, you need to pay OpenAI and Pinecone for API
            usage separately
          </div>
        </div>
      </div> */}

      <div className="lg:w-[570px] w-[95%] rounded-lg flex-row flex gap-4  justify-end items-end ">
        {/* <button
          className="w-[146px] p-2 rounded-lg shadow border border-red-500 justify-center items-center gap-2 flex"
          onClick={() =>
            useModalStore
              .getState()
              .showModal(
                <AccountModal
                  text={" Are you sure you want to delete your account?"}
                  button_name="Delete Account"
                />
              )
          }
        >
          <Image
            width={20}
            height={20}
            alt=""
            src="/images/main/support/trash.svg"
          />
          <p className="text-red-500 text-xs font-bold font-manrope leading-snug">
            Delete Account
          </p>
        </button> */}
        <Link
          onClick={() => logout()}
          className="w-[146px]   p-2 rounded-lg shadow bg-[#1261AC] justify-center items-center gap-2 flex"
          href="/signin"
        >
          <Image
            width={20}
            height={20}
            alt=""
            src="/images/main/support/logout.svg"
          />
          <p className="text-white text-xs font-bold font-manrope leading-snug">
            Logout
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Account;
