"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NewsList({ int }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog?category=News")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <ul className="p-2 flex flex-col justify-center w-full gap-2">
      {blogs.slice(0, int || blogs.length).map((blog) => (
        <Link href={`/blog/${blog.id}`} key={blog.id}>
          <li className="p-2 w-full h-[80px] flex flex-row gap-4 bg-gray-800 rounded shadow-md hover:bg-gray-700 transition-all">
            <img
              src={blog.image_url}
              alt={blog.name}
              className="w-1/5 h-full object-cover rounded m-[-2]"
            />
            <div className="flex flex-col w-full overflow-hidden">
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
  );
}
