import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <div>
            <div className={inter.className}>
                {children}
            </div>
        </div>
    );
}
