"use client";

import "./globals.css";
import { Azeret_Mono, Red_Rose } from "next/font/google";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AppProgressBar } from "next-nprogress-bar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const fontSans = Red_Rose({
  variable: "--font-sans",
  weight: "variable",
  subsets: ["latin"],
});

const fontMono = Azeret_Mono({
  variable: "--font-mono",
  weight: "variable",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} ${fontMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <div className="flex flex-col min-h-screen bg-background">
              <Header href={"/"} />
              {children}
            </div>
            <AppProgressBar
              options={{ showSpinner: false }}
              color="hsl(var(--primary) / 0.9)"
            />
            <Toaster />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
