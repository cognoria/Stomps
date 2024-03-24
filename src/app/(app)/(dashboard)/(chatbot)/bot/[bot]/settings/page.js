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
      <div className="w-full p-3 lg:max-w-[80%] gap-3 flex flex-col lg:flex-col items-center justify-center  ">
        <div className="text-sky-700  hidden lg:block text-[32px] font-bold font-manrope leading-[38.40px]">
          Dashboard
        </div>

        <div className="flex flex-col lg:flex-row w-full items-center lg:items-start justify-center ">
          <div className="lg:max-w-[212px] relative  flex w-full lg:flex-col  flex-row lg:justify-start justify-between my-[40px] lg:mt-[60px]">
            <div className="text-sky-700 absolute top-0 left-0 lg:hidden text-2xl w-full p-3 font-bold font-manrope leading-[28.80px]">
              Dashboard
            </div>
            <Chat_bot_nav nav={nav} />
          </div>
          <div className="w-full">{renderContent()}</div>
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
