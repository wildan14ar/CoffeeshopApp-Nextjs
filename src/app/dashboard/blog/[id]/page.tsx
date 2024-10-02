"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Upload from "@/components/atoms/Upload";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditBlog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("News");
  const router = useRouter();
  const { id } = useParams(); 
  const [uploadUrl, setUploadUrl] = useState("");

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setImageUrl(data.image_url);
        setContent(data.content);
        setCategory(data.category);
      });
  }, [id]);

  const handleUpload = (url) => {
    setUploadUrl(url);
    setImageUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, image_url, content, category }),
    });

    if (res.ok) {
      router.push("/dashboard/manager/blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition duration-300">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Edit Blog
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Judul
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition duration-300"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deskripsi
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition duration-300"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image
          </label>
          {uploadUrl && (
              <div className="mb-4">
                <h3 className="text-gray-700 dark:text-gray-300">Uploaded Image</h3>
                <img
                  src={uploadUrl}
                  alt="Uploaded"
                  className="max-w-full h-auto rounded-md"
                />
                <p className="text-gray-700 dark:text-gray-300">URL: {uploadUrl}</p>
              </div>
          )}
          <Upload onUpload={handleUpload} />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Konten
          </label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="border border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition duration-300"
          >
            <option value="News">News</option>
            <option value="Howto">Howto</option>
            <option value="Programs">Programs</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white dark:text-gray-100 p-3 rounded-md shadow hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
 