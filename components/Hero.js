"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";

export default function HeroSection() {
  const images = [
    "/pic (1).jpg",
    "/pastor.jpg",
    "/pic (3).jpg",
    "/pic (4).jpg",
    "/sk.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* Background Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] transform ${
            index === currentImage
              ? "opacity-100 scale-110"
              : "opacity-0 scale-100"
          }`}
        >
          <Image
            src={image}
            alt={`Background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative h-full max-w-[1380px] mx-auto px-6 py-8">
        <div
          className={`flex flex-col items-center  justify-end h-full pb-20 transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <button className="bg-white text-black px-4 py-2 rounded-md text-sm lg:text-xs font-medium mb-6">
            Global Ministry Outreach
          </button>

          <h1 className="text-3xl lg:text-4xl font-bold font-luxury leading-tight text-white text-center  mb-8">
            Standing in the Gap for All Nations
          </h1>

          <p className="text-white text-center font-sans lg:text-left mb-8">
            Committed to bringing sustainable hope, meaningful healing, and
            transformative support to underserved communities worldwide.
          </p>

          <Link href="/programs">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md flex items-center space-x-2 text-lg lg:text-base">
              <span>Explore Our Mission</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
