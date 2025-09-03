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
const Table = () => {
  const [formData, setFormData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const getAllBlogs = async () => {
    setLoading(true);
    const res = await fetch("/api/v1/blog/get-all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoading(false);
    setFormData(data.blogs);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleDeleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/blog/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await res.json();
      getAllBlogs();
    } catch (error) {
      alert("Something went wrong, please try again");
    }
  };
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
          {loading && (
            <TableRow>
              <TableCell colSpan={5} className='text-center'>
                Loading...
              </TableCell>
            </TableRow>
          )}
          {formData?.length > 0 ? (
            formData?.map((item: any, index) => (
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
                <TableCell>{item?.category}</TableCell>
                <TableCell>
                  <div className='flex gap-x-2 items-center'>
                    <Link
                      href={`/admin/blogs/edit/${item._id}`}
                      className='bg-green-500 text-white px-2 py-2 rounded'
                    >
                      <Pen size={12} />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button className='bg-red-500 text-white cursor-pointer px-2 py-2 rounded'>
                          <Trash2 size={12} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the blog and its content will no longer be
                            available.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteBlog(item._id)}
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
              <TableCell colSpan={5} className='text-center'>
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
