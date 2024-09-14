"use client";

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";

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

export default BackButton;
