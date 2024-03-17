"use client";
import { Inter } from "next/font/google";

// import { useUserStore } from "../../../store/auth/userState";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  // const user = useUserStore((state) => state.user);

  return <div className={inter.className}>{children}</div>;
}
