"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowAnimation } from "../ArrowAnimation";
import CornerDecorators from "../CornerDecorators";
import { UnderlineText } from "../UnderlineText";
import { m, useTransform, useScroll, useInView } from "framer-motion";

export const Hero = () => {
  const { scrollY } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  const heroRef = useRef(null);

  const isInView = useInView(heroRef, { once: true });

  const heroFade = useTransform(
    scrollY,
    [0, viewportHeight ? viewportHeight * 0.2 : 1],
    [1, 0]
  );

  useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  return (
    <section id="home" className="relative h-[150vh] w-full">
      <m.div
        className="w-full h-[100dvh] sticky top-0 px-3 pt-3 md:px-5 md:pt-5 lg:py-[1vw] lg:px-[1.5vw]"
        ref={heroRef}
        style={{ opacity: heroFade }}
      >
        <div className="w-full h-full flex flex-col items-start justify-end gap-[1.7vw]">
          <div className="w-full flex flex-col xl:flex-row gap-5 sm:gap-10 xl:gap-[9vw] text-primary pointer-events-none select-none overflow-hidden">
            <h1 className="heading-text whitespace-nowrap leading-[1]">
              <m.span
                initial={{ x: 50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0 }}
                className="block"
              >
                Execution
              </m.span>
              <m.span
                initial={{ x: 50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="block"
              >
                Without Gaps.
              </m.span>
            </h1>

            <p className="text-lg lg:text-[1.7vw] xl:self-end leading-[1.1] mb-5 whitespace-nowrap">
              <m.span
                initial={{ x: 50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="block"
              >
                We&apos;re a launch authority firm with
              </m.span>
              <m.span
                initial={{ x: 50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="block"
              >
                an end-to-end approach.
              </m.span>
            </p>
          </div>

          <m.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full px-2 md:px-4"
          >
            <div className="relative w-full flex items-center justify-between gap-5 pt-3 lg:pt-[1.6vw] pb-3 lg:pb-[0.2vw] uppercase link-text border-t border-primary/30 font-LazareGrotesk">
              <CornerDecorators variant="top" className="border-white" />
              <span className="text-xs lg:text-[0.8vw] tracking-tight pointer-events-none select-none">
                ATH &copy; 2025
              </span>
              <UnderlineText
                className="text-[10px] lg:text-[0.7vw]"
                itemName="Explore"
                href="#about-us"
              >
                <ArrowAnimation />
              </UnderlineText>
            </div>
          </m.div>
        </div>
      </m.div>
    </section>
  );
};
