"use client";

import ReactLenis from "lenis/react";
import { LazyMotion, domAnimation } from "framer-motion";

const LenisWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        smoothWheel: true,
        lerp: 0.07,
      }}
    >
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </ReactLenis>
  );
};

export default LenisWrapper;
