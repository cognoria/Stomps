import { useEffect, useState } from "react";
import {
  chatBotCustomizeDataDefault,
  rateLimits,
} from "../../../../helpers/enums";
import useChatbotSettings from "../../../../store/chatbot/useChatbotSettings";
import useChatbotStore from "../../../../store/chatbot/useChatbotStore";
import { capitalizeFirstLetter } from "../../../../utils/wordStructure";

function SecuritySettings({ botId }) {
  const { getChatbot, loading, chatbot } = useChatbotStore((state) => ({
    getChatbot: state.getChatbot,
    loading: state.loading,
    chatbot: state.chatbot,
  }));

  const { updateSecuritySettings, updatingSecuritySettings } =
    useChatbotSettings((state) => ({
      updateSecuritySettings: state.updateSecuritySettings,
      updatingSecuritySettings: state.updatingSecuritySettings,
    }));

  useEffect(() => {
    getChatbot(botId);
  }, [botId, getChatbot]);

  //limit values
  const [inputLimit, setInputLimit] = useState(
    chatbot?.rateLimiting?.msg_count
  );
  const [inputMessage, setInputMessage] = useState(
    chatbot?.rateLimiting?.timeframe
  );
  // Limit values

  //iframe & widget toggle
  const [toggleChecked, setToggleChecked] = useState(
    chatbot?.chatBotCustomizeData?.allowPublicDomains
  );
  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
  };

  //iframe & widget toggle

  // privacy selection
  const [selectedPrivacy, setSelectedPrivacy] = useState(chatbot?.visibility);
  const handlePrivacyChange = (event) => {
    setSelectedPrivacy(event.target.value);
  };

  //privacy selection

  // exceed limit message
  const [limitMessage, setLimitMessage] = useState(
    chatbot?.rateLimiting?.limitMsg
  );

  // Exceed limit message

  // security submission

  useEffect(() => {
    if (chatbot) {
      setSelectedPrivacy(chatbot.visibility);
      setLimitMessage(chatbot.rateLimiting.limitMsg);
      setToggleChecked(chatbot.chatBotCustomizeData.allowPublicDomains);
      setInputMessage(chatbot.rateLimiting.timeframe);
      setInputLimit(chatbot.rateLimiting.msg_count);
    }
  }, [chatbot]);

  const handleSubmitBotSecurity = (e) => {
    e.preventDefault();
    const botSecurityData = {
      visibility: selectedPrivacy,
      // allowPublicDomains: chatBotCustomizeDataDefault.allowPublicDomains,
      // rateLimit: {
      //   limitMsg: limitMessage,
      //   msgCount: inputLimit,
      //   timeframe: inputMessage,
      // },
    };

    updateSecuritySettings({ botId, botSecurityData }, async () => {
      await getChatbot(botId);
    });
  };

  //security submission

  const resetSecuritySettings = (e) => {
    e.preventDefault();
    const botSecurityData = {
      visibility: "PRIVATE",
      // allowPublicDomains: chatBotCustomizeDataDefault.allowPublicDomains,
      // rateLimit: {
      //   limitMsg: rateLimits.limitMsg,
      //   msgCount: rateLimits.msg_count,
      //   timeframe: rateLimits.timeframe,
      // },
    };

    updateSecuritySettings({ botId, botSecurityData }, async () => {
      await getChatbot(botId);
    });
  };
  
  return (
    <div className="w-full px-3 lg:p-[6%]  flex flex-col items-center justify-center ">
      <div className="flex w-full flex-col items-center  justify-center border-gray-200 border-[1px] gap-4 rounded-md ">
        <div className="text-gray-900 w-full text-base font-bold p-3 border-gray-200 border-b-[2px] font-manrope leading-snug">
          Security
        </div>
        <div className="p-3 w-full ">
          <div className="flex-1 flex gap-y-4 w-full flex-col items-start p-3">
            <div className="text-zinc-800 text-[10px]  font-bold font-manrope leading-[14px] tracking-tight">
              Visibility
            </div>
            <select
              value={selectedPrivacy}
              onChange={handlePrivacyChange}
              className="h-[50px] w-full  -mt-2 border-[1px]  font-medium font-manrope border-gray-200 rounded-md"
            >
              {visibility.map((visibility, i) => (
                <option
                  key={i}
                  value={visibility}
                  className="text-gray-900  text-xs font-medium font-manrope leading-none tracking-tight"
                >
                  {capitalizeFirstLetter(visibility.toLowerCase())}
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
          {/* <div className="mt-[30px] p-3">
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
              <button
                disabled={updatingSecuritySettings}
                onClick={resetSecuritySettings}
                className="text-sky-700 disabled:bg-sky-300 text-xs font-bold font-manrope leading-snug  px-3.5 py-1 bg-sky-50 rounded-lg shadow border border-sky-50 justify-center items-center gap-2 flex"
              >
                Reset
              </button>
            </div>
            <div className="w-full text-gray-600 text-xs font-medium font-manrope leading-none tracking-tight">
              Restrict the number of messages sent from a single device using
              the iframe and chat bubble interfaces. This limit will be enforced
              for users on your website to prevent abuse
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-row w-full items-start p-3 gap-4">
            <div className="flex-row gap-x-2 flex items-center ">
              <div className="text-gray-600 text-xs font-medium font-manrope leading-none tracking-tight">
                Limit to only
              </div>
              <input
                onChange={(e) => setInputLimit(e.target.value)}
                style={{ width: `${inputLimit?.length * 8 + 55}px` }}
                value={inputLimit}
                type="number"
                className="w-[75px] h-[30px] lg:h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center"
              />
            </div>

            <div className="flex-row gap-x-2 flex items-center ">
              <div className="text-gray-600 text-xs font-medium font-manrope leading-none tracking-tight">
                messages every
              </div>
              <input
                onChange={(e) => setInputMessage(e.target.value)}
                type="number"
                value={inputMessage}
                style={{ width: `${inputMessage?.length * 8 + 55}px` }}
                className="w-[75px] max-w-auto h-[30px] lg:h-[37px] px-3.5 py-2.5 bg-white rounded shadow border border-zinc-100 justify-start items-center"
              />
              <div className="text-gray-600 text-xs font-medium font-manrope leading-none tracking-tight">
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
              value={limitMessage}
              placeholder="Too many messages in a row"
              className="h-[50px] p-2 w-full -mt-2 border-[1px] text-xs font-manrope border-gray-200 rounded-md"
            />
          </div> */}
        </div>

        <div className="w-full p-3 flex-end items-end flex flex-col">
          <button
            disabled={updatingSecuritySettings}
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

export default SecuritySettings;

const visibility = ["PRIVATE", "PUBLIC"];
const visibility_description = [
  {
    tag: `Private:`,
    desc: ` No one can access your chatbot except you (your account)`,
  },
  {
    tag: `Public:`,
    desc: `Visitors can interact with the bot embedded on your website`,
  },
];
