import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Globe, Target } from "lucide-react";

const About = ({ images = [] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const featuredStats = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving communities across multiple nations",
      value: "10+ Countries",
    },
    {
      icon: Target,
      title: "Mission Focus",
      description: "Dedicated to transformative intercession",
      value: "Disciple-Making",
    },
    {
      icon: Award,
      title: "Commitment",
      description: "Unwavering dedication to spiritual growth",
      value: "24/7 Prayer",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Main Content */}
        <motion.div
          style={{ opacity, scale, y }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight"
            >
              The Apostolic
              <span className="block">Intercession Ministry</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              An interdenominational ministry dedicated to the divine mandate of
              intercession. We strive to transform lives, establish churches,
              and spread the Gospel until every soul is reached and every church
              member becomes more Christ-like.
            </motion.p>

            {/* Featured Stats */}
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              {featuredStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 * index }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <stat.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {stat.description}
                  </p>
                  <span className="font-semibold text-blue-600">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-8">
            {images.slice(0, 3).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 * index,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl group"
              >
                <img
                  src={image}
                  alt={`TAIM Image ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm font-medium">
                    Ministry Moment
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 2.5,
          }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default About;
