/* eslint-disable @next/next/no-img-element */
import { plan_data } from "@/data/data";
import { RoundedSubmitButton } from "../custom_buttons/button1";

/* eslint-disable react/no-unescaped-entities */
export function Plan_cards() {
  return (
    <div className="w-[95%] md:w-[570px] rounded-[16px]  border-[1px] p-[22px] md:p-[44px] border-[#1261AC]">
      <div className="w-[467px] mb-5 text-sky-700 text-xl font-medium font-manrope leading-7 tracking-tight">
        Here's what you gain access to:
      </div>

      {plan_data?.map((items, i) => (
        <div className="mb-2 flex flex-row items-start gap-3" key={i}>
          {items.availability && <img src="./images/landing/Check_icon.svg" />}

          <div className="w-[434px]">
            <span className="text-sky-700 text-base font-bold font-manrope leading-snug tracking-tight">
              {items.tag}
            </span>
            <span className="text-gray-900 text-base font-normal font-manrope leading-relaxed tracking-tight">
              {items.text}
            </span>
          </div>
        </div>
      ))}

      <div className="w-full justify-center items-center flex flex-col my-6 gap-4">
        <div className="text-center justify-center flex flex-row">
          <div className="w-[296px] text-center">
            <span className="text-zinc-800 text-xl font-medium font-manrope line-through leading-7 tracking-tight">
              $999
            </span>
            <span className="text-sky-700 text-[40px] font-extrabold font-manrope leading-[48px]">
              $399
            </span>
            <span className="text-zinc-800 text-xl font-medium font-manrope leading-7 tracking-tight">
              [Early Birds]
            </span>
          </div>
        </div>
        <RoundedSubmitButton
          text_color={"text-white"}
          button_content={"Get Started"}
          radius={"rounded-[8px]"}
          width={"w-[293px]"}
        />
      </div>
    </div>
  );
}
