import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WithChildren } from "@/utils/types";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
