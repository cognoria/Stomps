import { Inter } from "next/font/google";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal } from "../components/customComponents/modals/modal";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stomps",
  description: "Stomps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <script
          src="/embed.js"
          strategy="afterInteractive"
          chatbotId="660eacb8642adae92cff46ed"
          domain="http://localhost:3000/"
          defer
        >
          {" "}
        </script>

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css"
          type="text/css"
          media="screen"
        />
        <link
          rel="icon"
          href="/images/landing/logopng.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/images/landing/logopng.png"
          sizes="180x180"
        />
      </Head>
      <body className={inter.className}>
        {children}
        <ToastContainer />
        <Modal />
      </body>
    </html>
  );
}
