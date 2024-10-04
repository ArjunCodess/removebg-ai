import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RemoveBG - Easy Background Removal",
  description: "Remove backgrounds from your images quickly and easily with our AI-powered tool.",
  keywords: "background removal, image editing, AI, photo editing",
  authors: [{ name: "ArjunCodess" }],
  openGraph: {
    title: "RemoveBG - Easy Background Removal",
    description: "Remove backgrounds from your images quickly and easily with our AI-powered tool.",
    type: "website",
    url: "https://removebg-ai.vercel.app/",
  },
  twitter: {
    title: "RemoveBG - Easy Background Removal",
    description: "Remove backgrounds from your images quickly and easily with our AI-powered tool."
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
