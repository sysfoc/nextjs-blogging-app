// app/(admin)/components/blog-posts/AddBlogPost.tsx
"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface FormData {
  title: string;
  description: string;
  image: File | null;
  slug: string;
  metatitle: string;
  metadesc: string;
  author: string;
  type: string;
  status: string;
}

const AddBlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
    slug: "",
    metatitle: "",
    metadesc: "",
    author: "",
    type: "1",
    status: "draft",
  });

  const config = {
    placeholder: "Start typing...",
    height: 500,
    uploader: {
      insertImageAsBase64URI: true,
    },
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    processPasteHTML: true,
    events: {
      paste: (event: any) => {
        console.log("Paste event triggered");
        return true;
      },
      focus: () => {
        console.log("Editor focused");
      },
    } as any,
  };

  const handleContentChange = (newContent: string) => {
    setFormData((prev) => ({
      ...prev,
      description: newContent,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
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

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("metatitle", formData.metatitle);
      form.append("metadesc", formData.metadesc);
      form.append("slug", formData.slug);
      form.append("author", formData.author);
      form.append("type", formData.type);
      form.append("status", formData.status);

      if (formData.image) {
        form.append("image", formData.image);
      }

      const res = await fetch("/api/v1/blog/add", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/blog-posts");
        setFormData({
          title: "",
          description: "",
          image: null,
          slug: "",
          metatitle: "",
          metadesc: "",
          author: "",
          type: "1",
          status: "draft",
        });
      } else {
        setError(true);
        setErrorMessage(data.message || "Failed to create blog");
      }
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormData} encType="multipart/form-data" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline text-sm">{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="metatitle">Meta Title</Label>
          <Input
            type="text"
            id="metatitle"
            name="metatitle"
            placeholder="Meta Title"
            className="border border-black placeholder:text-black"
            required
            value={formData.metatitle}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="metadesc">Meta Description</Label>
          <Input
            type="text"
            id="metadesc"
            name="metadesc"
            placeholder="Meta Description"
            className="border border-black placeholder:text-black"
            required
            value={formData.metadesc}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Blog Title"
            className="border border-black placeholder:text-black"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            type="text"
            id="slug"
            name="slug"
            placeholder="Slug (auto-generated)"
            className="border border-black placeholder:text-black bg-gray-50"
            required
            readOnly
            value={formData.slug}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            id="author"
            name="author"
            placeholder="Author name"
            className="border border-black placeholder:text-black"
            required
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Blog Type</Label>
          <Select value={formData.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="border border-black">
              <SelectValue placeholder="Select blog type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">General Blog</SelectItem>
              <SelectItem value="0">News Blog</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="border border-black">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Featured Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="border border-black placeholder:text-black"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="flex flex-col col-span-1 sm:col-span-2 gap-2">
          <Label>Blog Content</Label>
          <Suspense fallback={<p>Loading editor...</p>}>
            <LazyJoditEditor
              value={formData.description}
              config={config}
              tabIndex={1}
              onBlur={handleContentChange}
            />
          </Suspense>
        </div>
      </div>

      <div className="mt-6">
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Blog Post"}
        </button>
      </div>
    </form>
  );
};

export default AddBlogPost;