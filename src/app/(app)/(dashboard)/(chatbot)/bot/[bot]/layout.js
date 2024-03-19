"use client";
import { Inter } from "next/font/google";
import Bot_nav from "../../../../../../components/navigation/bot_page_nav/bot_nav";
// import useUserStore  from "../../../store/auth/userState";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={inter.className}>
      <div className="flex flex-col  items-center">
        <Bot_nav />
      </div>

      {children}
    </div>
  );
}
