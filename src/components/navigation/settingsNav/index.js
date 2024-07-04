"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import useChatbotStore from "../../../store/chatbot/useChatbotStore";
import useModalStore from "../../../store/modal/modalState";
import { AccountModal } from "../../customComponents/modals/dashboardModal/accountModal";
import EmbbedModal from "../../customComponents/modals/widgetModal/embedModal";

function ChatbotNav() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();

  const chatbot = useChatbotStore((state) => state.chatbot);
  const { bot: id } = useParams();
  const navItems = [
    { name: "Chatbot", link: `/bot/${id}`, tag: "chatbot" },
    { name: "Chat Config", link: `/bot/${id}/config`, tag: "config" },
    { name: "Dashboard", link: `/bot/${id}/dashboard`, tag: "dashboard" },
    { name: "Leads", link: `/bot/${id}/leads`, tag: "leads" },
    { name: "Sources", link: `/bot/${id}/source`, tag: "source" },
    { name: "Embed on Site", link: "/", tag: "embed" },
  ];

  const handleEmbedButtonClick = () => {
    if (chatbot?.visibility == "PRIVATE") {
      useModalStore
        .getState()
        .showModal(
          <AccountModal
            text={"By continuing your chatbot will become public"}
            button_name="Make Public"
            action={makePublic}
          />
        );
    } else {
      useModalStore.getState().showModal(<EmbbedModal botId={id} />);
    }
  };

  async function makePublic() {
    if (chatbot?.visibility == "PUBLIC") return;
    const res = await fetch(`/api/v1/chatbot/${id}/setting/set-public`);
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.message);
    }

    toast.success(data.message || "your chatbot has been made public");
    useModalStore.getState().showModal(<EmbbedModal botId={id} />);
  }

  return (
    <div className="flex flex-col items-center mt-[130px]  justify-between w-full lg:w-[767px]">
      <ul className="lg:w-full w-[90%] flex flex-wrap gap-8 items-start lg:items-center justify-start lg:justify-center">
        {navItems.map((items, i) => (
          <li className="" key={i}>
            {items.tag === "embed" ? (
              <button
                onClick={handleEmbedButtonClick}
                className="capitalize"
              >
                {items.name}
              </button>
            ) : (
              <Link
                className={
                  lastSegment === items.tag ||
                  (i === 0 && items.tag === "chatbot" && lastSegment === id)
                    ? "border-[#1261AC] capitalize border-[1px] px-3 py-1.5 bg-sky-50 rounded-[300px]"
                    : " capitalize"
                }
                href={items.link ? items.link : "#"}
              >
                {items.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatbotNav;
