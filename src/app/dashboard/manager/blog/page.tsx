"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
          } else {
            alert("Failed to delete the blog.");
          }
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-center">Daftar Blog</h1>
        <Link href="/dashboard/manager/blog/new">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Tambah Blog
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nama Blog</th>
              <th className="px-4 py-2 text-left">Deskripsi</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{blog.name}</td>
                <td className="px-4 py-2">{blog.description}</td>
                <td className="px-4 py-2">{blog.category}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link href={`/dashboard/manager/blog/${blog.id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
