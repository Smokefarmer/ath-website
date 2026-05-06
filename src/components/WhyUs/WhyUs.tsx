"use client";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import WhyUsCard from "./WhyUsCard";
import { whyUsConfig } from "./whyUsConfig";

const WhyUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
  });

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="size-full pt-20 pb-10 md:pb-[20rem] lg:pb-[27rem] px-5 lg:px-12"
    >
      <div className="relative w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-5 xl:gap-20 max-lg:overflow-hidden">
        <m.h2
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="lg:sticky top-36 text-[56px] md:text-[70px] lg:text-[7vw] text-primary leading-[1] overflow-hidden"
        >
          What sets us apart
        </m.h2>

        <div className="flex flex-col items-start justify-start gap-16 lg:gap-24 lg:ml-[9vw] md:pr-12">
          {whyUsConfig.map((item, idx) => (
            <WhyUsCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
