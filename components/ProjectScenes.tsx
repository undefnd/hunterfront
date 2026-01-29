
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment, Float, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Defining intrinsic R3F elements as constants to bypass JSX namespace errors
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const Color = 'color' as any;

const ParticleField = () => {
  const ref = useRef<any>(null);
  
  // Create random particles
  const particles = useMemo(() => {
    const temp = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 20;
      temp[i3 + 1] = (Math.random() - 0.5) * 20;
      temp[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.05;
      ref.current.rotation.z = t * 0.02;
      
      // Gentle mouse interaction
      const targetX = state.mouse.x * 0.2;
      const targetY = state.mouse.y * 0.2;
      ref.current.position.x += (targetX - ref.current.position.x) * 0.1;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const NeuralCore = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      mesh.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime()) * 0.05);
    }
  });

  return (
    <Sphere ref={mesh} args={[2, 64, 64]}>
      <MeshStandardMaterial 
        color="#4338ca" 
        wireframe 
        transparent 
        opacity={0.15} 
        emissive="#6366f1"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Color attach="background" args={['#020617']} />
        <AmbientLight intensity={0.5} />
        <PointLight position={[10, 10, 10]} intensity={2} color="#6366f1" />
        <PointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        
        <ParticleField />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <NeuralCore />
        </Float>

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};
