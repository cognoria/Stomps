"use client";

import Bot_leads from "../../../../../../../components/mainComponent/chatbot/bot_settings/bot_leads";
import Bot_security from "../../../../../../../components/mainComponent/chatbot/bot_settings/bot_security";
import Chat_interface from "../../../../../../../components/mainComponent/chatbot/bot_settings/chat_interface";
import General_settings from "../../../../../../../components/mainComponent/chatbot/bot_settings/general_settings";
import Model_settings from "../../../../../../../components/mainComponent/chatbot/bot_settings/model_settings";

import Chat_bot_nav from "../../../../../../../components/navigation/chatbot_nav";
import bot_nav from "../../../../../../../store/chat_bot_state/chatbot_state";

function page({ params: { bot } }) {
  // console.log(bot);
  const currentPage = bot_nav((state) => state.currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case "General":
        return <General_settings bot_id={bot} />;
      case "Model":
        return <Model_settings bot_id={bot} />;
      case "Chat interface":
        return <Chat_interface bot_id={bot} />;
      case "security":
        return <Bot_security bot_id={bot} />;
      case "Leads":
        return <Bot_leads bot_id={bot} />;

      default:
        return <General_settings bot_id={bot} />;
    }
  };
  return (
    <div className="flex flex-col w-[98%] lg:w-full items-center overflow-x-hidden justify-center mt-[100px]">
      <div className="lg:flex hidden flex-col w-full  items-start justify-start"></div>
      <div className="w-full gap-x-4 lg:max-w-[80%] gap-3 flex flex-col lg:flex-col  ">
        <div className="text-sky-700 hidden lg:block text-[32px] font-bold font-['Manrope'] leading-[38.40px]">
          Settings
        </div>

        <div className="flex flex-col lg:flex-row w-full  items-start justify-center">
          <div className="lg:max-w-[212px] w-full flex-end flex flex-col mt-[60px]">
            <Chat_bot_nav tag={"Settings"} nav={nav} />
          </div>
          <div className="w-full lg:mt-0 mt-[30px]">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default page;

const nav = [
  {
    link_name: "General",
    img_link: "/images/chatbox/setting_icon.svg",
    link: "/",
  },
  {
    link_name: "Model",
    img_link: "/images/chatbox/magicpen.svg",
    link: "/text",
  },
  {
    link_name: "Chat interface",
    img_link: "/images/chatbox/droplet1.svg",
    link: "/website",
  },
  {
    link_name: "security",
    img_link: "/images/chatbox/security.svg",
    link: "/website",
  },
  {
    link_name: "Leads",
    img_link: "/images/chatbox/leads.svg",
    link: "/website",
  },
];
