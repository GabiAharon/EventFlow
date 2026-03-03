import type { Metadata } from "next";
import { JetBrains_Mono, Suez_One, Varela_Round } from "next/font/google";

import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "./globals.css";

const display = Suez_One({
  variable: "--font-display",
  subsets: ["latin", "hebrew"],
  weight: "400",
});

const body = Varela_Round({
  variable: "--font-body",
  subsets: ["latin", "hebrew"],
  weight: "400",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EventFlow",
    template: "%s | EventFlow",
  },
  description:
    "Bilingual event PWA for fast event creation, attendance confirmations, recommendations, and offline-ready check-in.",
  applicationName: "EventFlow",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EventFlow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
