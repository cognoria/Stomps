"use client";

import QA from "../../../../../components/mainComponent/chatbot/QA";
import Datasource from "../../../../../components/mainComponent/chatbot/datasource";
import Sources from "../../../../../components/mainComponent/chatbot/sources";
import Text from "../../../../../components/mainComponent/chatbot/text";
import Website from "../../../../../components/mainComponent/chatbot/website";
import Chat_bot_nav from "../../../../../components/navigation/chatbot_nav";
import useSourceNav from "../../../../../store/chatbot/useSourceNav";

function Page() {
  const currentPage = useSourceNav((state) => state.currentPage);

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
        <div className="lg:max-w-[212px] w-full  mt-[60px]">
          <Chat_bot_nav tag={"Data Sources"} nav={nav} />
        </div>
        <div className="w-full">{renderContent()}</div>
        <div className="flex flex-col w-full items-center justify-center">
          <Sources />
        </div>
      </div>
    </div>
  );
}

export default Page;
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
