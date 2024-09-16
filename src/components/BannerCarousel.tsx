"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

export default function BannerCarousel() {
  const slides = [
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
  ];

  return (
    <div className="carousel-container w-full my-3 px-2 mx-auto">
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
        className="w-full max-w-[700px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Tetapkan min-height untuk menjaga konsistensi tinggi */}
            <div className="w-full h-[200px] sm:h-[350px] lg:h-[400px]">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
