"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { m, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

import ShaderPlane from "./Shader";
import { ScrollText } from "./ScrollText";
import { useIsMobile } from "@/hooks/useIsMobile";

const ShaderAnimation = () => {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [t, setT] = useState(0);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  
  // Values for texts
  const TEXT_CONFIGS = [
    {
      text1: "You",
      opacityStartTime: 0.27,
      opacityStartEndTime: 0.33,
      opacityEndStartTime: 0.83,
      opacityEndTime: 1.1,
    },
    {
      text1: "We",
      opacityStartTime: 1.5,
      opacityStartEndTime: 1.6,
      opacityEndStartTime: 1.75,
      opacityEndTime: 2.0,
    },
  ];

  const start = !footerVisible ? null : scrollY.get();

  const fadeOpacity = useTransform(
    scrollY,
    start !== null ? [start, start + 650] : [0, 1],
    [0, 1]
  );

  useEffect(() => {
    if (footerVisible) return;

    const handleScroll = (y: number) => {
      const viewportHeight = window.innerHeight;
      const fakeZone = viewportHeight * 4.0;
      const maxScroll = fakeZone - viewportHeight;
      const t = maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0;
      setT(t);
      const isHidden = t >= 0.96;
      if (canvasWrapperRef.current) {
        canvasWrapperRef.current.style.opacity = isHidden ? "0" : "1";
      }
      setShouldRender(!isHidden);
    };

    const unsubscribe = scrollY.on("change", handleScroll);
    return () => unsubscribe();
  }, [footerVisible, scrollY]);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFooterVisible(entry.isIntersecting);
          setShouldRender(true);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  // Scroll lock handler
  const handleBuildProgress = (progress: number) => {
    if (progress < 1 && !footerVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  useEffect(() => {
    const gl = rendererRef.current;
    if (!gl) return;

    let width = isMobile ? 400 : 1280;
    let height = isMobile ? 800 : 1000;

    if (t >= 0.9 && t <= 1 && !footerVisible) {
      width = 300;
      height = 300;
    }

    gl.setSize(width, height, false);
  }, [t, footerVisible, isMobile]);

  return (
    <m.div
      ref={canvasWrapperRef}
      style={{
        opacity: footerVisible ? fadeOpacity : 1,
        transition: footerVisible ? undefined : "opacity 0.5s ease-in-out",
      }}
      className={`fixed inset-0 h-full w-full bg-[#151515] will-change-opacity pointer-events-none -z-10`}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          imageRendering: "pixelated",
        }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
          if (isMobile) {
            gl.setSize(400, 800, false);
          } else {
            gl.setSize(1280, 1000, false);
          }
          gl.setPixelRatio(1);
        }}
      >
        <ShaderPlane
          shouldRender={shouldRender}
          footerVisible={footerVisible}
          onBuildProgress={handleBuildProgress}
        />
      </Canvas>

      {/* Texts */}
      {TEXT_CONFIGS.map((cfg, i) => (
        <ScrollText key={i} {...cfg} />
      ))}
    </m.div>
  );
};

export default ShaderAnimation;
