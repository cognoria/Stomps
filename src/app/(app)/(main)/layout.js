import { Inter } from "next/font/google";
import Nav_bar from "../../../components/navigation/nav_bar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className={inter.className}>
      <Nav_bar />
      {children}
    </div>
  );
}
