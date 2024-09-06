"use client";

import localFont from "next/font/local";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footnav from "@/components/Footnav";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";

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

const dissableNav = ["/login", "/register"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            {!dissableNav.includes(pathname) && <Navbar />}
            <div className="flex-grow overflow-y">{children}</div>
            {!dissableNav.includes(pathname) && <Footnav />}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
