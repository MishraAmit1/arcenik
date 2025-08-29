// @ts-nocheck
import { Center, Instance, Instances } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { CustomMaterial } from "./material";
import React from "react";

const radius = 3;
const count = 8;

// Memoize geometry to prevent recreation
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 64);

function Item(props: GroupProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      // Use delta for frame-rate independent animation
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.5;
      ref.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group {...props}>
      <group ref={ref} rotation={[0, Math.PI / count, Math.PI / 2]}>
        <Instance />
      </group>
    </group>
  );
}

export const Item3 = React.memo(() => {
  const groupRef = useRef<THREE.Group>(null!);

  // Memoize positions to prevent recalculation
  const positions = useMemo(() =>
    Array.from({ length: count }).map((_, index) => [
      radius * Math.cos((index * 2 * Math.PI) / count + Math.PI / 4),
      radius * Math.sin((index * 2 * Math.PI) / count + Math.PI / 4),
      0,
    ]), []);

  const rotations = useMemo(() =>
    Array.from({ length: count }).map((_, index) => [
      0, 0, (index * 2 * Math.PI) / count
    ]), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z -= delta * 0.5;
    }
  });

  return (
    <Center>
      <group>
        <group scale={0.6} ref={groupRef}>
          <Instances geometry={cylinderGeometry}>
            <CustomMaterial />
            {positions.map((position, index) => (
              <Item
                position={position}
                rotation={rotations[index]}
                key={index}
              />
            ))}
          </Instances>
        </group>
      </group>
    </Center>
  );
});

Item3.displayName = "Item3";