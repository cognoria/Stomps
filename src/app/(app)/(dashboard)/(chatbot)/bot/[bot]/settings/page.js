"use client";

import LeadsSettings from "../../../../../../../components/mainComponent/chatbot/settings/Leads";
import SecuritySettings from "../../../../../../../components/mainComponent/chatbot/settings/Security";
import InterfaceSettings from "../../../../../../../components/mainComponent/chatbot/settings/Interface";
import GeneralSettings from "../../../../../../../components/mainComponent/chatbot/settings/General";
import ModelSettings from "../../../../../../../components/mainComponent/chatbot/settings/Model";

import Chat_bot_nav from "../../../../../../../components/navigation/chatbot_nav";
import useSourceNav from "../../../../../../../store/chatbot/useSourceNav";

function Page({ params: { bot } }) {
  // console.log(bot);
  const currentPage = useSourceNav((state) => state.currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case "General":
        return <GeneralSettings botId={bot} />;
      case "Model":
        return <ModelSettings botId={bot} />;
      case "Chat interface":
        return <InterfaceSettings botId={bot} />;
      case "security":
        return <SecuritySettings botId={bot} />;
      case "Leads":
        return <LeadsSettings botId={bot} />;

      default:
        return <GeneralSettings botId={bot} />;
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
