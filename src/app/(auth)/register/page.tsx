"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-extrabold mb-6">Register to Acount</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full max-w-sm p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}
