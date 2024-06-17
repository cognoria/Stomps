"use client";

import Leeds from "../../../../../../../components/mainComponent/chatbot/dashboard/leeds";
import LeadsSettings from "../../../../../../../components/mainComponent/chatbot/settings/Leads";

import SourceNav from "../../../../../../../components/navigation/SourceNav";
import useSourceNav from "../../../../../../../store/chatbot/useSourceNav";

function Page({ params: { bot } }) {
    // console.log(bot);
    const currentPage = useSourceNav((state) => state.currentPage);

    const renderContent = () => {
        switch (currentPage) {
            case "Leads":
                return <Leeds botId={bot} />;
                // <LeadsSettings botId={bot} />;
            case "Settings":
                return <LeadsSettings botId={bot} />;

            default:
                return <LeadsSettings botId={bot} />;
        }
    };
    return (
        <div className="flex flex-col w-[98%] lg:w-full items-center overflow-x-hidden justify-center mt-[100px]">
            <div className="lg:flex hidden flex-col w-full  items-start justify-start"></div>
            <div className="w-full gap-x-4 lg:max-w-[80%] gap-3 flex flex-col lg:flex-col  ">
                <div className="text-sky-700 hidden lg:block text-[32px] font-bold font-manrope leading-[38.40px]">
                    Leads
                </div>

                <div className="flex flex-col lg:flex-row w-full  items-start justify-center">
                    <div className="lg:max-w-[212px] w-full flex-end flex flex-col mt-[60px]">
                        <SourceNav tag={"Leads"} nav={nav} />
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
        link_name: "Leads",
        img_link: "/images/chatbox/profile.svg",
        link: "/",
    },
    {
        link_name: "Settings",
        img_link: "/images/chatbox/setting_icon.svg",
        link: "/text",
    },
];
