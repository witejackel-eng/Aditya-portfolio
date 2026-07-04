import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { CursorProvider } from "@/components/CursorContext";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya — Front-End Developer & UI/UX Designer",
  description:
    "Aditya — front-end developer & UI/UX designer crafting high performance digital interfaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        <Loader />
        <CursorProvider>
          <CustomCursor />
          <SmoothScroll>
            <PageTransition>{children}</PageTransition>
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
