import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
} from "react-icons/io5";

const programs = [
  {
    title: "Global Intercessors Conferences",
    tagline: "Unite. Pray. Transform.",
    description:
      "TAIM gathers Global Intercessors from the world over to intercede for the world.",
    fullDescription: `
      The Global Intercessors Conferences are transformative gatherings that bring together prayer warriors from across the globe. These conferences aim to:
      - Create a unified platform for international intercessors
      - Provide strategic prayer guidance for global challenges
      - Foster spiritual connections across cultural and geographical boundaries
      - Equip participants with advanced intercession techniques
      - Develop a global network of committed prayer leaders
    `,
    image: "/pic (2).jpg",
    link: "/gic",
    additionalDetails: {
      frequency: "Annual",
      locations: "Varies globally",
      targetAudience: "Intercessors, Prayer Leaders, Spiritual Activists",
    },
  },
  {
    title: "National Intercessors Conference",
    tagline: "Pray for your nation.",
    description:
      "Mobilizing intercessors within specific countries to fervently pray for their nation.",
    fullDescription: `
      The National Intercessors Conference focuses on empowering local prayer communities to intercede for their specific nations. Key objectives include:
      - Mobilizing nationwide prayer movements
      - Addressing specific national spiritual and socio-political challenges
      - Training local intercessors in targeted prayer strategies
      - Building strong, collaborative prayer networks within countries
      - Encouraging sustained, intentional prayer for national transformation
    `,
    image: "/pic (1).jpg",
    link: "/nic",
    additionalDetails: {
      frequency: "Bi-annual",
      locations: "Country-specific",
      targetAudience: "National Church Leaders, Intercessors",
    },
  },
  {
    title: "24/7 Prayer for the Great Commission",
    tagline: "Unceasing prayer for global impact.",
    description:
      "Maintaining a WhatsApp group for continuous prayer, focusing on different continents daily.",
    fullDescription: `
      The 24/7 Prayer for the Great Commission is an innovative continuous prayer initiative that:
      - Maintains a global WhatsApp prayer group
      - Rotates prayer focus across different continents daily
      - Ensures round-the-clock intercession for global missionary efforts
      - Connects intercessors from various time zones and regions
      - Supports global evangelism and mission work through sustained prayer
    `,
    image: "/pic (4).jpg",
    link: "/247-prayer",
    additionalDetails: {
      frequency: "Continuous",
      platform: "WhatsApp",
      targetAudience: "Global Intercessors, Missionaries",
    },
  },
  {
    title: "Retreats and Training Programs",
    tagline: "Equip. Disciple. Intercede.",
    description:
      "Hosting retreats and training programs to equip intercessors for effective Global Intercession.",
    fullDescription: `
      The Retreats and Training Programs are designed to develop and empower intercessors through:
      - Intensive spiritual training workshops
      - Practical intercession skill development
      - Mentorship and discipleship opportunities
      - Spiritual renewal and personal growth sessions
      - Networking with experienced prayer leaders
    `,
    image: "/sk.jpg",
    link: "/retreats",
    additionalDetails: {
      frequency: "Quarterly",
      locations: "Multiple venues",
      targetAudience: "Emerging and Experienced Intercessors",
    },
  },
  {
    title: "Music Workshop and Training Sessions",
    tagline: "Harmonize your skills with your calling.",
    description:
      "Training musicians to perform exceptionally in Christian settings.",
    fullDescription: `
      The Music Workshop and Training Sessions provide comprehensive musical training for ministry:
      - Advanced instrumental and vocal techniques
      - Worship leadership skills
      - Music theory and spiritual application
      - Performance coaching in Christian contexts
      - Spiritual formation for musicians
    `,
    image: "/pic (3).jpg",
    link: "/music-workshop",
    additionalDetails: {
      frequency: "Bi-annual",
      format: "In-person and Online",
      targetAudience: "Church Musicians, Worship Leaders",
    },
  },
];

const ProgramDescriptionModal = ({ program, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <div className="relative h-64 w-full">
          <Image
            src={program.image}
            alt={program.title}
            layout="fill"
            objectFit="cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 rounded-full p-2"
          >
            <IoCloseOutline className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{program.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{program.tagline}</p>
          <div className="prose max-w-none mb-6">
            <p>{program.fullDescription}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Additional Details</h3>
            {Object.entries(program.additionalDetails).map(([key, value]) => (
              <div key={key} className="flex mb-1">
                <span className="font-medium mr-2 capitalize">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Programs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);

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
                <motion.button
                  onClick={() => setSelectedProgram(programs[currentIndex])}
                  className="inline-block bg-white text-black py-2 px-6 rounded-full text-sm sm:text-base font-semibold transition duration-300 ease-in-out hover:bg-gray-200"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Learn More
                </motion.button>
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

      {selectedProgram && (
        <ProgramDescriptionModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
};

export default Programs;
