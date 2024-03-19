"use client";

import Link from "next/link";
import useModalStore from "../../../store/modal/modal_state";
import { Account_modal } from "../../customComponents/modals/dashboard_modal/account_modal";

function Main_bot({ chatbots }) {
  return (
    <div className="w-full py-[3%] px-[3%]  lg:px-[6%]">
      <div className="flex flex-row  items-center justify-between">
        <div className="text-sky-700 text-[32px] font-bold font-['Manrope'] leading-[38.40px]">
          Chatbots
        </div>
        <Link
          href="/create_bot"
          className="flex flex-row items-center bg-[#1261AC] text-white px-4 py-3 rounded-md "
        >
          Create New Chatbot +
        </Link>
      </div>
      <div className="flex flex-wrap px-6 py-10 items-center mt-[50px]  relative  bg-sky-50 rounded-2xl overflow-y-hidden  lg:justify-start justify-center gap-7 h-auto w-full  lg:items-start ">
        {chatbots?.map((item, i) => {
          return (
            <div
              className="lg:w-[388px] w-full h-[392px] relative bg-white rounded-2xl border border-sky-700"
              key={i}
            >
              <div className="h-[65%] w-full items-center justify-center border-b-[2px] border-[#1261AC]">
                <img />
              </div>
              <div className="flex flex-col h-[35%] justify-between p-3">
                <div className="text-sky-700 text-xl font-bold font-['Manrope'] leading-7">
                  {item.name}
                </div>
                <div className="flex flex-row items-center justify-between">
                  <Link
                    href={`/bot/${item._id}`}
                    className="inline-flex items-center p-3 bg-[#1261AC] rounded-lg gap-3 text-white text-sm font-bold font-['Manrope'] leading-snug"
                  >
                    <img alt="" src="/images/chatbox/edit.svg" />
                    View/ Edith
                  </Link>
                  <button
                    onClick={() =>
                      useModalStore
                        .getState()
                        .showModal(
                          <Account_modal
                            text={
                              "Are you sure you want to delete this chatbot?"
                            }
                            button_name="Delete Item"
                          />
                        )
                    }
                    className="inline-flex items-center p-3  rounded-lg gap-3 text-red-500 text-sm font-bold font-['Manrope'] leading-snug"
                  >
                    <img alt="" src="/images/chatbox/trash.svg" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main_bot;
