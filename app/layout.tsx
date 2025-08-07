import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from '@/app/(public)/components/ThemeProvider';
import Header from "@/app/(public)/components/Header";
import Footer from "@/app/(public)/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Blogging Application",
  description: "Getting Started ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased max-w-[1680px] mx-auto`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
