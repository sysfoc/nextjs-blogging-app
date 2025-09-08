"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const MobileNav = ({ navLinks }: { navLinks: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='cursor-pointer'>
          <Menu className='h-6 w-6' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuItem>
          <Link href='/'>Home</Link>
        </DropdownMenuItem>
        {navLinks.map((link : any, index: number) =>
          link.subcategories.length > 0 ? (
            <DropdownMenuSub key={index}>
              <DropdownMenuSubTrigger className='capitalize'>
                {link.categoryName}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {link.subcategories.map(
                  (sub: { name: string; slug: string }, subIndex: number) => (
                    <DropdownMenuItem key={subIndex} asChild>
                      <Link
                        href={`/category/${link.categorySlug}/${sub.slug}`}
                        className='capitalize'
                      >
                        {sub.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem key={index} asChild>
              <Link
                href={`/category/${link.categorySlug}`}
                className='capitalize'
              >
                {link.categoryName}
              </Link>
            </DropdownMenuItem>
          )
        )}
        <DropdownMenuItem>
          <Link href='/blogs'>Blogs</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/celebrity-news'>News</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
