"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useModalStore from "../../../store/modal/modalState";
import EmbbedModal from "../../customComponents/modals/widgetModal/embedModal";

function ChatbotNav() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const segments = pathname.split("/");
  const id = segments[2];
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
    useModalStore.getState().showModal(<EmbbedModal />);
  };
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
