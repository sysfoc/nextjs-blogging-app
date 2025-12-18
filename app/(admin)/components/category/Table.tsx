// app/(admin)/components/category/Table.tsx
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

  const getAllCategories = async () => {
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
    getAllCategories();
  }, []);

  const filteredCategory = searchTerm
    ? formData.filter((category: any) => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
          category?._id?.toString().toLowerCase().includes(lowerSearch) ||
          category?.name?.toLowerCase().includes(lowerSearch) ||
          category?.h1Title?.toLowerCase().includes(lowerSearch)
        );
      })
    : formData;

  // Reset to page 1 when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategory.slice(startIndex, endIndex);

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/category/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await res.json();
      getAllCategories();
    } catch (error) {
      alert("Something went wrong");
    }
  };

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
      <div className="overflow-x-auto">
        <TableWrapper>
          <TableCaption>A list of your recently created categories.</TableCaption>
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
            {paginatedCategories?.length > 0 ? (
              paginatedCategories.map((category: any) => (
                <TableRow key={category._id}>
                  <TableCell>{category._id.slice(0, 13)}...</TableCell>
                  <TableCell className='capitalize'>{category.name}</TableCell>
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
                              delete the category and remove all of it data from
                              our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCategory(category._id)}
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
                <TableCell colSpan={4} className='text-center'>
                  No categories found
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
        totalItems={filteredCategory.length}
      />
    </div>
  );
};

export default Table;