import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomNavbar from "@/components/CustomNavbar";
import CustomCursor from "@/components/CustomCursor";
import CustomFooter from "@/components/CustomFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <CustomNavbar />
        {children}
        <CustomFooter />
      </body>
    </html>
  );
}
