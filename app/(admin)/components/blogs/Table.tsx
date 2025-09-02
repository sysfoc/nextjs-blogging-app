import React from "react";
import {
  Table as TableWrapper,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Pen, Trash2 } from "lucide-react";
const Table = () => {
  return (
    <div>
      <TableWrapper>
        <TableCaption>A list of your recently created blogs.</TableCaption>
        <TableHeader className='!bg-[#fe4f70]/70 hover:!bg-[#fe4f70]'>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              <Image
                src='/banner.webp'
                alt='blog-image'
                width={30}
                height={30}
                className='size-auto object-cover w-[30px] h-[30px] rounded-full'
              />
            </TableCell>
            <TableCell>Blog Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>
              <div className='flex gap-x-2 items-center'>
                <Link
                  href={"/admin/blogs/edit/id"}
                  className='bg-green-500 text-white px-2 py-2 rounded'
                >
                  <Pen size={12} />
                </Link>
                <button className='bg-red-500 text-white cursor-pointer px-2 py-2 rounded'>
                  <Trash2 size={12} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </TableWrapper>
    </div>
  );
};

export default Table;
