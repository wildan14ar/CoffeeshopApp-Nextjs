'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/blog?category=Howto')
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
      <div className='w-full max-w-[900px] flex flex-warp justify-center gap-3 p-3'>
        {blogs.map((blog) => (
            <Link href={`/blog/${blog.id}`}>
              <img src={blog.image_url} alt={blog.name} className='w-full max-w-[400px]' />
            </Link>
        ))}
      </div>
  );
}
