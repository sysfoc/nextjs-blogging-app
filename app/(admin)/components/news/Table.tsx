"use client";
import React, { useEffect } from "react";
import {
  Table as TableWrapper,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { Pen, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
const Table = () => {
  const [formData, setFormData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const getAllNews = async () => {
    setLoading(true);
    const res = await fetch("/api/v1/news/get-all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoading(false);
    setFormData(data.news);
  };
  useEffect(() => {
    getAllNews();
  }, []);
  console.log(formData);
  const handleDeleteNews = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/news/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await res.json();
      getAllNews();
    } catch (error) {
      alert("Something went wrong, please try again");
    }
  };

  const filteredData = searchTerm
    ? formData.filter((news: any) => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
          news?._id?.toString().toLowerCase().includes(lowerSearch) ||
          news?.title?.toLowerCase().includes(lowerSearch) ||
          news?.slug?.toLowerCase().includes(lowerSearch)
        );
      })
    : formData;
  return (
    <div>
      <div className='mb-2 flex items-end justify-end'>
        <Input
          type='search'
          id='search'
          name='search'
          placeholder='Start typing to search'
          className='w-[300px] bg-transparent border border-[#fe4f70] focus-visible:ring-0'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TableWrapper>
        <TableCaption>A list of your recently created news.</TableCaption>
        <TableHeader className='!bg-[#fe4f70]/70 hover:!bg-[#fe4f70]'>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={6} className='text-center'>
                Loading...
              </TableCell>
            </TableRow>
          )}
          {filteredData?.length > 0 ? (
            filteredData?.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item._id.slice(0, 12)}...</TableCell>
                <TableCell>
                  <Image
                    src={item.image}
                    alt={`${item.title}-image`}
                    width={30}
                    height={30}
                    className='size-auto object-cover w-[30px] h-[30px] rounded-full'
                  />
                </TableCell>
                <TableCell>{item?.title.slice(0, 20)}</TableCell>
                <TableCell>
                  {item?.slug.slice(0, 20)}
                </TableCell>
                <TableCell>
                  <div className='flex gap-x-2 items-center'>
                    <Link
                      href={`/admin/news/edit/${item.slug}`}
                      className='bg-green-500 text-white px-2 py-2 rounded'
                    >
                      <Pen size={12} />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger className='bg-red-500 text-white cursor-pointer px-2 py-2 rounded'>
                        <Trash2 size={12} />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the news and its content will no longer be
                            available.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteNews(item._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className='text-center'>
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableWrapper>
    </div>
  );
};

export default Table;
