"use client";

import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-[400px] sm:h-[500px] text-center mx-auto rounded-sm p-1/2 h-full flex flex-col justify-center items-center p-6 gap-2">
        {children}
        <hr />
        <button
          onClick={() => signIn("google")}
          className="w-full max-w-sm p-3 mx-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
        >
          {isLoginPage ? "Sign In With Google" : "Sign Up With Google"}
        </button>
        <p className="mt-4 text-sm text-gray-600">
          {isLoginPage ? (
            <span>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
