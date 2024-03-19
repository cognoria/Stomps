import Link from "next/link";

function Bot_nav() {
  return (
    <div className="flex flex-col items-center lg:mt-[130px]  justify-between w-full lg:w-[767px]">
      <ul className="w-full flex flex-row">
        {navItems.map((items, i) => (
          <li className="w-full" key={i}>
            <Link href={items.link}>{items.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bot_nav;

const navItems = [
  { name: "Chatbot", link: "/" },
  { name: "Settings", link: "/" },
  { name: "Dashboard", link: "/" },
  { name: "Settings", link: "/" },
  { name: "Sources", link: "/" },
  { name: "Embed on site", link: "/" },
];
