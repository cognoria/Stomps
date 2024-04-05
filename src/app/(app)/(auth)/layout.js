import { Inter } from "next/font/google";
import MainNav from "../../../components/navigation/mainNav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <div>
            <div className={inter.className}>
                <MainNav />
                {children}
            </div>
        </div>
    );
}
