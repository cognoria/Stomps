"use client"
import { Inter } from "next/font/google";
import MainNav from "../../../components/navigation/mainNav";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../../store/auth/userState";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  const getMe = useUserStore((state) => state.getMe);

  const router = useRouter();
  
  React.useEffect(() => {
    getMe(() => router.push("/signin"))
  }, [router, getMe]);

  return (
    <div className={inter.className}>
      <MainNav  dashboard={true}/>
      {children}
    </div>
  );
}
