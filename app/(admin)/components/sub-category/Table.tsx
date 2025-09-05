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
import { Input } from "@/components/ui/input";

interface MainCategory {
  _id: string;
  name: string;
}
const Table = () => {
  const [formData, setFormData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [mainCategories, setMainCategories] = React.useState<MainCategory[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [subRes, catRes] = await Promise.all([
        fetch("/api/v1/sub-category/get-all", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        fetch("/api/v1/category/get-all", {
          method: "GET",
          credentials: "include",
        }),
      ]);

      const [subData, catData] = await Promise.all([
        subRes.json(),
        catRes.json(),
      ]);

      setFormData(subData.subCategories);
      setMainCategories(catData.categories);
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
    ? formData.filter((category: any) => {
        const lowerSearch = searchTerm.toLowerCase().trim();
        return (
          category?._id?.toString().toLowerCase().includes(lowerSearch) ||
          category?.name?.toLowerCase().includes(lowerSearch) ||
          category?.h1Title?.toLowerCase().includes(lowerSearch) ||
          mainCategories
            .find((cat: any) => cat._id === category.category)
            ?.name?.toLowerCase()
            .includes(lowerSearch)
        );
      })
    : formData;

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
          {filteredCategory?.length > 0 ? (
            filteredCategory.map((category: any) => (
              <TableRow key={category._id}>
                <TableCell>{category._id.slice(0, 13)}...</TableCell>
                <TableCell className='capitalize'>
                  {
                    mainCategories.find(
                      (cat: any) => cat._id === category.category
                    )?.name
                  }
                </TableCell>{" "}
                <TableCell className='capitalize'>{category.name}</TableCell>
                <TableCell>{category.h1Title}</TableCell>
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
  );
};

export default Table;
