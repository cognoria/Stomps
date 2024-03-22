"use client";

import Analytics from "../../../../../../../components/mainComponent/chatbot/bot_dashboard/analytics";
import Chat_logs from "../../../../../../../components/mainComponent/chatbot/bot_dashboard/chat_logs";
import Leeds from "../../../../../../../components/mainComponent/chatbot/bot_dashboard/leeds";

import Chat_bot_nav from "../../../../../../../components/navigation/chatbot_nav";
import bot_nav from "../../../../../../../store/chat_bot_state/chatbot_state";

function page({ params: { bot } }) {
  console.log(bot);
  const currentPage = bot_nav((state) => state.currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case "Leads":
        return <Leeds />;
      case "Analytics":
        return <Analytics />;
      case "Chat logs":
        return <Chat_logs />;

      default:
        return <Chat_logs />;
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
    link_name: "Chat logs",
    img_link: "/images/chatbox/directbox-notif.svg",
    link: "/",
  },
  {
    link_name: "Leads",
    img_link: "/images/chatbox/profile.svg",
    link: "/text",
  },
  {
    link_name: "Analytics",
    img_link: "/images/chatbox/chart.svg",
    link: "/website",
  },
];
