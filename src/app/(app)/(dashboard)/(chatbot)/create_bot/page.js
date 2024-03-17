"use client";

import QA from "../../../../../components/mainComponent/chatbot/QA";
import Datasource from "../../../../../components/mainComponent/chatbot/datasource";
import Text from "../../../../../components/mainComponent/chatbot/text";
import Website from "../../../../../components/mainComponent/chatbot/website";
import Chat_bot_nav from "../../../../../components/navigation/chatbot_nav";
import bot_nav from "../../../../../store/chat_bot_state/chatbot_state";

function page() {
  const currentPage = bot_nav((state) => state.currentPage);

  const renderContent = () => {
    switch (currentPage) {
      case "File":
        return <Datasource />;
      case "Text":
        return <Text />;
      case "Website":
        return <Website />;
      case "Q & A":
        return <QA />;
      default:
        return <Datasource />;
    }
  };
  return (
    <div className="flex flex-col w-full items-center justify-center mt-[100px] ">
      <div className="lg:flex hidden flex-col  items-center justify-center">
        <div className="text-sky-700 text-[32px] font-bold font-manrope leading-[38.40px]">
          Data Sources
        </div>
        <div className="text-center text-gray-900 text-base font-normal font-manrope leading-relaxed tracking-tight">
          Add a data source to train your chatbot
        </div>
      </div>
      <div className="w-full gap-x-4 lg:max-w-[80%] gap-3 flex flex-col lg:flex-row  items-start justify-center">
        <div className="lg:max-w-[212px] mt-[60px]">
          <Chat_bot_nav />
        </div>
        <div className="w-full">{renderContent()}</div>
      </div>
    </div>
  );
}

export default page;
