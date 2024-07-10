import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Custom hook for intersection observer
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isIntersecting];
};

const Socials = () => {
  const canvasRef = useRef(null);
  const [socialsRef, isSocialsVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const lines = [
      {
        startX: 0,
        startY: canvas.height * 0.2,
        endX: canvas.width,
        endY: canvas.height * 0.8,
        color: "#FF6B6B",
      },
      {
        startX: 0,
        startY: canvas.height * 0.8,
        endX: canvas.width,
        endY: canvas.height * 0.2,
        color: "#4ECDC4",
      },
      {
        startX: canvas.width * 0.2,
        startY: 0,
        endX: canvas.width * 0.8,
        endY: canvas.height,
        color: "#45B7D1",
      },
      {
        startX: canvas.width * 0.8,
        startY: 0,
        endX: canvas.width * 0.2,
        endY: canvas.height,
        color: "#FFA07A",
      },
    ];

    const drawBackground = () => {
      ctx.fillStyle = "#001933";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCurvedLine = (startX, startY, endX, endY, progress, color) => {
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2 - 50;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);

      const currentEndX = startX + (endX - startX) * progress;
      const currentEndY = startY + (endY - startY) * progress;

      ctx.quadraticCurveTo(midX, midY, currentEndX, currentEndY);
      ctx.stroke();
    };

    let progress = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      progress += 0.005;
      if (progress > 1) progress = 0;

      lines.forEach((line) => {
        drawCurvedLine(
          line.startX,
          line.startY,
          line.endX,
          line.endY,
          progress,
          line.color
        );
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/taim_worldwide?igsh=Y3NkcG81cTBtM3o%3D&utm_source=qr",
      icon: FaInstagram,
      color: "from-pink-500 to-yellow-500",
    },
    {
      name: "Youtube",
      href: "https://youtube.com/@taim_worldwide?si=YcO2gWUHLIUM6yFd",
      icon: FaYoutube,
      color: "from-red-600 to-red-700",
    },
    {
      name: "X.com",
      href: "https://x.com/taim_worldwide?s=21&t=6mlcBkuEixMIzX9NHMScAg",
      icon: FaXTwitter,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/gsk.agbo.7?mibextid=LQQJ4d",
      icon: FaFacebook,
      color: "from-blue-600 to-blue-800",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={socialsRef}
        className="relative z-10 w-full max-w-4xl px-4 py-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          Connect With Us
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isSocialsVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={social.href} passHref>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block p-6 rounded-xl bg-gradient-to-br ${social.color} shadow-lg transform transition-all duration-300 hover:shadow-xl cursor-pointer`}
                >
                  <div className="flex flex-col items-center">
                    <social.icon className="text-4xl mb-4 text-white" />
                    <span className="text-lg font-semibold text-white">
                      {social.name}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Socials;
