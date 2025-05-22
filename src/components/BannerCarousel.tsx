"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

export default function BannerCarousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Fetch the blog data for the 'Programs' category
    async function fetchSlides() {
      try {
        const response = await fetch("/api/blog?category=Programs");
        const data = await response.json();
        // Get only the first 5 items
        const imageUrls = data.slice(0, 5).map((item: { image_url: string }) => item.image_url);
        setSlides(imageUrls);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    }

    fetchSlides();
  }, []);

  return (
    <div className="carousel-container w-full max-w-[700px] my-3 px-2 mx-auto">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {slides.length > 0 &&
          slides.map((slide, index) => (
            <SwiperSlide key={index}>
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
