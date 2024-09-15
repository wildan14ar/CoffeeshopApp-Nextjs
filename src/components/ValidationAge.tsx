"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/atoms/Loader";

export default function ValidationAge({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ageValidated, setAgeValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cek apakah pengguna sudah validasi umur dengan local storage
    const ageValidated = localStorage.getItem("ageValidated");
    if (ageValidated) {
      setAgeValidated(true);
    }
    setIsLoading(false); // Set loading selesai
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("ageValidated", "true");
    setAgeValidated(true);
  };

  if (isLoading) {
    return <Loader />; // atau spinner
  }

  return (
    <>
      {ageValidated ? (
        <div>{children}</div>
      ) : (
        <div className="w-screen h-screen absolute flex flex-col items-center justify-center bg-[url('/bg-validation.png')] bg-center bg-cover p-4">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-t-md text-white tracking-wide">
            VapMart
          </h1>
          <div className="bg-white bg-opacity-30 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg max-w-md text-center flex flex-col items-center gap-4">
            <h2 className="text-white text-base font-semibold">
              Apakah kamu sudah lebih dari 21 tahun?
            </h2>
            <button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700 transition font-semibold"
            >
              Confirm
            </button>
            <p className="text-xs text-white">
              Situs ini hanya untuk pengguna berusia 21 tahun ke atas. Jika Anda
              belum berusia 21 tahun, harap tinggalkan situs ini.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
