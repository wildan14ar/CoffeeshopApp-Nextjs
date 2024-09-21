'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HowtoPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/blog?category=Programs')
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
            <Link href={`/blog/${blog.id}`}>
              <img src={blog.image_url} alt={blog.name} width="200" />
            </Link>
        ))}
      </ul>
    </div>
  );
}
