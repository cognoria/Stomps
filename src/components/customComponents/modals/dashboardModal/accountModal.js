import Image from "next/image";
import useModalStore from "../../../../store/modal/modalState";

export function AccountModal({ text, button_name, action }) {
  const hideModal = useModalStore((state) => state.hideModal);
  return (
    <div className="w-[90%] lg:w-[365.63px] h-[319px] relative px-6 py-10 bg-white rounded-xl flex-col justify-center items-center gap-10 inline-flex">
      <div className="flex absolute top-3 right-3 justify-end items-end flex-end w-full">
        <button
          onClick={hideModal}
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          <Image width={20} height={20} alt="close" src="/images/auth/close_button.svg" />
        </button>
      </div>
      <div className="self-stretch h-11 flex-col justify-center items-center gap-[13px] flex">
        <div className="max-w-[317.63px] w-[90%] text-center text-zinc-800 text-base font-bold font-['Manrope'] leading-snug tracking-tight">
          {text}
        </div>
      </div>
      <div className="self-stretch h-24 flex-col justify-center items-center gap-4 flex">
        <div className="self-stretch rounded-lg justify-start items-start inline-flex">
          <div className="grow shrink basis-0 h-10 px-4 py-2.5 bg-sky-700 rounded-lg shadow border border-sky-700 justify-center items-center gap-2 flex">
            <button
              onClick={hideModal}
              className="w-full text-center text-white text-sm font-bold font-['Manrope'] leading-snug"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="self-stretch rounded-lg justify-start items-start inline-flex">
          <div className="grow shrink basis-0 h-10 px-4 py-2.5 rounded-lg shadow border border-red-600 justify-center items-center gap-2 flex">
            <button onClick={action ? () => action() : () => { }} className=" text-center text-red-600 text-sm font-bold font-['Manrope'] leading-snug">
              {button_name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
