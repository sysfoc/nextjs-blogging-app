"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/user/contact/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await res.json();
      setLoading(false);
      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        alert("Message sent successfully");
      } else {
        setLoading(false);
        alert("Something went wrong, please try again later");
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <div className='py-12 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4'>
      <Card className='w-full max-w-lg shadow-xl rounded-2xl border border-gray-200'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold text-gray-800'>
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='subject'>Subject</Label>
              <Input
                id='subject'
                name='subject'
                placeholder='Enter subject'
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='message'>Message</Label>
              <Textarea
                id='message'
                name='message'
                placeholder='Write your message...'
                rows={10}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type='submit'
              size={"lg"}
              disabled={loading}
              className='w-full rounded-xl py-2 cursor-pointer shadow-md hover:scale-[1.02] transition-transform'
            >
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
