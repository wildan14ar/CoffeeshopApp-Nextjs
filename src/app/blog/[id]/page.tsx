"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/atoms/Loader";
import "./blog.css";
import HeadingPhone from "@/components/atoms/HeadingPhone";

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
    <>
      <HeadingPhone name={blog.category} />
      <div className="w-full max-w-[600px] mx-auto flex flex-col gap-3 px-2 py-5">
        <img
          className="mx-auto"
          src={blog.image_url}
          alt={blog.name}
          width="400"
        />
        <h1>{blog.name}</h1>
        {/* Konten HTML dari React Quill */}
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </>
  );
}
