import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WithChildren } from "@/utils/types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DaaS Admin",
  description: "Only for Odar DaaS Admin",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer
          position="top-center"
          pauseOnHover={false}
          closeOnClick
        />
      </body>
    </html>
  );
}
