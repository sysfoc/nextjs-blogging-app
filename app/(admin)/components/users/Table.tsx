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
import Link from "next/link";
import { Pen, Trash2 } from "lucide-react";
const Table = () => {
  const [formData, setFormData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/v1/user/get-all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoading(false);
    setFormData(data.users);
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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
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
            formData.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user._id.slice(0, 13)}...</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className='flex gap-x-2 items-center'>
                    <Link
                      href={`/admin/users/edit/${user._id}`}
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className='text-center'>
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableWrapper>
    </div>
  );
};

export default Table;
