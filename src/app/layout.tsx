"use client";

import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/style.css";
import Navbar from "@/components/Navbar";
import Footnav from "@/components/Footnav";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import ValidationAge from "@/components/ValidationAge";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "./store";

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

const dissableNav = ["/login", "/register", "/validation"];

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
          <Provider store={store}>
            <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
              <SessionProviderWrapper>
                <ValidationAge>
                  {!dissableNav.includes(pathname) && <Navbar />}
                  <div className="h-screen">{children}</div>
                  {!dissableNav.includes(pathname) && <Footnav />}
                </ValidationAge>
              </SessionProviderWrapper>
            </div>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
