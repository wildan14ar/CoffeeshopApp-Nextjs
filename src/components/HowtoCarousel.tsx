"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

export default function HowtoCarousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    // Fetch the blog data for the 'Programs' category
    async function fetchSlides() {
      try {
        const response = await fetch("/api/blog?category=Howto");
        const data = await response.json();
        // Get only the first 5 items
        const imageUrls = data.slice(0, 5).map((item) => item.image_url);
        setSlides(imageUrls);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    }

    fetchSlides();
  }, []);

  return (
    <div className="carousel-container w-full max-w-[700px] my-3 px-2 mx-auto">
      <div className="flex flex-row justify-between my-2">
        <h4 className="text-sm">How to use the apps</h4>
        <Link href="/blog/Howto" className="text-sm font-bold text-purple-500">
          See All
        </Link>
      </div>
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
              <div className="w-full h-[220px] sm:h-[370px] lg:h-[420px]">
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
