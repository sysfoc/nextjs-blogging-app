"use client";
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
import Link from "next/link";
import { Pen, Trash2 } from "lucide-react";
const Table = () => {
  const [formData, setFormData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/v1/category/get-all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoading(false);
    setFormData(data.categories);
  };
  React.useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <TableWrapper>
        <TableCaption>A list of your recently created users.</TableCaption>
        <TableHeader className='!bg-[#fe4f70]/70 hover:!bg-[#fe4f70]'>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>H1 Title</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={4} className='text-center'>
                Loading...
              </TableCell>
            </TableRow>
          )}
          {formData?.length > 0 ? (
            formData.map((category: any) => (
              <TableRow key={category._id}>
                <TableCell>{category._id.slice(0, 13)}...</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.h1Title}</TableCell>
                <TableCell>
                  <div className='flex gap-x-2 items-center'>
                    <Link
                      href={`/admin/category/edit/${category._id}`}
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
                            delete the user account and remove all of it data
                            from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className='text-center'>
                No categories found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableWrapper>
    </div>
  );
};

export default Table;
