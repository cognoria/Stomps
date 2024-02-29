function Auth_header({ desc, desc2 }) {
  return (
    <div className="flex mt-[80px]  md:mt-[120px]  flex-col items-center justify-center w-screen">
      <div className="text-[#1261AC] text-[28.38px] md:text-[34.39px] font-extrabold font-manrope leading-[34.07px] md:leading-[41.26px]">
        Stomps.io
      </div>
      <div className="text-center text-[#2E3034] text-sm md:text-xl font-bold font-manrope mt-[20px] leading-tight md:leading-7 tracking-tight">
        {desc}
      </div>

      {desc2 && (
        <div className="text-center w-[80%] md:w-full mt-[10px] text-zinc-500 text-xs md:text-sm font-normal leading-none tracking-tight font-manrope md:leading-snug">
          {desc2}
        </div>
      )}
    </div>
  );
}

export default Auth_header;
