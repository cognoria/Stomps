"use client";

import Analytics from "../../../../../../../components/mainComponent/chatbot/dashboard/analytics";
import Chat_logs from "../../../../../../../components/mainComponent/chatbot/dashboard/chatLogs";
import Leeds from "../../../../../../../components/mainComponent/chatbot/dashboard/leeds";

import SourceNav from "../../../../../../../components/navigation/SourceNav";
import useSourceNav from "../../../../../../../store/chatbot/useSourceNav";

function Page({ params: { bot } }) {
  // console.log(bot);
  const currentPage = useSourceNav((state) => state.currentPage);
  // const {
  //   analytics,
  //   chats,
  //   leads,
  //   getChatbotAnalytics,
  //   getChatbotLead,
  //   getChatbotChats,
  // } = useChatbotStore((state) => ({
  //   getChatbotAnalytics: state.getChatbotAnalytics,
  //   getChatbotLead: state.getChatbotLead,
  //   getChatbotChats: state.getChatbotChats,
  //   analytics: state.analytics,
  //   leads: state.leads,
  //   chats: state.chats,
  //   loading: state.loading,
  //   error: state.error,
  // }));

  // useEffect(() => {
  //   getChatbotAnalytics(bot);
  //   getChatbotLead(bot);
  // }, [analytics, bot, leads]);

  const renderContent = () => {
    switch (currentPage) {
      case "Leads":
        return <Leeds botId={bot} />;
      case "Analytics":
        return <Analytics botId={bot} />;
      case "Chat logs":
        return <Chat_logs botId={bot} />;

      default:
        return <Chat_logs botId={bot} />;
    }
  };
  return (
    <div className="flex flex-col w-[98%] lg:w-full items-center overflow-x-hidden justify-center mt-[100px]">
      <div className="lg:flex hidden flex-col w-full  items-start justify-start"></div>
      <div className="w-full gap-x-4 lg:max-w-[80%] gap-3 flex flex-col lg:flex-col  ">
        <div className="text-sky-700 hidden lg:block text-[32px] font-bold font-manrope leading-[38.40px]">
          Dashboard
        </div>

        <div className="flex flex-col lg:flex-row w-full  items-start justify-center">
          <div className="lg:max-w-[212px] w-full flex-end flex flex-col mt-[60px]">
            <SourceNav tag={"Dashboard"} nav={nav} />
          </div>
          <div className="w-full lg:mt-0 mt-[30px]">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Page;

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
