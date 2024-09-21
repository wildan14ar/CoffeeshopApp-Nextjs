"use client";

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button onClick={goBack} className="max-w-[200px] text-left">
      <IoIosArrowBack />
    </button>
  );
};

const BackButtonX = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button onClick={goBack} className="max-w-[200px] text-left">
      <TiDelete />
    </button>
  );
};

// Export komponen secara named exports
export { BackButton, BackButtonX };
