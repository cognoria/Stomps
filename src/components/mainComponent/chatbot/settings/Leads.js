"use client";
import { useEffect, useState } from "react";
import { chatBotCustomizeDataDefault } from "../../../../helpers/enums";
import useChatbotSettings from "../../../../store/chatbot/useChatbotSettings";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import Toggle from "../../../customComponents/slider/toggler";

function LeadsSettings({ botId }) {
  const { getChatbot, loading, chatbot } = useChatbotStore((state) => ({
    getChatbot: state.getChatbot,
    loading: state.loading,
    chatbot: state.chatbot,
  }));

  const { updateLeadsSettings, updatingLeadsSettings } = useChatbotSettings(
    (state) => ({
      updateLeadsSettings: state.updateLeadsSettings,
      updatingLeadsSettings: state.updatingLeadsSettings,
    })
  );

  useEffect(() => {
    getChatbot(botId);
  }, [botId, getChatbot]);

  //title value
  const [title, setTitle] = useState(
    chatbot?.chatBotCustomizeData?.leadMsgDescription
  );
  //title value

  // name toggle
  const [nameToggle, setNameToggle] = useState(
    chatbot?.chatBotCustomizeData?.collectName
  );
  const handleNameToggleChange = () => {
    setNameToggle(!nameToggle);
  };
  // name toggle

  //email toggle
  const [emailToggle, setEmailToggle] = useState(
    chatbot?.chatBotCustomizeData?.collectEmail
  );
  const handleEmailToggleChange = () => {
    setEmailToggle(!emailToggle);
  };
  //email toggle

  //phone number
  const [phoneToggle, setPhoneToggle] = useState(
    chatbot?.chatBotCustomizeData?.collectPhone
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
    updateLeadsSettings(
      {
        botLeadsData,
        botId,
      },
      async () => {
        await getChatbot(botId);
      }
    );
  };

  // handle lead submission

  const resetLeads = async (e) => {
    e.preventDefault();
    const botLeadsData = {
      title: chatBotCustomizeDataDefault.leadMsgDescription,
      collectName: chatBotCustomizeDataDefault.collectName,
      collectEmail: chatBotCustomizeDataDefault.collectEmail,
      collectPhone: chatBotCustomizeDataDefault.collectPhone,
    };

    setTitle(chatBotCustomizeDataDefault.leadMsgDescription);
    setNameToggle(chatBotCustomizeDataDefault.collectName);
    setEmailToggle(chatBotCustomizeDataDefault.collectEmail);
    setPhoneToggle(chatBotCustomizeDataDefault.collectPhone);

    await updateLeadsSettings({
      botLeadsData,
      botId,
    });
    await getChatbot(botId);
  };
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
            <button
              disabled={updatingLeadsSettings}
              onClick={resetLeads}
              className="px-4 rounded-lg disabled:bg-sky-300  bg-[#EEF8FF] text-[#1261AC] h-[44px]"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="w-full flex-col p-3 items-start justify-start">
          <div className="flex items-start justify-between w-full flex-row py-3 border-b-[1px] border-gray-200 ">
            <div className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight">
              Name
            </div>
            <Toggle checked={nameToggle} onChange={handleNameToggleChange} />
          </div>
          <div className="flex items-start justify-between w-full flex-row py-3 border-b-[1px] border-gray-200 ">
            <div className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight">
              Email
            </div>
            <Toggle checked={emailToggle} onChange={handleEmailToggleChange} />
          </div>
          <div className="flex items-start justify-between w-full flex-row py-3  ">
            <div className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight">
              Phone Number
            </div>
            <Toggle onChange={handlePhoneToggleChange} checked={phoneToggle} />
          </div>
        </div>

        <div className="w-full p-3 flex-end items-end flex flex-col">
          <button
            disabled={updatingLeadsSettings}
            onClick={handleSubmitBotSecurity}
            className="text-white justify-center items-center text center disabled:bg-sky-300 lg:w-auto font-manrope w-[150px] h-11 flex-end rounded-lg     p-2 bg-sky-700  shadow border border-sky-700   "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadsSettings;
