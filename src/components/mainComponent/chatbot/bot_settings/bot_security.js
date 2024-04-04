import { useEffect, useState } from "react";
import { useBotSecuritySettingsStore } from "../../../../store/chat_bot_state/chatbotSettings/settings";
import useSingleChatbot from "../../../../store/chat_bot_state/single_chat_bot";
import Toggle from "../../../customComponents/slider/toggler";

function Bot_security({ bot_id }) {
  const { singleChatBot, loading, error, chatbot } = useSingleChatbot(
    (state) => ({
      singleChatBot: state.singleChatBot,
      loading: state.loading,
      error: state.error,
      chatbot: state.chatbot,
    })
  );
  const { updateSecurity, loadingSecurity, securityError } =
    useBotSecuritySettingsStore((state) => ({
      updateSecurity: state.botSecuritySettings,
      loadingSecurity: state.loading,
      securityError: state.error,
    }));
  useEffect(() => {
    singleChatBot(bot_id);
  }, [bot_id, singleChatBot]);

  //limimt values
  const [inputLimit, setInputLimit] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.msgCount : ""
  );
  const [inputMessage, setInputMessage] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.inputMessage : ""
  );
  // console.log({
  //   inputLimit,
  //   inputMessage,
  // });
  // Limit values

  console.log(chatbot?.chatBotCustomizeData?.inputMessage);
  //iframe & widget toggle
  const [toggleChecked, setToggleChecked] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.allowPublicDomains : false
  );
  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
  };

  // console.log(toggleChecked);
  //iframe & widget toggle

  // privacy selection
  const [selectedPrivacy, setSelectedPrivacy] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.visibility : ""
  );
  const handlePrivacyChange = (event) => {
    setSelectedPrivacy(event.target.value);
  };

  // console.log(selectedPrivacy);
  //privacy selection

  // exceed limit message
  const [limitMessage, setLimitMessage] = useState(
    chatbot ? chatbot?.chatBotCustomizeData?.limitMsg : ""
  );
  // console.log(limitMessage);
  // Exceed limit message

  // security submission

  const handleSubmitBotSecurity = (e) => {
    e.preventDefault();
    const botSecurityData = {
      visibility: selectedPrivacy,
      allowPublicDomains: toggleChecked,
      rateLimit: {
        limitMsg: limitMessage,
        msgCount: inputLimit,
        timeframe: inputMessage,
      },
    };

    updateSecurity({ bot_id, botSecurityData }, async () => {
      await singleChatBot();
    });
  };

  //security submission
  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Security
        </div>
        <div className="p-3 w-full ">
          <div className="flex-1 flex gap-y-4 w-full flex-col items-start p-3">
            <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
              Model
            </div>
            <select
              value={selectedPrivacy}
              onChange={handlePrivacyChange}
              className="h-[50px] w-full -mt-2 border-[1px] border-gray-200 rounded-md"
            >
              {visibility.map((visibility, i) => (
                <option
                  key={i}
                  value={visibility}
                  className="text-gray-900 text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  {visibility}
                </option>
              ))}
            </select>
            <div className="w-full flex-col flex">
              {visibility_description.map((visibility, i) => (
                <div key={i} className="w-full ">
                  <span className="text-gray-600 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                    {visibility.tag}
                  </span>
                  <span className="text-gray-600 text-[10px] font-normal font-manrope leading-[14px] tracking-tight">
                    {visibility.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[30px] p-3">
            <div className="text-zinc-800 mb-2 text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
              Only allow the iframe and widget on specific domains
            </div>
            <Toggle checked={toggleChecked} onChange={handleToggleChange} />
          </div>
          <div className="w-full p-3 gap-y-3 items-start ">
            <div className="w-full mb-6 flex-row flex justify-around  lg:gap-x-10 lg:justify-start items-start">
              <div className="text-zinc-800 mt-[4px] text-[10px] font-bold font-manrope leading-[14px] tracking-tight">
                Rate Limiting
              </div>
              <button className="text-sky-700 text-xs font-bold font-manrope leading-snug  px-3.5 py-1 bg-sky-50 rounded-lg shadow border border-sky-50 justify-center items-center gap-2 flex">
                Reset
              </button>
            </div>
            <div className="w-full text-gray-600 text-xs font-medium font-manrope leading-none tracking-tight">
              Limit the number of messages sent from one device on the iframe
              and chat bubble (this limit will not be applied to you on
              stomps.io, only on your website for your users to prevent abuse).
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-row w-full items-start p-3 gap-4">
            <div className="flex-row gap-x-2 flex items-center ">
              <div className="text-gray-600 text-xs font-medium font-['Manrope'] leading-none tracking-tight">
                Limit to only
              </div>
              <input
                onChange={(e) => setInputLimit(e.target.value)}
                style={{ width: `${inputLimit?.length * 8 + 55}px` }}
                type="number"
                className="w-[75px] h-[30px] lg:h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center"
              />
            </div>

            <div className="flex-row gap-x-2 flex items-center ">
              <div className="text-gray-600 text-xs font-medium font-['Manrope'] leading-none tracking-tight">
                messages every
              </div>
              <input
                onChange={(e) => setInputMessage(e.target.value)}
                type="number"
                style={{ width: `${inputMessage?.length * 8 + 55}px` }}
                className="w-[75px] max-w-auto h-[30px] lg:h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center"
              />
              <div className="text-gray-600 text-xs font-medium font-['Manrope'] leading-none tracking-tight">
                seconds
              </div>
            </div>
          </div>
          <div className="flex-1 flex gap-y-4 w-full flex-col items-start p-3">
            <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
              Show this message to show when limit is hit
            </div>
            <input
              onChange={(e) => setLimitMessage(e.target.value)}
              placeholder="Too many messages in a row"
              className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
            />
          </div>
        </div>

        <div className="w-full p-3 flex-end items-end flex flex-col">
          <button
            disabled={loadingSecurity}
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

export default Bot_security;

const visibility = ["PRIVATE", "PUBLIC"];
const visibility_description = [
  {
    tag: `Private:`,
    desc: `  No one can access your chatbot except you (your account)`,
  },
  {
    tag: `Public:`,
    desc: `  Other people can chat with your chatbot if you send them the
                link. You can also embed it on your website so your website
                visitors are able to use it.`,
  },
];