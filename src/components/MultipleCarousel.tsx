"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

export default function MultipleCarousel() {
  const slides = [
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
  ];

  return (
    <div className="carousel-container w-full max-w-[900px] my-3 px-2 mx-auto">
      <label className="font-bold text-purple-500 pb-4">Best Seller</label>
      <Swiper
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          // When window width is >= 320px
          200: {
            slidesPerView: 2,
          },
          260: {
            slidesPerView: 3,
          },
          320: {
            slidesPerView: 4,
          },
          // When window width is >= 480px
          480: {
            slidesPerView: 5,
          },
          // When window width is >= 640px
          640: {
            slidesPerView: 6,
          },
          // When window width is >= 900px
          900: {
            slidesPerView: 7,
          },
          // When window width is >= 1200px
          1200: {
            slidesPerView: 8,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Tetapkan min-height untuk menjaga konsistensi tinggi */}
            <div className="w-full h-[75px] sm:h-[100px] lg:h-[125px]">
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
