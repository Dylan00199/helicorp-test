import { useRef, useState } from "react";
import { Text3D, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * Ported from the provided reference (HeliCorpText.tsx / Scene.tsx):
 * extruded "HELICORP" wordmark, glossy near-black metal material, slow
 * continuous rotation. Two adaptations from the original:
 *
 *  - `font` points at `/fonts/helvetiker_bold.typeface.json` (self-hosted,
 *    downloaded from three.js's own repo -- MIT-style license included
 *    alongside it in public/fonts/) instead of fetching from threejs.org
 *    at runtime. Same font, no external CDN dependency.
 *  - Rotation is gated on `autoRotate` (reduced-motion aware), same as the
 *    original's toggle -- just defaulted from `usePrefersReducedMotion`
 *    instead of a manual UI toggle, since this is embedded in a page
 *    rather than being the standalone viewer app it shipped in.
 */
export function HeliCorpText({ autoRotate }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!groupRef.current || !autoRotate) return;
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={1.1}
          height={0.55}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.035}
          bevelOffset={0}
          bevelSegments={8}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          HELICORP
          <meshStandardMaterial
            color={hovered ? "#ffffff" : "#ffffff"}
            metalness={0.95}
            roughness={0.08}
            envMapIntensity={2.0}
          />
        </Text3D>
      </Center>
    </group>
  );
}
