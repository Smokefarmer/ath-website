"use client";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { fragmentShader } from "./shaders/fragments/footer.glsl";
import { vertexShader } from "./shaders/vertex.glsl";

useLoader.preload(TextureLoader, "/env1.png");

export default function FooterShaderPlane({
  shouldRender,
  footerVisible,
}: {
  shouldRender: boolean;
  footerVisible: boolean;
}) {
  const { viewport, invalidate, size } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(TextureLoader, "/env1.png");

  const uniforms = useRef({
    iResolution: {
      value: new THREE.Vector3(size.width, size.height, 1),
    },
    iChannel0: { value: texture },
    iTime: { value: 0.0 },
    iFrame: { value: 0 },
  });

  useFrame((_, delta) => {
    if (!shouldRender || !meshRef.current) return;
    if (footerVisible) {
      uniforms.current.iTime.value += delta * 0.3;
      invalidate();
    }
    uniforms.current.iFrame.value++;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height, 10, 10]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
