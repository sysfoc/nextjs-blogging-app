// app/(admin)/components/category/EditCategory.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";

const EditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    metaTitle: "",
    metaDescription: "",
    h1Title: "",
  });
  const getCategoryById = async () => {
    setLoading(true);
    const res = await fetch(`/api/v1/category/get-single-category/${params.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoading(false);
    setFormData(data.category);
  };
  useEffect(() => {
    getCategoryById();
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/category/update/${formData._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/admin/category");
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Something went wrong");
    }
  }
  return (
    <form onSubmit={handleFormData}>
      {error && (
        <div className='mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
          <span className='block sm:inline text-sm'>{errorMessage}</span>
        </div>
      )}
      <div className='grid grid-cols-1 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Category name</Label>
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
          Update
        </button>
      </div>
    </form>
  );
};

export default EditCategory;