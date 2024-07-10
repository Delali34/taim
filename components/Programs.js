import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const programs = [
  {
    title: "Global Intercessors Conferences",
    tagline: "Unite. Pray. Transform.",
    description:
      "TAIM gathers Global Intercessors from the world over to intercede for the world.",
    image: "/pic (2).jpg",
    link: "/gic",
  },
  {
    title: "National Intercessors Conference",
    tagline: "Pray for your nation.",
    description:
      "Mobilizing intercessors within specific countries to fervently pray for their nation.",
    image: "/pic (1).jpg",
    link: "/nic",
  },
  {
    title: "24/7 Prayer for the Great Commission",
    tagline: "Unceasing prayer for global impact.",
    description:
      "Maintaining a WhatsApp group for continuous prayer, focusing on different continents daily.",
    image: "/pic (4).jpg",
    link: "/247-prayer",
  },
  {
    title: "Retreats and Training Programs",
    tagline: "Equip. Disciple. Intercede.",
    description:
      "Hosting retreats and training programs to equip intercessors for effective Global Intercession.",
    image: "/sk.jpg",
    link: "/retreats",
  },
  {
    title: "Music Workshop and Training Sessions",
    tagline: "Harmonize your skills with your calling.",
    description:
      "Training musicians to perform exceptionally in Christian settings.",
    image: "/pic (3).jpg",
    link: "/music-workshop",
  },
];

const Programs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length);
      setKey((prevKey) => prevKey + 1);
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentIndex, key]);

  const changeSlide = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + programs.length) % programs.length
      );
    }
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="relative h-[700px] bg-black overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            <Image
              src={programs[currentIndex].image}
              alt={programs[currentIndex].title}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex items-center justify-center">
              <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {programs[currentIndex].title}
                </motion.h2>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {programs[currentIndex].tagline}
                </motion.p>
                <motion.p
                  className="text-sm sm:text-base md:text-lg text-gray-400 mb-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {programs[currentIndex].description}
                </motion.p>
                <motion.a
                  href={programs[currentIndex].link}
                  className="inline-block bg-white text-black py-2 px-6 rounded-full text-sm sm:text-base font-semibold transition duration-300 ease-in-out hover:bg-gray-200"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={() => changeSlide("prev")}
          className="bg-white/30 hover:bg-white/50 text-white rounded-full p-3 focus:outline-none transition duration-300"
        >
          <IoChevronBackOutline className="h-6 w-6" />
        </button>
        <button
          onClick={() => changeSlide("next")}
          className="bg-white/30 hover:bg-white/50 text-white rounded-full p-3 focus:outline-none transition duration-300"
        >
          <IoChevronForwardOutline className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Programs;
