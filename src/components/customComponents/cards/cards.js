/* eslint-disable @next/next/no-img-element */
function AiCard1({ height, icon, text_box_width, body, title }) {
  return (
    <div
      className={`md:w-[274px]  w-[96%] h-[300.65px] md:h-[330.65px] px-[16.69px] py-[35px] rounded-lg border border-sky-700 flex-col justify-center items-start gap-[16.69px] inline-flex`}
    >
      <div className="w-[68.27px] h-[68.27px] pl-[22.31px] pr-[21.96px] pt-[22px] pb-[22.27px] bg-sky-50 rounded-[45.94px] justify-center items-center inline-flex">
        <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
          <img src={`${icon}`} alt="" className="w-6 h-6 relative" />
        </div>
      </div>
      <div className="text-zinc-800 text-base font-bold font-manrope leading-snug">
        {title}
      </div>
      <div
        className={`w-[${text_box_width}] text-gray-600 text-sm font-normal font-manrope leading-snug`}
      >
        {body}
      </div>
    </div>
  );
}

export default AiCard1;
