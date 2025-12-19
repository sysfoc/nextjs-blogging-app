// app/(admin)/components/blog-posts/Table.tsx
"use client";
import React, { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Pen, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Pagination from "@/app/(admin)/components/common/Pagination";

interface BlogUser {
  name: string;
  email: string;
}

interface Blog {
  _id: string;
  id: string;
  title: string;
  slug: string;
  image: string;
  status: string;
  author: string;
  views: string | null;
  type: string;
  user_id: BlogUser | null;
}

const ITEMS_PER_PAGE = 10;

const Table = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/blog/get-all", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
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

      if (res.ok) {
        getAllBlogs();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Something went wrong, please try again");
    }
  };

  const filteredBlogs = searchTerm
    ? blogs.filter((blog) => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
          blog.id?.toLowerCase().includes(lowerSearch) ||
          blog.title?.toLowerCase().includes(lowerSearch) ||
          blog.slug?.toLowerCase().includes(lowerSearch) ||
          blog.author?.toLowerCase().includes(lowerSearch) ||
          blog.user_id?.name?.toLowerCase().includes(lowerSearch)
        );
      })
    : blogs;

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const getBlogTypeLabel = (type: string) => {
    return type === "0"
      ? "News Blog"
      : type === "1"
      ? "General Blog"
      : "Unknown";
  };

  const getBlogTypeVariant = (type: string) => {
    return type === "0" ? "destructive" : "default";
  };

  const getStatusVariant = (status: string) => {
    return status === "published" ? "default" : "secondary";
  };

  return (
    <div>
      <div className="mb-4 flex items-end justify-end">
        <Input
          type="search"
          id="search"
          name="search"
          placeholder="Search by title, slug, author, or ID..."
          className="w-[350px] bg-transparent border border-[#fe4f70] focus-visible:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <TableWrapper>
          <TableCaption>A list of all blog posts</TableCaption>
          <TableHeader className="bg-[#fe4f70]/70! hover:!bg-[#fe4f70]">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedBlogs.length > 0 ? (
              paginatedBlogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell className="font-medium">{blog.id}</TableCell>
                  <TableCell>
                    <Image
                      src={`/posts/images/${blog?.image}`}
                      alt={blog.title}
                      width={50}
                      height={50}
                      className="size-[50px] object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {blog.title}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {blog.slug}
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    <Badge variant={getBlogTypeVariant(blog.type)}>
                      {getBlogTypeLabel(blog.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(blog.status)}>
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-2 items-center">
                      <Link
                        href={`/admin/blog-posts/edit/${blog.id}`}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded transition-colors"
                      >
                        <Pen size={14} />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-2 py-2 rounded transition-colors">
                          <Trash2 size={14} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the blog post "{blog.title}"
                              and remove it from the database along with its
                              associated image.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
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
                <TableCell colSpan={8} className="text-center py-8">
                  No blogs found
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
        totalItems={filteredBlogs.length}
      />
    </div>
  );
};

export default Table;
