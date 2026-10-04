import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | DilectIQ",
    default: "DilectIQ — AI Voice Calling Platform",
  },
  description:
    "Deploy AI voice agents for inbound and outbound calls. Sales, support, EMI reminders, fraud alerts, and more — in Hindi, Hinglish, and English.",
  keywords: ["AI voice agent", "calling platform", "IVR", "India", "Hindi", "outbound calling"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "DilectIQ",
    title: "DilectIQ — AI Voice Calling Platform",
    description: "Deploy AI voice agents for inbound and outbound calls.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DilectIQ",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <QueryProvider>
          <TooltipProvider delay={200}>
            {children}
            <Toaster />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
