import Image from "next/image";
import React from "react";
import Navlinks from "@/app/(public)/components/navbar/Navlinks";
import Darkmode from "@/app/(public)/components/navbar/Darkmode";
import MobileNav from "@/app/(public)/components/navbar/MobileNav";

const Header = () => {
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
        <Navlinks />
        <div className='flex items-center gap-x-3'>
          <Darkmode />
          <div className='md:hidden'>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
