export function Forget_password_modal() {
  return (
    <div className="w-[498px] h-[302px] px-14 py-[47px] bg-transparent rounded-[20px]  flex-col justify-center items-center gap-3 inline-flex">
      <div className="w-8 h-8 relative rounded-xl" />
      <div className="self-stretch h-[198px] flex-col justify-center items-center gap-5 flex">
        <div className="w-20 h-20 relative">
          <div className="w-[88px] h-[88px] left-0 top-0 absolute opacity-5 bg-sky-700 rounded-full" />
          <img
            className="w-[78px] h-[78px] left-[1px] top-[1px] absolute"
            src="/images/auth/mail_arrow.svg"
          />
        </div>
        <div className="self-stretch h-[98px] flex-col justify-center items-center gap-3 flex">
          <div className="self-stretch text-center text-sky-700 text-xl font-bold font-['Manrope'] leading-7">
            Link sent!!
          </div>
          <div className="self-stretch text-center text-zinc-500 text-sm font-normal font-['Manrope'] leading-snug">
            A password reset link has been sent to your inbox
          </div>
          <div className="self-stretch text-center">
            <span className="text-zinc-500 text-[10px] font-normal font-['Manrope'] leading-[14px] tracking-tight">
              Didn’t receive a mail?
            </span>
            <span className="text-zinc-500 text-sm font-normal font-['Manrope'] leading-snug">
              00
            </span>
            <span className="text-sky-700 text-[10px] font-bold font-['Manrope'] leading-[14px] tracking-tight">
              Resend
            </span>
            <span className="text-zinc-500 text-[10px] font-normal font-['Manrope'] leading-[14px] tracking-tight">
              in
            </span>
            <span className="text-zinc-500 text-sm font-normal font-['Manrope'] leading-snug"></span>
            <span className="text-red-600 text-[10px] font-bold font-['Manrope'] leading-[14px] tracking-tight">
              59:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
