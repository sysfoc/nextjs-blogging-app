// app/(admin)/components/posts/EditPost.tsx
"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const EditPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    metadesc: "",
    metatitle: "",
    sub_category_id: "",
    is_trending: "0",
    title: "",
    content: "",
    slug: "",
    image: "" as string | File,
    networth: "",
    networth_23: "",
    networth_24: "",
    networth_25: "",
    bd: "",
    bp: "",
    gender: "",
    height: "",
    profession: "",
    nationality: "",
    afiliateLinkData: "",
    uploaded_by: "",
  });

  const [currentImage, setCurrentImage] = useState<string>("");

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

  const getPostById = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/posts/get-single-post/${params.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.post.name || "",
          metadesc: data.post.metadesc || "",
          metatitle: data.post.metatitle || "",
          sub_category_id: data.post.sub_category_id || "",
          is_trending: data.post.is_trending || "0",
          title: data.post.title || "",
          content: data.post.content || "",
          slug: data.post.slug || "",
          image: data.post.image || "",
          networth: data.post.networth || "",
          networth_23: data.post.networth_23 || "",
          networth_24: data.post.networth_24 || "",
          networth_25: data.post.networth_25 || "",
          bd: data.post.bd || "",
          bp: data.post.bp || "",
          gender: data.post.gender || "",
          height: data.post.height || "",
          profession: data.post.profession || "",
          nationality: data.post.nationality || "",
          afiliateLinkData: data.post.afiliateLinkData || "",
          uploaded_by: data.post.uploaded_by || "",
        });
        setCurrentImage(data.post.image || "");
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Failed to load post");
    }
    setLoading(false);
  };

  const getSubCategories = async () => {
    try {
      const res = await fetch("/api/v1/sub-category/get-all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setSubCategories(data.subCategories || []);
    } catch (error) {
      setError(true);
      setErrorMessage("Failed to load sub-categories");
    }
  };

  useEffect(() => {
    getPostById();
    getSubCategories();
  }, []);

  const handleContentChange = (newContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "name") {
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
        if (value !== null && value !== "") {
          form.append(key, value as any);
        }
      });

      const res = await fetch(`/api/v1/posts/update/${params.id}`, {
        method: "PATCH",
        body: form,
      });

      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/admin/posts");
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormData}
      encType="multipart/form-data"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {error && (
        <div className="mb-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline text-sm">{errorMessage}</span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="border border-black placeholder:text-black"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug (Auto-generated)</Label>
          <Input
            type="text"
            id="slug"
            name="slug"
            placeholder="Slug"
            className="border border-black placeholder:text-black"
            required
            readOnly
            value={formData.slug}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="metatitle">Meta Title</Label>
          <Input
            type="text"
            id="metatitle"
            name="metatitle"
            placeholder="Meta Title"
            className="border border-black placeholder:text-black"
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
            placeholder="Title"
            className="border border-black placeholder:text-black"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="sub_category_id">Sub Category *</Label>
          <Select
            name="sub_category_id"
            value={formData.sub_category_id}
            onValueChange={(e) =>
              setFormData({ ...formData, sub_category_id: e })
            }
          >
            <SelectTrigger className="w-full border border-black">
              <SelectValue placeholder="Select sub category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub Categories</SelectLabel>
                {subCategories.map((category: any) => (
                  <SelectItem key={category?.id} value={category?.id}>
                    {category?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="uploaded_by">Uploaded By</Label>
          <Input
            type="text"
            id="uploaded_by"
            name="uploaded_by"
            placeholder="Uploader name"
            className="border border-black placeholder:text-black"
            value={formData.uploaded_by}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="profession">Profession</Label>
          <Input
            type="text"
            id="profession"
            name="profession"
            placeholder="Profession"
            className="border border-black placeholder:text-black"
            value={formData.profession}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            type="text"
            id="nationality"
            name="nationality"
            placeholder="Nationality"
            className="border border-black placeholder:text-black"
            value={formData.nationality}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Input
            type="text"
            id="gender"
            name="gender"
            placeholder="Gender"
            className="border border-black placeholder:text-black"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bd">Birth Date</Label>
          <Input
            type="text"
            id="bd"
            name="bd"
            placeholder="Birth Date"
            className="border border-black placeholder:text-black"
            value={formData.bd}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bp">Birth Place</Label>
          <Input
            type="text"
            id="bp"
            name="bp"
            placeholder="Birth Place"
            className="border border-black placeholder:text-black"
            value={formData.bp}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="height">Height</Label>
          <Input
            type="text"
            id="height"
            name="height"
            placeholder="Height"
            className="border border-black placeholder:text-black"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="networth">Net Worth</Label>
          <Input
            type="text"
            id="networth"
            name="networth"
            placeholder="Net Worth"
            className="border border-black placeholder:text-black"
            value={formData.networth}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="networth_23">Net Worth 2023</Label>
          <Input
            type="text"
            id="networth_23"
            name="networth_23"
            placeholder="Net Worth 2023"
            className="border border-black placeholder:text-black"
            value={formData.networth_23}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="networth_24">Net Worth 2024</Label>
          <Input
            type="text"
            id="networth_24"
            name="networth_24"
            placeholder="Net Worth 2024"
            className="border border-black placeholder:text-black"
            value={formData.networth_24}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="networth_25">Net Worth 2025</Label>
          <Input
            type="text"
            id="networth_25"
            name="networth_25"
            placeholder="Net Worth 2025"
            className="border border-black placeholder:text-black"
            value={formData.networth_25}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="afiliateLinkData">Affiliate Link Data</Label>
          <Input
            type="text"
            id="afiliateLinkData"
            name="afiliateLinkData"
            placeholder="Affiliate Link Data"
            className="border border-black placeholder:text-black"
            value={formData.afiliateLinkData}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Checkbox
            id="is_trending"
            className="border border-black"
            checked={formData.is_trending === "1"}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_trending: checked ? "1" : "0" })
            }
          />
          <Label htmlFor="is_trending">Mark as trending</Label>
        </div>
        <div className="flex flex-col col-span-1 sm:col-span-2 gap-2">
          <Label htmlFor="image">Select new image (optional)</Label>
          {currentImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              {/* <Image
                src={`/posts/images/${currentImage}`}
                alt="Current blog image"
                width={150}
                height={150}
                className="rounded border object-cover"
              /> */}
              <img
                src={`/posts/images/${currentImage}`}
                alt="Current blog image"
                width="150"
                height="150"
                className="rounded border object-cover"
              />
            </div>
          )}
          <Input
            type="file"
            id="image"
            name="image"
            className="border border-black placeholder:text-black"
            onChange={handleImageChange}
          />
          <span className="text-xs text-gray-500">
            Leave empty to keep existing image
          </span>
        </div>
        <div className="flex flex-col col-span-1 sm:col-span-2 gap-2">
          <p className="text-sm font-semibold">Write Content:</p>
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
      <div className="mt-6">
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </div>
    </form>
  );
};

export default EditPosts;
