import { useEffect } from "react";
import useModalStore from "../../../../store/modal/modalState";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";


function EmbbedModal({ botId }) {

  const embedIframe = `
  <iframe
    src="${window.origin}/widget/${botId}"
  title="Chatbot"
  width="100%"
  style="height: 100%; min-height: 700px"
  frameborder="0"
  ></iframe>
`;

  const hideModal = useModalStore((state) => state.hideModal);

  function copyCode(code) {
    copy(code)
    toast.success("Copied")
}
  return (
    <div className="flex gap-3  flex-col p-3 z-40 items-center w-full justify-center">
      <div className="flex absolute top-3 right-3 justify-end items-end flex-end w-full">
        <button
          onClick={hideModal}
          className="text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          <img src="/images/auth/close_button.svg" />
        </button>
      </div>
      <div className="flex flex-col w-full gap-3 items-center justify-center ">
        <img src="/images/chatbox/stompIcon_&_logo.svg" />
        <div className="w-full text-center text-neutral-900 text-sm font-normal font-['Manrope'] leading-snug">
          To add the chatbot to anywhere on your site, add this iframe to your
          HTML code.
        </div>
        <div className="w-full py-2.5 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-[14px] font-normal font-['Manrope'] ">
            <CodeDisplay code={embedIframe} />
          </div>
        </div>
        <button onClick={() => copyCode(embedIframe)} className="px-3.5 mt-3 py-2 bg-sky-50 rounded-lg shadow border border-sky-50 justify-center items-center gap-2 flex flex-row">
          <p className="text-sky-700 text-xs font-bold font-manrope leading-snug">
            Copy Iframe
          </p>
          <img src="/images/chatbot/copy2.svg" />
        </button>
      </div>
      <div className="flex items-center justify-center flex-col w-full gap-3">
        <div className="w-full text-center text-neutral-900 text-sm font-normal font-['Manrope'] leading-snug">
          To add a chat bubble to the bottom right of your site, add this script
          tag to your HTML code.
        </div>
        <div className="w-full h-[241px] px-6 py-2.5 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 text-black text-[11px] font-normal font-['Manrope'] leading-[3.70px]">
            {/* Placeholder for the chatbot */}
          </div>
        </div>

        <button className="px-3.5  mt-3 py-2 bg-sky-50 rounded-lg shadow border border-sky-50 justify-center items-center gap-2 flex flex-row">
          <p className="text-sky-700 text-xs font-bold font-manrope leading-snug">
            Copy Script
          </p>
          <img src="/images/chatbox/copy2.svg" />
        </button>
      </div>
    </div>
  );
}

function CodeDisplay({ code }) {
  return (
    <div className="bg-gray-100 p-4 rounded-md overflow-auto">
      <pre>
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

export default EmbbedModal;
