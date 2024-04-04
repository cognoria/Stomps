"use client";

import Analytics from "../../../../../../../components/mainComponent/chatbot/bot_dashboard/analytics";
import Chat_logs from "../../../../../../../components/mainComponent/chatbot/bot_dashboard/chat_logs";
import Leeds from "../../../../../../../components/mainComponent/chatbot/bot_dashboard/leeds";

import Chat_bot_nav from "../../../../../../../components/navigation/chatbot_nav";
import bot_nav from "../../../../../../../store/chat_bot_state/chatbot_state";

function page({ params: { bot } }) {
  // console.log(bot);
  const currentPage = bot_nav((state) => state.currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case "Leads":
        return <Leeds bot_id={bot} />;
      case "Analytics":
        return <Analytics bot_id={bot}/>;
      case "Chat logs":
        return <Chat_logs bot_id={bot}/>;

      default:
        return <Chat_logs bot_id={bot}/>;
    }
  };
  return (
    <div className="flex flex-col w-[98%] lg:w-full items-center overflow-x-hidden justify-center mt-[100px]">
      <div className="lg:flex hidden flex-col w-full  items-start justify-start"></div>
      <div className="w-full gap-x-4 lg:max-w-[80%] gap-3 flex flex-col lg:flex-col  ">
        <div className="text-sky-700 hidden lg:block text-[32px] font-bold font-['Manrope'] leading-[38.40px]">
          Dashboard
        </div>

        <div className="flex flex-col lg:flex-row w-full  items-start justify-center">
          <div className="lg:max-w-[212px] w-full flex-end flex flex-col mt-[60px]">
            <Chat_bot_nav tag={"Dashboard"} nav={nav} />
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
