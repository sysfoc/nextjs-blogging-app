"use client";
import { usePathname } from "next/navigation";
import Header from "@/app/(public)/components/Header";
import Footer from "@/app/(public)/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/admin");

  return (
    <>
      {!isDashboard && <Header />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
