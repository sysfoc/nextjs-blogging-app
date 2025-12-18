// app/(admin)/components/sub-category/Table.tsx
"use client";
import React, {useState, useEffect} from "react";
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

interface MainCategory {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  id: string;
  name: string;
  slug: string;
  h1?: string;
  metatitle?: string;
  metadesc?: string;
  canonical?: string;
  image?: string;
  main_category_id: {
    _id: string;
    name: string;
    slug: string;
  };
}

const ITEMS_PER_PAGE = 10;

const Table = () => {
  const [formData, setFormData] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/v1/sub-category/get-all", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setFormData(data.subCategories);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const filteredCategory = searchTerm
    ? formData.filter((category) => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
          category?.id?.toLowerCase().includes(lowerSearch) ||
          category?.name?.toLowerCase().includes(lowerSearch) ||
          category?.h1?.toLowerCase().includes(lowerSearch) ||
          category?.main_category_id?.name?.toLowerCase().includes(lowerSearch)
        );
      })
    : formData;

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategory.slice(startIndex, endIndex);

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/sub-category/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await res.json();
      fetchData();
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
          <TableCaption>
            A list of your recently created sub-categories.
          </TableCaption>
          <TableHeader className='!bg-[#fe4f70]/70 hover:!bg-[#fe4f70]'>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Main Category</TableHead>
              <TableHead>Sub Category</TableHead>
              <TableHead>H1 Title</TableHead>
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
            {paginatedCategories?.length > 0 ? (
              paginatedCategories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell className='capitalize'>
                    {category.main_category_id?.name || "N/A"}
                  </TableCell>
                  <TableCell className='capitalize'>{category.name}</TableCell>
                  <TableCell>{category.h1 || "N/A"}</TableCell>
                  <TableCell>
                    <div className='flex gap-x-2 items-center'>
                      <Link
                        href={`/admin/sub-category/edit/${category._id}`}
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
                              delete the sub category and remove all of it data
                              from our servers.
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
                <TableCell colSpan={5} className='text-center'>
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