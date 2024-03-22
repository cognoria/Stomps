import Link from "next/link";
import { usePathname } from "next/navigation";

function Bot_nav() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const segments = pathname.split("/");
  const id = segments[2];
  const navItems = [
    { name: "chatbot", link: `/bot/${id}` },
    { name: "settings", link: "settings" },
    { name: "dashboard", link: "/bot/${id}/dashboard" },
    { name: "sources", link: `/bot/${id}/bot_source` },
    { name: "embed on site", link: "/" },
  ];
  console.log(lastSegment);
  return (
    <div className="flex flex-col items-center lg:mt-[130px]  justify-between w-full lg:w-[767px]">
      <ul className="w-full flex flex-row">
        {navItems.map((items, i) => (
          <li className="w-full" key={i}>
            <Link
              className={
                lastSegment === items.name
                  ? "p-3 border-[#1261AC] capitalize border-[1px] px-3 py-1.5 bg-sky-50 rounded-[300px]"
                  : " capitalize"
              }
              href={items.link}
            >
              {items.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bot_nav;
