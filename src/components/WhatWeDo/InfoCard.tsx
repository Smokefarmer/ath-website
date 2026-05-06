"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";

type InfoCardProps = {
  cardNo: number;
  title: string;
  description: string;
};

export const InfoCard = ({ cardNo, title, description }: InfoCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
  });

  return (
    <div
      ref={ref}
      className="max-w-xl w-full flex max-lg:flex-col justify-start items-start gap-2 lg:gap-5 font-space-mono"
    >
      <m.span
        initial={{ x: 80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
        transition={{ duration: 1 }}
        className="will-change-[transform,opacity]"
      >
        0{cardNo}.
      </m.span>

      <div className="flex flex-col items-start gap-5 lg:gap-7">
        <m.h3
          className="text-4xl md:text-5xl lg:text-[56px] text-primary font-magnetik leading-[1] will-change-[transform,opacity]"
          initial={{ x: 80, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {title}.
        </m.h3>

        <m.p
          className="para-text font-light leading-[1.3] tracking-wide will-change-[transform,opacity]"
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{
            delay: 0.2,
            duration: 1,
          }}
        >
          {description}.
        </m.p>
      </div>
    </div>
  );
};
