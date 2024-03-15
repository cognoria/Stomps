"use client";
import { Inter } from "next/font/google";

import Empty_bot from "../../../../../components/mainComponent/chatbot/empty_bot";
// import { useUserStore } from "../../../store/auth/userState";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  // const user = useUserStore((state) => state.user);
  const chatbox = true;
  if (!chatbox) return <Empty_bot />;
  // if (chatbox) return <Main_bot />;
  return <div className={inter.className}>{children}</div>;
}
