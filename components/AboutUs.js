import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-['Inter',sans-serif] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 animate-gradient-x"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        >
          About Us
        </motion.h1>

        <div className="space-y-16">
          <Section
            title="Vision"
            content="To raise 20,000 Global Intercessors who will stand in the gap for every nation, until we fulfil the Great Commission."
            icon="👁️"
            delay={0.2}
          />
          <Section
            title="Mission"
            content="To organize Global Intercession marathons and training programs to raise Intercessors."
            icon="🎯"
            delay={0.4}
          />
          <Section
            title="Short-term Goal"
            content="Within 10 years, we aim to raise 4,680 Global Intercessors, 24 for each of the 195 countries in the world, to commit to an hour of prayer each day within an unbroken 24/7 prayer chain."
            icon="⏱️"
            delay={0.6}
          />
          <Section
            title="Long-term Goal"
            content="In 40 years, we aim to raise 20,000 Global Intercessors—100 for each country of the world, and an additional 500 who will stand in the gap to pray ceaselessly in global intercession and towards the fulfilment of the Great Commission."
            icon="🌍"
            delay={0.8}
          />
        </div>
      </div>
      {isClient && <Particles />}
    </div>
  );
};

const Section = ({ title, content, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg p-8 relative overflow-hidden"
    style={{
      boxShadow:
        "0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
    }}
  >
    <div className="absolute top-4 right-4 text-4xl">{icon}</div>
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </motion.div>
);

const Particles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-500 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: {
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
};

export default AboutUs;
