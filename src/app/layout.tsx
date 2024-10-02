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

const dissableRoutes = [
  "/login",
  "/register",
  "/cart",
  "/dashboard", // Any URL starting with /dashboard
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Check if pathname starts with any of the routes in dissableRoutes
  const shouldDisableNavbar = dissableRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const shouldDisableFootnav =
    dissableRoutes.some((route) => pathname.startsWith(route)) ||
    (pathname.startsWith("/product/") && pathname !== "/product");

  return (
    <html lang="en">
      <head>
        <title>Vapmart</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark:bg-black`}
      >
        <Provider store={store}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col">
              <SessionProviderWrapper>
                <ValidationAge>
                  {!shouldDisableNavbar && <Navbar />}
                  <div className="min-h-screen">{children}</div>
                  {!shouldDisableFootnav && <Footnav />}
                </ValidationAge>
              </SessionProviderWrapper>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
