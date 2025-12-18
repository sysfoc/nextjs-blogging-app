// app/(admin)/components/users/Table.tsx
"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import Pagination from "@/app/(admin)/components/common/Pagination";

const ITEMS_PER_PAGE = 10;

const Table = () => {
  const [formData, setFormData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredUsers = searchTerm
    ? formData.filter((user: any) => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
          user?.user_id?.toLowerCase().includes(lowerSearch) ||
          user?.name?.toLowerCase().includes(lowerSearch) ||
          user?.email?.toLowerCase().includes(lowerSearch)
        );
      })
    : formData;

  // Reset to page 1 when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/user/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await res.json();
      getAllUsers();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="mb-2 flex items-end justify-end">
        <Input
          type="search"
          id="search"
          name="search"
          placeholder="Start typing to search"
          className="w-[300px] bg-transparent border border-[#fe4f70] focus-visible:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <TableWrapper>
          <TableCaption>A list of your recently created users.</TableCaption>
          <TableHeader className="!bg-[#fe4f70]/70 hover:!bg-[#fe4f70]">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {paginatedUsers?.length > 0 ? (
              paginatedUsers.map((user: any) => (
                <TableRow className="relative" key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-x-2 items-center">
                      <Link
                        href={`/admin/users/edit/${user.user_id}`}
                        className="bg-green-500 text-white px-2 py-2 rounded"
                      >
                        <Pen size={12} />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger className="bg-red-500 text-white cursor-pointer px-2 py-2 rounded">
                          <Trash2 size={12} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the user account and remove all
                              of it data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.user_id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <div
                      className={`${
                        user.isEmployee ? "hidden" : "block"
                      } animate-ping absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full`}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableWrapper>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={filteredUsers.length}
      />
    </div>
  );
};

export default Table;
