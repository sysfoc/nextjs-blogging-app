import Image from "next/image";
import React from "react";
import Navlinks from "@/app/(public)/components/navbar/Navlinks";
import Darkmode from "@/app/(public)/components/navbar/Darkmode";
import MobileNav from "@/app/(public)/components/navbar/MobileNav";
import { useEffect, useState } from "react";

const CACHE_EXPIRY = 3 * 60 * 1000;
const Header = () => {
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const getNavLinks = async () => {
    try {
      const cached = localStorage.getItem("navLinksCache");
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setNavLinks(data);
          return;
        }
      }
      const res = await fetch("/api/v1/blog/get/nav-links", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load navlinks");
      const data = await res.json();
      setNavLinks(data.categories);
      localStorage.setItem(
        "navLinksCache",
        JSON.stringify({ data: data.categories, timestamp: Date.now() })
      );
    } catch (error) {
      console.error("Header API error:", error);
    }
  };
  useEffect(() => {
    getNavLinks();
  }, []);
  return (
    <header className='shadow-md relative z-99'>
      <div className='flex items-center justify-between mx-4 md:mx-12 py-3'>
        <div className='flex items-center gap-x-3'>
          <Image
            src='/logo.png'
            alt='logo'
            width={80}
            height={50}
            className='size-auto'
            fetchPriority='high'
            priority
          />
        </div>
        <Navlinks navLinks={navLinks} />
        <div className='flex items-center gap-x-3'>
          <Darkmode />
          <div className='md:hidden'>
            <MobileNav navLinks={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
