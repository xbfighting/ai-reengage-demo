"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DebugPanel from '@/components/dev/DebugPanel'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <style jsx global>{`
          header {
            background: linear-gradient(90deg, #3b82f6, #1e40af);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          footer {
            background: linear-gradient(90deg, #1e40af, #3b82f6);
            box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
          }
        `}</style>
        <header className="bg-blue-600 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">AI REENGAGE</h1>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white py-4 px-6 text-center">
          <p>&copy; 2025 AI REENGAGE. All rights reserved.</p>
        </footer>
        <DebugPanel />
      </body>
    </html>
  );
}
