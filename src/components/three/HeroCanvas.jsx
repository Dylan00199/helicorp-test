import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { HeliCorpText } from './HeliCorpText'

/**
 * Ported from the provided reference project's Scene.tsx, adapted to run
 * embedded inside a normal scrolling page rather than as a dedicated
 * full-viewport viewer:
 *
 *  - `enableZoom` is off. The reference app used the whole viewport as the
 *    canvas with nothing to scroll past, so "scroll to zoom" made sense.
 *    Here the canvas sits inside a normal page users need to scroll past,
 *    so the wheel needs to keep scrolling the page (via Lenis), not zoom
 *    the camera.
 *  - Dark theme only (no light/dark toggle) -- fits the site's black &
 *    white direction and the near-black glossy material.
 *  - `<Environment preset="night">` still fetches an HDRI from drei's CDN
 *    at runtime, same as the reference did -- the one remaining external
 *    dependency here (see README).
 */
export function HeroCanvas({ autoRotate }) {
  const bgColor = '#0a0a0a'

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 2, 8], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: bgColor }}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={[bgColor, 15, 40]} />

      <ambientLight intensity={0.15} color="#ffffff" />
      <spotLight
        position={[0, 8, 5]}
        intensity={30}
        angle={0.35}
        penumbra={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-6, 3, 2]} intensity={8} color="#c8d8ff" />
      <spotLight position={[5, 5, -4]} intensity={25} angle={0.4} penumbra={0.6} color="#ffffff" />
      <pointLight position={[0, -1.5, 2]} intensity={3} color="#334466" />
      <spotLight position={[-8, 6, -2]} intensity={15} angle={0.3} penumbra={0.8} color="#ffffff" />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <HeliCorpText autoRotate={autoRotate} />

        <ContactShadows position={[0, -1.0, 0]} opacity={0.5} scale={18} blur={2.5} far={4} color="#000000" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.05} />
        </mesh>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.1}
        dampingFactor={0.05}
        enableDamping
      />
    </Canvas>
  )
}
