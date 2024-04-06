"use client";
import { Inter } from "next/font/google";
import ChatbotNav from "../../../../../../components/navigation/settingsNav";
// import useUserStore  from "../../../store/auth/userState";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={inter.className}>
      <div className="flex flex-col justify-center  items-center">
        <ChatbotNav />
      </div>

      {children}
    </div>
  );
}
