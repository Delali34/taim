import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import Link from "next/link";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const images = [
    "/pic (1).jpg",
    "/pastor.jpg",
    "/pic (3).jpg",
    "/pic (4).jpg",
    "/sk.jpg",
  ];

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Navbar />
      {/* Background Image Grid */}
      <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-60">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden h-screen"
            style={{
              transform: `translateY(${
                scrollY * 0.1 * (index % 2 ? 1 : -1)
              }px)`,
            }}
          >
            <img
              src={src}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover transform scale-110 hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      {/* Content */}
      <div className="relative h-screen flex items-center px-8 lg:px-16">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/80 text-lg lg:text-xl tracking-wider uppercase"
            >
              Welcome to our ministry
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
            >
              Standing in the gap
              <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                for all nations
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-white/70 text-lg lg:text-xl max-w-2xl"
            >
              Join us in our mission to bring hope, healing, and transformation
              to communities around the world through faith and dedication.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {/* <button className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all duration-300 hover:pr-12">
                Get Started
                <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </button> */}
              <Link href="/programs">
                {" "}
                <button className="group px-8 py-4 border border-white/30 text-white rounded-full flex items-center gap-2 hover:bg-white/10 transition-all duration-300">
                  Learn More
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
