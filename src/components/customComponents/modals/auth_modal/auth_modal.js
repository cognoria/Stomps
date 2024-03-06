import Link from "next/link";
import useModalStore from "../../../../store/modal/modal_state";

export function Forget_password_modal() {
  const hideModal = useModalStore((state) => state.hideModal);
  return (
    <div className="w-full relative md:w-[498px] h-[302px] px-14 py-[47px] bg-transparent rounded-[20px]  flex-col justify-center items-center gap-3 inline-flex">
      <div className="flex absolute top-3 right-3 justify-end items-end flex-end w-full">
        <Link
          href="/signin"
          onClick={hideModal}
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          <img src="/images/auth/close_button.svg" />
        </Link>
      </div>
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

export function Reset_password_modal() {
  const hideModal = useModalStore((state) => state.hideModal);
  return (
    <div className="w-full relative md:w-[502px] h-[344px] px-[100px] py-[47px] bg-transparent rounded-[20px]  flex-col justify-center items-center gap-3 inline-flex">
      <div className="flex absolute top-3 right-3 justify-end items-end flex-end w-full">
        <Link
          href="/signin"
          onClick={hideModal}
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          <img src="/images/auth/close_button.svg" />
        </Link>
      </div>
      <div className="w-8 h-8 relative rounded-xl" />
      <div className="h-[250px] flex-col justify-center items-center gap-5 flex">
        <div className="w-20 h-20 relative">
          <div className="w-[88px] h-[88px] left-0 top-0 absolute opacity-5 bg-sky-700 rounded-full" />
        </div>
        <div className="self-stretch h-[86px] flex-col justify-center items-center gap-3 flex">
          <div className="self-stretch text-center text-sky-700 text-xl font-bold font-['Manrope'] leading-7">
            Password reset sucessful
          </div>
          <div className="self-stretch text-center text-zinc-500 text-sm font-normal font-['Manrope'] leading-snug">
            Your password has been successfully reset. Click below to continue
            your access
          </div>
        </div>
        <div className="self-stretch rounded-lg justify-start items-start inline-flex">
          <Link onClick={hideModal} href="/signin" className="w-full">
            <div className="grow shrink basis-0 h-11 px-5 py-3 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex">
              <div className="text-white text-sm font-bold font-['Manrope'] leading-snug">
                Sign in to Account
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
