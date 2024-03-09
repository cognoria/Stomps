"use client"
import { Inter } from "next/font/google";
import Nav_bar from "../../../components/navigation/nav_bar";
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
      <Nav_bar />
      {children}
    </div>
  );
}
