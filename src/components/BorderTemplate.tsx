"use client";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import CornerDecorators from "./CornerDecorators";

export const BorderTemplate = ({
  children,
  className,
  isFooter,
}: {
  children: React.ReactNode;
  className?: string;
  isFooter?: boolean;
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elRef, {
    once: false,
  });

  const revealY = ["top-0 origin-top", "bottom-0 origin-bottom"];

  return (
    <div ref={elRef} className="relative w-full h-full">
      <m.div
        className="custom-line top-0 origin-left border-t border-white/25 will-change-transform"
        initial={{ y: "50%", scaleX: 0 }}
        animate={isInView ? { y: "0%", scaleX: 1 } : { y: "50%", scaleX: 0 }}
        transition={{
          scaleX: { duration: 0.5, ease: "easeInOut" },
          y: { delay: 0.8, duration: 0.7, ease: "easeOut" },
        }}
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
          className="will-change-[opacity]"
        >
          <CornerDecorators variant="top" className="border-primary" />
        </m.div>
      </m.div>

      <m.div
        className="origin-left custom-line bottom-0 border-b border-white/25 will-change-transform"
        initial={{ y: "-50%", scaleX: 0 }}
        animate={isInView ? { y: "0%", scaleX: 1 } : { y: "-50%", scaleX: 0 }}
        transition={{
          scaleX: { duration: 0.5, ease: "easeInOut" },
          y: { delay: 0.8, duration: 0.7, ease: "easeOut" },
        }}
      >
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: "easeInOut" }}
          className="will-change-[opacity]"
        >
          <CornerDecorators variant="bottom" className="border-primary" />
        </m.div>
      </m.div>

      <m.div
        className={`${className} relative ${
          isFooter
            ? "will-change-[transform,opacity,clip-path]"
            : "will-change-[transform,opacity]"
        }`}
        initial={
          isFooter
            ? {
                opacity: 0,
                y: 10,
                clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
              }
            : { opacity: 0, y: 10 }
        }
        animate={
          isInView
            ? isFooter
              ? {
                  opacity: 1,
                  y: 0,
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }
              : { opacity: 1, y: 0 }
            : isFooter
            ? {
                opacity: 0,
                y: 10,
                clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
              }
            : { opacity: 0, y: 10 }
        }
        transition={{
          clipPath: { delay: 0.8, duration: 0.7, ease: "easeInOut" },
          opacity: { delay: 0.8, duration: 1.2, ease: "easeOut" },
          y: { delay: 0.8, duration: 0.8, ease: "easeOut" },
        }}
      >
        {!isFooter &&
          revealY.map((reveal, idx) => {
            return (
              <m.div
                key={idx}
                initial={{ scaleY: 1 }}
                animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
                className={`h-[50%] w-full absolute right-0 left-0 bg-[#151515] will-change-transform z-10 ${reveal}`}
              />
            );
          })}
        {children}
      </m.div>
    </div>
  );
};
