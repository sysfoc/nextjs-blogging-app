"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    writer: "",
    content: "",
    category: "",
    isEditorPick: false,
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
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          form.append(key, value ? "true" : "false");
        } else {
          form.append(key, value as any);
        }
      });

      const res = await fetch("/api/v1/blog/add", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/admin/blogs");
        setFormData({
          title: "",
          description: "",
          image: "",
          slug: "",
          metaTitle: "",
          metaDescription: "",
          writer: "",
          content: "",
          category: "",
          isEditorPick: false,
        });
      } else {
        setError(true);
        setErrorMessage(data.message);
        setFormData({
          title: "",
          description: "",
          image: "",
          slug: "",
          metaTitle: "",
          metaDescription: "",
          writer: "",
          content: "",
          category: "",
          isEditorPick: false,
        });
        setLoading(false);
      }
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleFormData} encType='multipart/form-data'>
      {error && (
        <div className='mb-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
          <span className='block sm:inline text-sm'>{errorMessage}</span>
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='metaTitle'>Meta Title</Label>
          <Input
            type='text'
            id='metaTitle'
            name='metaTitle'
            placeholder='Meta Title'
            className='border border-black placeholder:text-black'
            required
            value={formData.metaTitle || ""}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='metaDescription'>Meta Description</Label>
          <Input
            type='text'
            id='metaDescription'
            name='metaDescription'
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
        <div className='flex flex-col gap-2'>
          <Label htmlFor='category'>Category</Label>
          <select
            name='category'
            id='category'
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className='border border-black py-2 px-3 rounded-md text-sm'
          >
            <option value='wishes'>Best Wishes</option>
            <option value='hami'>Hami</option>
          </select>
        </div>
        <div className='flex flex-row gap-2'>
          <Checkbox
            id='isEditorPick'
            className='border border-black'
            checked={formData.isEditorPick}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isEditorPick: checked === true })
            }
          />
          <Label htmlFor='isEditorPick'>Mark as editor pick</Label>
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
          disabled={loading}
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
