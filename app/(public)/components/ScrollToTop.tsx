"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className='h-12 w-12 rounded-full shadow-lg text-white bg-gradient-to-r from-[#FE4F70] to-[#FFA387] transition-transform duration-200 hover:scale-110 cursor-pointer'
      >
        <ArrowUp className='h-6 w-6' />
      </Button>
    </div>
  );
};

export default ScrollToTop;
