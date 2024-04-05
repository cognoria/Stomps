"use client";

import Retrain from "../../../../../../../components/mainComponent/chatbot/source/retrain";
import QandA from "../../../../../../../components/mainComponent/chatbot/source/Q&A";
import DataSource from "../../../../../../../components/mainComponent/chatbot/source/dataSource";
import Source_Text from "../../../../../../../components/mainComponent/chatbot/source/sources_text";
import Source_Website from "../../../../../../../components/mainComponent/chatbot/source/sourecs_website";
import Chat_bot_nav from "../../../../../../../components/navigation/chatbot_nav";
import bot_nav from "../../../../../../../store/chatbot/chatbot_state";

function page({ params: { bot } }) {
  // console.log(bot);
  const currentPage = bot_nav((state) => state.currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case "File":
        return <DataSource />;
      case "Text":
        return <Source_Text />;
      case "Website":
        return <Source_Website />;
      case "Q & A":
        return <QandA />;
      default:
        return <DataSource />;
    }
  };
  return (
    <div className="flex flex-col w-full items-center justify-center mt-[100px] ">
      <div className="lg:flex hidden flex-col w-full  items-start justify-start"></div>
      <div className="w-full gap-x-4 lg:max-w-[80%] gap-3 flex flex-col lg:flex-col  ">
        <div className="text-sky-700 hidden lg:block text-[32px] font-bold font-['Manrope'] leading-[38.40px]">
          Data Sources
        </div>

        <div className="flex flex-col lg:flex-row w-full  items-start justify-center">
          <div className="lg:max-w-[212px]  w-full flex-end flex flex-col mt-[60px]">
            <Chat_bot_nav tag={" Data Sources"} nav={nav} />
          </div>
          <div className="w-full">{renderContent()}</div>
          <div className="flex flex-col w-full items-center justify-center">
            <Retrain />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

const nav = [
  {
    link_name: "File",
    img_link: "/images/chatbox/document-text.svg",
    link: "/",
  },
  {
    link_name: "Text",
    img_link: "/images/chatbox/text1.svg",
    link: "/text",
  },
  {
    link_name: "Website",
    img_link: "/images/chatbox/global.svg",
    link: "/website",
  },
  {
    link_name: "Q & A",
    img_link: "/images/chatbox/message-question.svg",
    link: "/QA",
  },
];
