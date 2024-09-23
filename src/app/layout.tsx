"use client";

// Styles
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/style.css";

// Components
import Navbar from "@/components/Navbar";
import Footnav from "@/components/Footnav";

// Provider and More
import { ThemeProvider } from "@/components/theme-provider";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import ValidationAge from "@/components/ValidationAge";
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

const dissableNav = [
  "/login",
  "/register",
  "/register/mitra",
  "/validation",
  "/cart",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <title>Vapmart</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            <SessionProviderWrapper>
              <ValidationAge>
                {!dissableNav.includes(pathname) && <Navbar />}
                <div className="min-h-screen">{children}</div>
                {!dissableNav.includes(pathname) && <Footnav />}
              </ValidationAge>
            </SessionProviderWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
