"use client"
import { Inter } from "next/font/google";
import MainNav from "../../../components/navigation/mainNav";
import React from "react";
import { useRouter } from "next/navigation";
// import useUserStore  from "../../../store/auth/userState";
import useLoginAuthStore from "../../../store/auth/login";
import { useUserStore } from "../../../store/auth/userState";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
 const user = useUserStore((state) => state.user);

  // const { user } = useLoginAuthStore((state) => ({
  //   user: state.user,
  // }));

  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  return (
    <div className={inter.className}>
      <MainNav />
      {children}
    </div>
  );
}
