"use client";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { fragmentShader } from "./shaders/fragments/hexagon.glsl";
import { vertexShader } from "./shaders/vertex.glsl";
import { useIsMobile } from "@/hooks/useIsMobile";

useLoader.preload(TextureLoader, "/env1.png");

export default function ShaderPlane({
  shouldRender,
  footerVisible,
  onBuildProgress,
}: {
  shouldRender: boolean;
  footerVisible: boolean;
  onBuildProgress?: (progress: number) => void;
}) {
  const { viewport, clock, invalidate, size } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef(0);

  const texture = useLoader(TextureLoader, "/env1.png");
  const isMobile = useIsMobile();

  // Uniforms (static ref, only values mutate)
  const uniforms = useRef({
    iResolution: {
      value: new THREE.Vector3(size.width, size.height, 1),
    },
    iChannel0: { value: texture },
    iTime: { value: 0.0 },
    iFrame: { value: 0 },
    iBuildProgress: { value: 0.0 },
    uEnableBlackout: { value: true },
    uFooterMode: { value: false },
    uIsMobile: { value: isMobile },
  });

  useEffect(() => {
    const updateResolution = () => {
      uniforms.current.iResolution.value.set(
        window.innerWidth / 3,
        window.innerHeight / 3,
        1
      );
    };

    updateResolution(); // set on mount
    window.addEventListener("resize", updateResolution);

    return () => window.removeEventListener("resize", updateResolution);
  }, []);

  useEffect(() => {
    uniforms.current.uIsMobile.value = isMobile;
  }, [isMobile]);

  // Pointer tracking (only side-effect we need)
  const mouse = useRef(new THREE.Vector2(0, 0));
  const mouseDelta = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const prevMouse = new THREE.Vector2(0, 0);

    const handlePointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (0.5 - e.clientY / window.innerHeight) * 2; // -1 to 1
      const newMouse = new THREE.Vector2(x, y);

      mouseDelta.current.copy(newMouse).sub(prevMouse);
      mouse.current.copy(newMouse);
      prevMouse.copy(newMouse);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const smoothedVelocity = useRef(0);
  const heroTimeRef = useRef(0);
  const footerTimeRef = useRef(0);
  const buildCompleted = useRef(false);

  // Animate frame
  useFrame((_, delta) => {
    if (!shouldRender || !meshRef.current) return;
    const velocity = Math.max(mouseDelta.current.length() / delta, 0.2);

    // Smooth it with lerp (acts like low-pass filter)
    smoothedVelocity.current = THREE.MathUtils.lerp(
      smoothedVelocity.current,
      velocity,
      0.1
    );

    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const count = pos.count;

    if (!footerVisible && !uniforms.current.uIsMobile.value) {
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const x = pos.array[ix];
        const y = pos.array[ix + 1];

        if (viewport.width > 0 && viewport.height > 0) {
          const dx = x / (viewport.width / 2) - mouse.current.x;
          const dy = y / (viewport.height / 2) - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const influence = Math.exp(-dist * 4.0);

          const newZ = THREE.MathUtils.lerp(
            pos.array[ix + 2],
            smoothedVelocity.current * 0.1 * influence +
              mouse.current.length() * 0.02 * influence,
            0.35
          );

          if (Number.isFinite(newZ)) {
            pos.array[ix + 2] = newZ;
          }
        }
      }

      pos.needsUpdate = true;

      // Decay the raw delta (still needed for velocity calc)
      mouseDelta.current.multiplyScalar(0.98);
    }

    const fakeZone = window.innerHeight * 3.9;
    const maxScroll = fakeZone - window.innerHeight;
    const scrollY = window.scrollY;
    uniforms.current.uEnableBlackout.value =
      !footerVisible && uniforms.current.iBuildProgress.value > 0.01;

    if (footerVisible) {
      // === FOOTER MODE ===
      uniforms.current.uFooterMode.value = true;

      footerTimeRef.current += delta * 0.3;
      uniforms.current.iTime.value = footerTimeRef.current;
      uniforms.current.iBuildProgress.value = 1.0;
    } else if (scrollY <= maxScroll) {
      // === HERO MODE ===
      uniforms.current.uFooterMode.value = false;

      const t = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      const targetTime = t * 13.7;

      heroTimeRef.current = THREE.MathUtils.lerp(
        heroTimeRef.current,
        targetTime,
        0.1
      );

      uniforms.current.iTime.value = heroTimeRef.current;

      if (!buildCompleted.current) {
        const elapsed = clock.getElapsedTime() - startTime.current;
        let tBuild = THREE.MathUtils.clamp(elapsed / 2.5, 0.0, 1.0);
        tBuild = tBuild * tBuild * (3.0 - 2.0 * tBuild); // smoothstep
        uniforms.current.iBuildProgress.value = tBuild;

        if (tBuild >= 1.0) {
          buildCompleted.current = true; // latch at 1.0
        }
      } else {
        uniforms.current.iBuildProgress.value = 1.0;
      }
    } else {
      // === AFTER ZONE === (only when not in footer)
      uniforms.current.iFrame.value = 0.0;
      uniforms.current.uFooterMode.value = false;
      uniforms.current.iBuildProgress.value = 1.0;

      heroTimeRef.current = 13.7;
      uniforms.current.iTime.value = heroTimeRef.current;
    }

    if (onBuildProgress) {
      onBuildProgress(uniforms.current.iBuildProgress.value);
    }
    uniforms.current.iFrame.value++;
    invalidate();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry
        args={[
          viewport.width,
          viewport.height,
          isMobile ? 1 : 10,
          isMobile ? 1 : 10,
        ]}
      />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
