import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/(public)/components/ThemeProvider";
import StoreProvider from './StoreProvider';
import LayoutWrapper from "./LayoutWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NetWorthMama – Celebrity Net Worth, Luxury Lifestyle & Wealth Insights",
  description: "Explore the latest celebrity net worth, luxury lifestyle, earnings, and career insights on NetWorthMama. Discover how your favorite stars live and earn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased max-w-[1680px] mx-auto`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
