import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  ArrowUpRight,
} from "lucide-react";

const Socials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first intersection to prevent re-triggering
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/taim_worldwide?igsh=Y3NkcG81cTBtM3o%3D&utm_source=qr",
      icon: Instagram,
      gradient: "from-[#405DE6] via-[#5851DB] to-[#FFDC80]",
      description: "Visual stories of our mission",
    },
    {
      name: "Youtube",
      href: "https://youtube.com/@taim_worldwide?si=YcO2gWUHLIUM6yFd",
      icon: Youtube,
      gradient: "from-[#FF0000] to-[#8B0000]",
      description: "Inspiring video content",
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/taim_worldwide?s=21&t=6mlcBkuEixMIzX9NHMScAg",
      icon: Twitter,
      gradient: "from-black to-gray-800",
      description: "Latest updates and thoughts",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/gsk.agbo.7?mibextid=LQQJ4d",
      icon: Facebook,
      gradient: "from-[#3B5998] to-[#1A365D]",
      description: "Community connections",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
            Stay Connected
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow our journey, engage with our community, and be part of our
            global mission.
          </p>
        </motion.div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: isVisible ? index * 0.2 : 0,
                type: "spring",
                stiffness: 200,
              }}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <Link href={social.href} passHref target="_blank">
                <div
                  className={`
                    relative p-8 rounded-2xl 
                    bg-gradient-to-br ${social.gradient}
                    shadow-2xl overflow-hidden 
                    cursor-pointer 
                    group
                    border border-white/10
                    hover:border-white/20
                  `}
                >
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon with Hover Effect */}
                    <div className="mb-6 relative">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="p-4 bg-white/10 rounded-full"
                      >
                        <social.icon
                          className="text-6xl text-white"
                          strokeWidth={1.5}
                        />
                      </motion.div>

                      <div className="absolute -top-2 -right-2 bg-white/30 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight
                          className="text-white w-5 h-5"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    {/* Social Platform Name */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {social.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/70 mb-4">
                      {social.description}
                    </p>

                    {/* Hover Indicator */}
                    <div className="mt-2 px-4 py-2 bg-white/10 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Connect Now
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default Socials;
