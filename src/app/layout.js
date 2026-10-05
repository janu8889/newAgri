import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TopBar from "./components/layout/TopBar";
import EmailLink from "./components/layout/EmailLink";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SiteChrome, { SiteMain } from "./components/layout/SiteChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://statzeq.com"), // pune domeniul tău real

  title: {
    default: "Carl F. Statz & Sons Inc",
    template: "%s | Carl F. Statz & Sons Inc",
  },

  description:
    "Carl F. Statz & Sons Inc offers high-quality agricultural and construction machinery.",

  alternates: {
    canonical: "/", 
  },

  openGraph: {
    title: "Carl F. Statz & Sons Inc",
    description:
      "High-quality agricultural and construction machinery.",
    url: "https://statzeq.com",
    siteName: "Carl F. Statz & Sons Inc",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",               // favicon principal
    apple: "/apple-touch-icon.png",     // optional pentru iOS
    other: [
      { rel: "icon", url: "/favicon-32x32.png", type: "image/png" },
      { rel: "icon", url: "/favicon-16x16.png", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        


        <SiteChrome><TopBar /><Header /></SiteChrome>
        <SiteMain>{children}</SiteMain>
        <Analytics />
        <SiteChrome><div className="w-full py-4">
          <div className="max-w-7xl mx-auto flex justify-center items-center gap-2">
            <p className="text-gray-800 font-medium text-base md:text-lg tracking-wide">
              EMAIL US:
            </p>
          <EmailLink />
          </div>
        </div><Footer /></SiteChrome>
      </body>
    </html>
  );
}
