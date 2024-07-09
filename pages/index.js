import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Socials from "@/components/Socials";

const images = ["/pic (1).jpg", "/pic (2).jpg", "/sk.jpg"];

const index = () => {
  return (
    <div>
      <Hero />
      <About images={images} />
      <Socials />
    </div>
  );
};

export default index;
