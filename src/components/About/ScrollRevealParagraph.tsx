"use client";
import { m, useTransform, MotionValue } from "framer-motion";
import React from "react";

interface ScrollRevealParagraphProps {
  lines: string[];
  progress: MotionValue<number>; // framer-motion MotionValue for scroll progress
  start?: number; // when the first line starts revealing (0–1)
  step?: number; // delay between each line's reveal
}

interface LineProps {
  line: string;
  index: number;
  progress: MotionValue<number>;
  start: number;
  step: number;
}

const ScrollRevealLine: React.FC<LineProps> = ({
  line,
  index,
  progress,
  start,
  step,
}) => {
  const opacity = useTransform(
    progress,
    [start + step * index, start + step * (index + 1)],
    [0, 1]
  );

  return <m.span style={{ opacity }}>{line} </m.span>;
};

const ScrollRevealParagraph: React.FC<ScrollRevealParagraphProps> = ({
  lines,
  progress,
  start = 0.2,
  step = 0.07,
}) => {
  return (
    <p className="lg:text-[1.0vw] leading-[1.3] w-[95%] sm:w-[90%] lg:w-[33vw] tracking-wide whitespace-pre-wrap font-space-mono">
      {lines.map((line, i) => (
        <ScrollRevealLine
          key={i}
          line={line}
          index={i}
          progress={progress}
          start={start}
          step={step}
        />
      ))}
    </p>
  );
};

export default ScrollRevealParagraph;
