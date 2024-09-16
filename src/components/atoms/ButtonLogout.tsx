'use client';

import { signOut } from 'next-auth/react';

export default function ButtonLogout() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};
