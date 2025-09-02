"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    writer: "",
    content: "",
  });

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    height: 500,
    uploader: {
      url: "/api/upload",
      insertImageAsBase64URI: false,
    },
    filebrowser: {
      ajax: {
        url: "/api/upload",
      },
    },
  };
  const handleContentChange = (newContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev: any) => ({
      ...prev,
      image: file,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "title") {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
      }

      return updated;
    });
  };
  return (
    <form encType='multipart/form-data'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='meta-title'>Meta Title</Label>
          <Input
            type='text'
            id='meta-title'
            name='meta-title'
            placeholder='Meta Title'
            className='border border-black placeholder:text-black'
            required
            value={formData.metaTitle || ""}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='meta-description'>Meta Description</Label>
          <Input
            type='text'
            id='meta-description'
            name='meta-description'
            placeholder='Meta Description'
            className='border border-black placeholder:text-black'
            required
            value={formData.metaDescription || ""}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            className='border border-black placeholder:text-black'
            required
            value={formData.title || ""}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='slug'>Slug</Label>
          <Input
            type='text'
            id='slug'
            name='slug'
            placeholder='Slug'
            className='border border-black placeholder:text-black'
            required
            readOnly
            value={formData.slug || ""}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='writer'>Writer</Label>
          <Input
            type='text'
            id='writer'
            name='writer'
            placeholder='Writer name'
            className='border border-black placeholder:text-black'
            required
            value={formData.writer || ""}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col col-span-2 gap-2'>
          <Label htmlFor='image'>Select image</Label>
          <Input
            type='file'
            id='image'
            name='image'
            className='border border-black placeholder:text-black'
            onChange={handleImageChange}
            required
          />
        </div>
        <div className='flex flex-col col-span-2 gap-2'>
          <p className='text-sm font-semibold'>Write Content:</p>
          <Suspense fallback={<p>Loading editor...</p>}>
            <LazyJoditEditor
              value={formData.content}
              config={config}
              tabIndex={1}
              onBlur={handleContentChange}
            />
          </Suspense>
        </div>
      </div>
      <div className='mt-6'>
        <button
          type='submit'
          className='w-full py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
