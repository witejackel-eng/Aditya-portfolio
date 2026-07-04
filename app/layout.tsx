import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { CursorProvider } from "@/components/CursorContext";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import { contact, profile, siteUrl } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Aditya — Front-End Developer & UI/UX Designer";
const description =
  "Front-End Developer & UI/UX Designer crafting high-performance digital experiences — engineered for speed, designed for clarity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Aditya",
  },
  description,
  keywords: [
    "Aditya",
    "Front-End Developer",
    "UI/UX Designer",
    "Next.js Developer",
    "React Developer",
    "Web Performance",
    "Interaction Design",
  ],
  authors: [{ name: profile.name, url: contact.github }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: title,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description,
  email: `mailto:${contact.email}`,
  url: siteUrl,
  sameAs: [contact.github],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
