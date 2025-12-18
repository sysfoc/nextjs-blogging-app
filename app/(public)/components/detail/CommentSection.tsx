import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface CommentSectionProps {
  postId: string; // Changed from blogId to postId
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    comment: "",
  });

  const getComments = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/comment/get/${postId}`);
      const data = await res.json();
      setComments(data.comment || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (postId) {
      getComments();
    }
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/v1/comment/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, postId }), // Changed blogId to postId
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          comment: "",
        });
        getComments();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='mt-12'>
      <div className='my-4'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold'>Leave a Comment</h3>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='https://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#FE4F70'></stop>
                <stop offset='100%' stopColor='#FFA387'></stop>
              </linearGradient>
            </defs>
            <path
              d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
              stroke='url(#gradient)'
              strokeWidth='2'
              fill='none'
            ></path>
          </svg>
        </div>
      </div>
      <form className='my-6 flex flex-col gap-y-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            autoComplete='name'
            placeholder='Enter your name'
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            autoComplete='email'
            placeholder='Enter your email'
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-y-2'>
          <Label htmlFor='comment'>Comment*</Label>
          <Textarea
            id='comment'
            name='comment'
            placeholder='Enter your comment'
            className='min-h-[100px]'
            required
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
          />
        </div>
        <div>
          <button
            disabled={loading}
            type='submit'
            className='cursor-pointer w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm disabled:opacity-50'
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
      <div className='mt-12'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold'>Comments</h3>
        </div>
        <div className='mt-2'>
          <svg width='33' height='6' xmlns='https://www.w3.org/2000/svg'>
            <defs>
              <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' stopColor='#FE4F70'></stop>
                <stop offset='100%' stopColor='#FFA387'></stop>
              </linearGradient>
            </defs>
            <path
              d='M33 1c-3.3 0-3.3 4-6.598 4C23.1 5 23.1 1 19.8 1c-3.3 0-3.3 4-6.599 4-3.3 0-3.3-4-6.6-4S3.303 5 0 5'
              stroke='url(#gradient)'
              strokeWidth='2'
              fill='none'
            ></path>
          </svg>
        </div>
        <div className='mt-4 flex flex-col gap-y-4'>
          {loading && !comments.length ? (
            <p className='text-sm text-gray-500'>Loading comments...</p>
          ) : comments?.length > 0 ? (
            comments.map((comment: any) => (
              <div
                key={comment._id}
                className='border border-gray-200 rounded-xl p-4'
              >
                <div className='flex items-center gap-x-2'>
                  <h4 className='text-lg font-bold'>{comment.name}</h4>
                  <span className='text-xs text-gray-500'>
                    (
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    )
                  </span>
                </div>
                <p className='text-sm mt-2'>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500'>Be the first to comment</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;