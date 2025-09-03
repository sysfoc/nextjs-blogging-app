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
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
    category: "",
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
        setErrorMessage(data.message);
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
          <Label htmlFor='category'>Category</Label>
          <Select name='category' value={formData.category} onValueChange={(e) => setFormData({ ...formData, category: e })}>
            <SelectTrigger className='w-full border border-black'>
              <SelectValue placeholder='Select main category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Main Categories</SelectLabel>
                {mainCategories.map((category: any) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
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
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='metaTitle'>Meta Title</Label>
          <Input
            type='text'
            id='metaTitle'
            name='metaTitle'
            placeholder='Enter Meta Title'
            className='border border-black placeholder:text-black'
            required
            autoComplete='off'
            value={formData.metaTitle}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='metaDescription'>Meta Description</Label>
          <Input
            type='text'
            id='metaDescription'
            name='metaDescription'
            placeholder='Enter Meta Description'
            className='border border-black placeholder:text-black'
            required
            autoComplete='off'
            value={formData.metaDescription}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='h1Title'>H1 Title</Label>
          <Input
            type='text'
            id='h1Title'
            name='h1Title'
            placeholder='Enter H1 Title'
            className='border border-black placeholder:text-black'
            required
            autoComplete='off'
            value={formData.h1Title}
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
