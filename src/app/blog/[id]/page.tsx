'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loader from "@/components/atoms/Loader";
import './blog.css'

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, [id]);

  if (!blog) return <Loader />;

  return (
    <div className='w-full max-w-[600px] mx-auto flex flex-col gap-5 px-2 py-5'>
      <h1 className='text-center'>{blog.name}</h1>
      <img className='mx-auto' src={blog.image_url} alt={blog.name} width="400" />
      {/* Konten HTML dari React Quill */}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}
