"use client";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

type ScrollTextProps = {
  text1: string;
  text2?: string;
  opacityStartTime: number;
  opacityStartEndTime: number;
  opacityEndStartTime: number;
  opacityEndTime: number;
};

export const ScrollText = ({
  text1,
  text2 = "jump",
  opacityStartTime,
  opacityStartEndTime,
  opacityEndStartTime,
  opacityEndTime,
}: ScrollTextProps) => {
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

  // Opacity transforms
  const textOpacity1 = useTransform(
    scrollY,
    [
      vh * opacityStartTime,
      vh * opacityStartEndTime,
      vh * opacityEndStartTime,
      vh * opacityEndTime,
    ],
    [0, 1, 1, 0]
  );

  const textOpacity2 = useTransform(
    scrollY,
    [
      vh * opacityStartTime + 0.02,
      vh * opacityStartEndTime,
      vh * opacityEndStartTime,
      vh * opacityEndTime - 0.03,
    ],
    [0, 1, 1, 0]
  );

  // Position transforms
  const textX1Raw = useTransform(
    scrollY,
    [
      vh * opacityStartTime,
      vh * opacityStartEndTime + 0.2,
      vh * opacityEndStartTime - 0.02,
      vh * opacityEndTime,
    ],
    [-48, 0, 0, 80]
  );

  const textX2Raw = useTransform(
    scrollY,
    [
      vh * opacityStartTime + 0.01,
      vh * opacityStartEndTime + 0.2,
      vh * opacityEndStartTime - 0.02,
      vh * opacityEndTime,
    ],
    [-50, 0, 0, 80]
  );

  const round = (value: number) => Math.round(value);

  const textX1Rounded = useTransform(textX1Raw, (v) => round(v));
  const textX2Rounded = useTransform(textX2Raw, (v) => round(v));

  const textX1 = useSpring(textX1Rounded, { stiffness: 120, damping: 25 });
  const textX2 = useSpring(textX2Rounded, { stiffness: 120, damping: 25 });

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 h-full w-full text-primary text-[3.5rem] sm:text-[4rem] md:text-[4.5rem] xl:text-[5.7rem] -translate-y-10 tracking-tight pointer-events-none">
      <m.div
        initial={{ opacity: 0, x: -48 }}
        style={{
          opacity: textOpacity1,
          x: textX1,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <span>{text1}</span>
      </m.div>
      <m.div
        initial={{ opacity: 0, x: 50 }}
        style={{
          opacity: textOpacity2,
          x: textX2,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <span>{text2}...</span>
      </m.div>
    </div>
  );
};
