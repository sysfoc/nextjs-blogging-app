"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const CACHE_EXPIRY = 3 * 60 * 1000;
const Navlinks = () => {
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
    <nav className='hidden md:flex items-center gap-x-8'>
      {navLinks.map((link, index) => (
        <div key={index} className='relative group'>
          <Link
            href={`/category/${link.categorySlug}`}
            className='text-sm font-medium capitalize hover:text-primary transition-colors'
          >
            {link.categoryName}
          </Link>
          {link.subcategories.length > 0 && (
            <div
              className='
                absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transform translate-y-2 group-hover:translate-y-0
                transition-all duration-200 ease-out
              '
            >
              <ul className='flex flex-col p-2'>
                {link.subcategories.map(
                  (sub: { name: string; slug: string }, subIndex: number) => (
                    <li key={subIndex}>
                      <Link
                        href={`/category/${link.categorySlug}/${sub.slug}`}
                        className='block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors'
                      >
                        {sub.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navlinks;
