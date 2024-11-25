"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const About = ({
  images = [],
  title = "About Us",
  description = "The Apostolic Intercession Ministry is an interdenominational organization dedicated to spiritual transformation. Our mission is to spread the Gospel, establish churches, and nurture disciples across global communities. We believe in the power of prayer, community engagement, and meaningful spiritual growth.",
}) => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Image Slider */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="h-full"
            >
              {images.slice(0, 3).map((image, index) => (
                <SwiperSlide key={index} className="w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`Ministry Image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Text Content */}
          <div className="px-4 py-6 md:p-8 space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 pb-2 border-b-2 border-blue-500">
              {title}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </button>
              <button className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
