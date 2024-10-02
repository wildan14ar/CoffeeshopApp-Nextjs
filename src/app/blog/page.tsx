"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="p-2 flex flex-col gap-3">
      <div className="flex flex-col justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-center text-white">Blogs Page</h1>
        <p>You Have Information in Page</p>
      </div>
      <ul className="w-full flex flex-wrap justify-center gap-3">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <li className="w-full h-[80px] max-w-[400px] flex flex-row gap-2 bg-zinc-900 rounded shadow-md">
              <img
                src={blog.image_url}
                alt={blog.name}
                className="w-1/4 h-full object-cover rounded m-[-2]"
              />
              <div className="flex flex-col w-full overflow-hidden p-2">
                <h4 className="text-lg font-bold text-white truncate">
                  {blog.name}
                </h4>
                <p className="text-sm text-gray-400 truncate">
                  {blog.description}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
