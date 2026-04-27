import type { Metadata } from "next";
import { Instrument_Sans, Lora } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibgyor Engineering WLL",
  description: "Boutique contracting firm specializing in workspace design and interior transformation.",
};

import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col gpu-boost">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
