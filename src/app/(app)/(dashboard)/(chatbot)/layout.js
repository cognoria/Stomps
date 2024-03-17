"use client";
import { Inter } from "next/font/google";
// import useUserStore  from "../../../store/auth/userState";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>;
}
