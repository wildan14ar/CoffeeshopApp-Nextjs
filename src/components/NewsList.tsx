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
    <ul className="flex flex-wrap justify-center w-full gap-2">
      {blogs.slice(0, int || blogs.length).map((blog) => (
        <Link href={`/blog/${blog.id}`} key={blog.id}>
          <li className="w-full max-w-[400px] h-[80px] flex flex-row gap-2 bg-zinc-900 rounded shadow-md">
            <img
              src={blog.image_url}
              alt={blog.name}
              className="w-1/4 h-full object-cover rounded m-[-2]"
            />
            <div className="flex flex-col w-full overflow-hidden p-2">
              <h4 className="text-lg font-bold text-white truncate">
                {blog.name}
              </h4>
              <p
                className="text-sm text-gray-400"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {blog.description}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
