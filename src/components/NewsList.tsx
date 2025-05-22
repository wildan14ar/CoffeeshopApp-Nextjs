"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NewsListProps {
  int?: number;
}

interface Blog {
  id: number;
  name: string;
  description: string;
  image_url: string;
  int?: number;
}

export default function NewsList({ int }: NewsListProps) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog?category=News")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <ul className="flex flex-wrap justify-center w-full gap-2">
      {blogs.slice(0, int || blogs.length).map((blog: Blog) => (
        <Link href={`/blog/${blog.id}`} key={blog.id}>
          <li className="flex flex-row w-full bg-zinc-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 items-stretch">
            <Image
              src={blog.image_url}
              alt={blog.name}
              width={100}
              height={80}
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
