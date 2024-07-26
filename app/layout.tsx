import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="iris" grayColor="mauve">
          <Navbar />

          <main className="px-10">{children}</main>
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}