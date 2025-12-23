// app/(public)/components/navbar/Navlinks.tsx
"use client";
import Link from "next/link";

const Navlinks = ({ navLinks }: { navLinks: any }) => {
  return (
    <nav className='hidden md:flex items-center gap-x-4 lg:gap-x-8'>
      {navLinks.slice(0, 5).map((link: any, index: number) => (
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
                absolute left-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800
                dark:text-gray-200
                shadow-lg
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
                        className='block px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors'
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
      <Link
        href={`/blogs`}
        className='text-sm font-medium capitalize hover:text-primary transition-colors'
      >
        Blogs
      </Link>
      <Link
        href={`/celebrity-news`}
        className='text-sm font-medium capitalize hover:text-primary transition-colors'
      >
        News
      </Link>
    </nav>
  );
};

export default Navlinks;
