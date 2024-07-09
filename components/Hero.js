import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const HeroSection = () => {
  const images = [
    "/pic (1).jpg",
    "/pastor.jpg",
    "/pic (3).jpg",
    "/pic (4).jpg",
    "/sk.jpg",
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes scrollLeft {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes scrollRight {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.append(style);
    return () => style.remove();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden font-apple bg-gray-900">
      {" "}
      <Navbar />
      {[1, -1, 1].map((direction, index) => (
        <div
          key={index}
          className="absolute w-full h-1/3"
          style={{ top: `${index * 33.3333}%` }}
        >
          <div
            className="flex absolute w-[200%] h-full"
            style={{
              animation: `scroll${
                direction > 0 ? "Left" : "Right"
              } 30s linear infinite`,
            }}
          >
            {[...images, ...images].map((src, imgIndex) => (
              <div key={imgIndex} className="w-1/5 h-full flex-shrink-0">
                <img
                  src={src}
                  alt={`Scenic ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        className="absolute inset-0 bg-black/30 "
        style={{ width: "100%" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />{" "}
      {/* Subtle overlay */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-2/3  flex flex-col justify-center px-8 sm:px-16 z-10">
        <h1
          className="text-white text-3xl sm:text-5xl uppercase md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
          style={{ animation: "fadeIn 1s ease-out" }}
        >
          Standing in the gap
        </h1>
        <h2
          className="text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8"
          style={{ animation: "fadeIn 1s ease-out 0.5s both" }}
        >
          for all nations
        </h2>
        <button
          className="bg-white text-gray-900 py-3 px-8 rounded-full w-[300px] text-lg font-semibold hover:bg-opacity-90 transition duration-300 ease-in-out inline-block"
          style={{ animation: "fadeIn 1s ease-out 1s both" }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
