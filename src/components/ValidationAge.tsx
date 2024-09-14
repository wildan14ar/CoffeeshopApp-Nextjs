"use client";

import { useState, useEffect } from "react";

export default function ValidationAge({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ageValidated, setAgeValidated] = useState(false);

  useEffect(() => {
    // Cek apakah pengguna sudah validasi umur dengan local storage
    const ageValidated = localStorage.getItem("ageValidated");
    if (ageValidated) {
      setAgeValidated(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("ageValidated", "true");
    setAgeValidated(true);
  };

  return (
    <>
      {ageValidated ? (
        <div>{children}</div>
      ) : (
        <div className="w-screen h-screen absolute flex items-center justify-center p-3">
          <div className="bg-purple-500 px-4 py-8 rounded shadow-lg max-w-md text-center flex flex-col justify-content items-center gap-3">
            <h2 className="text-base font-bold">
              Apakah kamu sudah lebih dari 21 tahun ?
            </h2>
            <button
              onClick={handleConfirm}
              className="bg-purple-600 text-white px-4 py-2 max-w-max  rounded hover:bg-purple-700 transition"
            >
              Confirm
            </button>
            <p className="text-xs">
              Situs ini hanya untuk pengguna berusia 21 tahun ke atas. Jika Anda
              belum berusia 21 tahun, harap tinggalkan situs ini.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
