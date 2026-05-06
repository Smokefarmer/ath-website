"use client";
import { useState, useEffect } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Logo } from "../Logo";
import ScrollRevealParagraph from "./ScrollRevealParagraph";

const About = () => {
  const { scrollY } = useScroll();

  const [vh, setVh] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setVh(window.innerHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollStart = vh * 2.1;
  const scrollEnd = vh * 3.0;

  const progress = useTransform(scrollY, [scrollStart, scrollEnd], [0, 1]);
  const easedProgress = useTransform(progress, (p) => Math.pow(p, 1.2));

  const clipPath = useTransform(easedProgress, (p) => {
    const radiusVh = p * 180;
    return `circle(${radiusVh}vh at 50% 51%)`;
  });

  const containerY = useTransform(easedProgress, [0.15, 0.8], ["37%", "0%"]);
  const textOpacity = useTransform(easedProgress, [0.26, 0.4], [0, 1]);

  return (
    <section
      id="about-us"
      className={`relative w-full bg-transparent h-[235vh] opacity-0 scroll-mt-[-135vh] will-change-[opacity] ${
        scrollStart ? "opacity-100" : ""
      }`}
    >
      <m.div
        className="sticky top-0 min-h-screen w-full flex gap-16 items-center justify-center"
        style={{ clipPath, willChange: "clip-path" }}
      >
        <m.div
          className="w-full h-full flex flex-col items-center text-center justify-center gap-3 max-w-2xl mx-auto"
          style={{ y: containerY }}
        >
          <m.div>
            <Logo className="size-24 lg:size-[7.3vw]" fill="#A8FF07" />
          </m.div>

          <m.h4
            className="text-2xl lg:text-[1.6vw] tracking-tight text-primary mt-5"
            style={{ opacity: textOpacity }}
          >
            Where our name comes from
          </m.h4>

          <ScrollRevealParagraph
            lines={[
              "All-time highs represent moments when the market recognizes",
              "strength. But a single high means little if it is not followed by",
              "another. That is why our focus is on architecture, not stunts.",
            ]}
            progress={easedProgress}
            start={0.35}
            step={0.07}
          />

          <ScrollRevealParagraph
            lines={[
              "We build frameworks so projects can achieve credibility in their",
              "first high, and maintain momentum for the next. ATH stands for the",
              "discipline that makes higher highs possible.",
            ]}
            progress={easedProgress}
            start={0.6}
            step={0.07}
          />
        </m.div>
      </m.div>
    </section>
  );
};

export default About;
