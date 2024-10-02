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
    <div className="container mx-auto p-6">
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          Daftar Blog
        </h1>
        <Link href="/dashboard/blog/new">
          <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300">
            Tambah Blog
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Nama Blog</th>
              <th className="py-3 px-6 text-left">Deskripsi</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-400 text-sm font-light">
            {blogs.map((blog, index) => (
              <tr
                key={blog.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                <td className="py-3 px-6 text-left">{blog.name}</td>
                <td className="py-3 px-6 text-left truncate">{blog.description}</td>
                <td className="py-3 px-6 text-left">{blog.category}</td>
                <td className="py-3 px-6 text-left flex space-x-2">
                  <Link href={`/dashboard/blog/${blog.id}`}>
                    <button className="bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition duration-300">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 dark:bg-red-400 text-white dark:text-gray-900 px-4 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-400 transition duration-300"
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
