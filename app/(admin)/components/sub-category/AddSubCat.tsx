// app/(admin)/components/sub-category/AddSubCat.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AddSubCat = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [mainCategories, setMainCategories] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    metatitle: "",
    metadesc: "",
    h1: "",
    canonical: "",
    image: "",
    main_category_id: "",
  });
  const router = useRouter();

  const getCategories = async () => {
    try {
      const res = await fetch("/api/v1/category/get-all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setMainCategories(data.categories);
    } catch (error) {
      setError(true);
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/sub-category/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/admin/sub-category");
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(data?.message);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleFormData}>
      {error && (
        <div className='mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
          <span className='block sm:inline text-sm'>{errorMessage}</span>
        </div>
      )}
      <div className='grid grid-cols-1 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='main_category_id'>Category</Label>
          <Select
            name='main_category_id'
            value={formData?.main_category_id}
            onValueChange={(e) => setFormData({ ...formData, main_category_id: e })}
          >
            <SelectTrigger className='w-full border border-black'>
              <SelectValue placeholder='Select main category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Main Categories</SelectLabel>
                {mainCategories?.map((category: any) => (
                  <SelectItem key={category?._id} value={category?._id}>
                    {category?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Sub-category name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Enter Name'
            className='border border-black placeholder:text-black'
            required
            autoComplete='off'
            value={formData?.name}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='metatitle'>Meta Title</Label>
          <Input
            type='text'
            id='metatitle'
            name='metatitle'
            placeholder='Enter Meta Title'
            className='border border-black placeholder:text-black'
            autoComplete='off'
            value={formData?.metatitle}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='metadesc'>Meta Description</Label>
          <Input
            type='text'
            id='metadesc'
            name='metadesc'
            placeholder='Enter Meta Description'
            className='border border-black placeholder:text-black'
            autoComplete='off'
            value={formData?.metadesc}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='h1'>H1 Title</Label>
          <Input
            type='text'
            id='h1'
            name='h1'
            placeholder='Enter H1 Title'
            className='border border-black placeholder:text-black'
            autoComplete='off'
            value={formData?.h1}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='canonical'>Canonical URL</Label>
          <Input
            type='text'
            id='canonical'
            name='canonical'
            placeholder='Enter Canonical URL'
            className='border border-black placeholder:text-black'
            autoComplete='off'
            value={formData?.canonical}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='image'>Image URL</Label>
          <Input
            type='text'
            id='image'
            name='image'
            placeholder='Enter Image URL'
            className='border border-black placeholder:text-black'
            autoComplete='off'
            value={formData?.image}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='mt-6'>
        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default AddSubCat;