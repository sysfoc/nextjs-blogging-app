// app/(admin)/components/posts/Table.tsx
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
import Pagination from "../common/Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const Table = () => {
  const [formData, setFormData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getAllPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/v1/posts/get-all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoading(false);
    setFormData(data.posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/posts/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      await res.json();
      getAllPosts();
    } catch (error) {
      alert("Something went wrong, please try again");
    }
  };

  const filteredData = searchTerm
    ? formData.filter((post: any) => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
          post?.id?.toString().toLowerCase().includes(lowerSearch) ||
          post?.name?.toLowerCase().includes(lowerSearch) ||
          post?.title?.toLowerCase().includes(lowerSearch) ||
          post?.sub_category?.name?.toLowerCase().includes(lowerSearch) ||
          post?.slug?.toLowerCase().includes(lowerSearch)
        );
      })
    : formData;

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = filteredData.slice(startIndex, endIndex);

  return (
    <div>
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
        <TableWrapper>
          <TableCaption>A list of your recently created posts.</TableCaption>
          <TableHeader className="!bg-[#fe4f70]/70 hover:!bg-[#fe4f70]">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Sub-category</TableHead>
              <TableHead>Trending</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading Posts...
                </TableCell>
              </TableRow>
            ) : paginatedBlogs?.length > 0 ? (
              paginatedBlogs?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {item.image ? (
                      // <Image
                      //   src={`/posts/images/${item.image}`}
                      //   alt={`${item.name}-image`}
                      //   width={30}
                      //   height={30}
                      //   className="size-auto object-cover w-[30px] h-[30px] rounded-full"
                      // />
                      <img
                        src={`/posts/images/${item.image}`}
                        alt={`${item.name}-image`}
                        width="30"
                        height="30"
                        className="size-auto object-cover w-[30px] h-[30px] rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </TableCell>
                  <TableCell>{item?.name?.slice(0, 30)}</TableCell>
                  <TableCell>
                    {item?.title ? item.title.slice(0, 30) : "N/A"}
                  </TableCell>
                  <TableCell className="capitalize">
                    {item?.sub_category?.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    {item?.is_trending === "1" ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Yes
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        No
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-2 items-center">
                      <Link
                        href={`/admin/posts/edit/${item.id}`}
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
                              permanently delete the post and its content will
                              no longer be available.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePost(item.id)}
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
                <TableCell colSpan={7} className="text-center">
                  No Data Found
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
        totalItems={filteredData.length}
      />
    </div>
  );
};

export default Table;
