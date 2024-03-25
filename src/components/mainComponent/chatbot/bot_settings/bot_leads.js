"use client";
import { useEffect, useState } from "react";
import { useBotLeadsSettingsStore } from "../../../../store/chat_bot_state/chatbotSettings/settings";
import useSingleChatbot from "../../../../store/chat_bot_state/single_chat_bot";
import Toggle from "../../../customComponents/slider/toggler";

function Bot_leads({ bot_id }) {
  const { singleChatBot, loading, error, chatbot } = useSingleChatbot(
    (state) => ({
      singleChatBot: state.singleChatBot,
      loading: state.loading,
      error: state.error,
      chatbot: state.chatbot,
    })
  );
  const { updateLeads, loadingLeads, leadsError } = useBotLeadsSettingsStore(
    (state) => ({
      updateLeads: state.botLeadsSettings,
      loadingLeads: state.loading,
      LeadsError: state.error,
    })
  );

  useEffect(() => {
    singleChatBot(bot_id);
  }, [bot_id, singleChatBot]);

  console.log(chatbot);
  //title value

  const [title, setTitle] = useState("");
  //title value

  // name toggle
  const [nameToggle, setNameToggle] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.collectName : false
  );
  const handleNameToggleChange = () => {
    setNameToggle(!nameToggle);
  };
  // name toggle

  //email toggle
  const [emailToggle, setEmailToggle] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.collectEmail : false
  );
  const handleEmailToggleChange = () => {
    setEmailToggle(!emailToggle);
  };
  //email toggle

  //phone number
  const [phoneToggle, setPhoneToggle] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.collectPhone : false
  );
  const handlePhoneToggleChange = () => {
    setPhoneToggle(!phoneToggle);
  };

  //phone number

  // handle lead submission
  const handleSubmitBotSecurity = (e) => {
    e.preventDefault();
    const botLeadsData = {
      title: title,
      collectName: nameToggle,
      collectEmail: emailToggle,
      collectPhone: phoneToggle,
    };
    updateLeads({
      botLeadsData,
      bot_id,
    });
  };
  // handle lead submission
  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Leads
        </div>

        <div className="flex-1 w-full my-3 p-3 flex flex-col gap-y-2 items-start">
          <div
            style={{ whiteSpace: "nowrap" }}
            className="text-zinc-800 text-[10px] font-bold font-manrope leading-[14px] tracking-tight"
          >
            Title
          </div>
          <div className="flex gap-x-3 flex-row w-full items-start justify-center">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Let us know how to contact you"
              className="w-full h-[44px] p-4 active:border-gray-200 border-[1px]  text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
            />
            <button className="px-4 rounded-lg  bg-[#EEF8FF] text-[#1261AC] h-[44px]">
              Reset
            </button>
          </div>
        </div>

        <div className="w-full flex-col p-3 items-start justify-start">
          <div className="flex items-start justify-between w-full flex-row py-3 border-b-[1px] border-gray-200 ">
            <div className="text-gray-900 text-xs font-medium font-['Manrope'] leading-none tracking-tight">
              Name
            </div>
            <Toggle checked={nameToggle} onChange={handleNameToggleChange} />
          </div>
          <div className="flex items-start justify-between w-full flex-row py-3 border-b-[1px] border-gray-200 ">
            <div className="text-gray-900 text-xs font-medium font-['Manrope'] leading-none tracking-tight">
              Email
            </div>
            <Toggle checked={emailToggle} onChange={handleEmailToggleChange} />
          </div>
          <div className="flex items-start justify-between w-full flex-row py-3  ">
            <div className="text-gray-900 text-xs font-medium font-['Manrope'] leading-none tracking-tight">
              Phone Number
            </div>
            <Toggle onChange={handlePhoneToggleChange} checked={phoneToggle} />
          </div>
        </div>

        <div className="w-full p-3 flex-end items-end flex flex-col">
          <button
            disabled={loadingLeads}
            onClick={handleSubmitBotSecurity}
            className="text-white h-11 disabled:bg-sky-300 rounded-lg justify-start items-start  px-5 py-3 bg-sky-700  shadow border border-sky-700  gap-2 "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bot_leads;
