"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = ({ images = [] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  useEffect(() => {
    const parallaxElements = document.querySelectorAll(".parallax");
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach((el) => {
        const speed = el.dataset.speed;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative font-apple min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 to-white py-20"
    >
      <div className=" mx-auto px-6 sm:px-8 lg:px-14">
        <motion.div
          style={{ opacity, scale, y }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20"
        >
          <div className="lg:w-1/2">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-800 mb-6"
            >
              The Apostolic Intercession Ministry
              <span className="text-blue-500">(TAIM)</span>
            </motion.h1>
          </div>
          <div className="lg:w-1/2">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-left text-justify sm:text-xl text-gray-700 leading-relaxed"
            >
              An interdenominational and non-denominational ministry, TAIM is
              dedicated to the divine mandate of intercession until the Gospel
              reaches every soul, churches are established in every town and
              village, disciple-making movements become ingrained in every city,
              and every church member is transformed to be more like Jesus.
            </motion.p>
          </div>
        </motion.div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {images.slice(0, 3).map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-lg shadow-lg"
              >
                <motion.img
                  src={image}
                  alt={`TAIM Image ${index + 1}`}
                  className="w-full h-64 object-cover"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="parallax" data-speed="0.2">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50"></div>
        </div>
        <div className="parallax" data-speed="-0.1">
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-blue-300 rounded-full opacity-40"></div>
        </div>
        <div className="parallax" data-speed="0.3">
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-100 rounded-full opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
