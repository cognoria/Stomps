"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import useModalStore from "../../../store/modal/modalState";
import EmbbedModal from "../../customComponents/modals/widgetModal/embedModal";
import useChatbotStore from "../../../store/chatbot/useChatbotStore";
import { AccountModal } from "../../customComponents/modals/dashboardModal/accountModal";
import { toast } from "react-toastify";

function ChatbotNav() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const segments = pathname.split("/");
  console.log(pathname)
  const chatbot = useChatbotStore((state) => state.chatbot)
  const { bot: id } = useParams();
  const navItems = [
    { name: "chatbot", link: `/bot/${id}`, tag: "chatbot" },
    { name: "settings", link: `/bot/${id}/settings`, tag: "settings" },
    { name: "dashboard", link: `/bot/${id}/dashboard`, tag: "dashboard" },
    { name: "sources", link: `/bot/${id}/source`, tag: "source" },
    { name: "embed on site", link: "/", tag: "embed" },
  ];
  // console.log(lastSegment);
  const handleEmbedButtonClick = () => {
    // Show the modal when the "embed on site" button is clicked
    console.log(chatbot)
    if (chatbot.visibility == 'PRIVATE') {
      useModalStore.getState().showModal(<AccountModal
        text={"By continuing your chatbot will become public"}
        button_name="Make Public"
        action={makePublic}
      />)
    } else {
      useModalStore.getState().showModal(<EmbbedModal botId={id} />);
    }
  };

  async function makePublic() {
    if (chatbot.visibility == 'PRIVATE') return;
    const res = await fetch(`api/v1/chatbot/${id}/setting/set-public`)
    const data = await res.json();
    if (!res.ok) {
      console.log(data)
      return toast.error(data.message)
    }

    toast.success(data.message || "your chatbot has been made public")
    useModalStore.getState().showModal(<EmbbedModal botId={id} />)
  }

  return (
    <div className="flex flex-col items-center mt-[130px]  justify-between w-full lg:w-[767px]">
      <ul className="lg:w-full w-[90%] flex flex-wrap gap-8 items-start lg:items-center justify-start lg:justify-center">
        {navItems.map((items, i) => (
          <li className="" key={i}>
            {items.tag === "embed" ? ( // Check if the current item is the "embed on site" button
              <button
                onClick={handleEmbedButtonClick}
                className="p-3 border-none capitalize border-[1px] "
              >
                {items.name}
              </button>
            ) : (
              <Link
                className={
                  lastSegment === items.tag ||
                    (i === 0 && items.tag === "chatbot" && lastSegment === id)
                    ? "p-3 border-[#1261AC] capitalize border-[1px] px-3 py-1.5 bg-sky-50 rounded-[300px]"
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
