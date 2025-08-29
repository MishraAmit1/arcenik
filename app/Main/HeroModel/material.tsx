// @ts-nocheck
import { useTexture } from "@react-three/drei";
import { MeshMatcapMaterialProps } from "@react-three/fiber";
import { forwardRef, useMemo } from "react";
import { MeshMatcapMaterial } from "three";
import React from "react";

export const CustomMaterial = forwardRef<
  MeshMatcapMaterial,
  MeshMatcapMaterialProps
>((props, ref) => {
  // Load texture without optimization (simpler)
  const texture = useTexture("/images/1.jpeg");

  // Memoize material props
  const materialProps = useMemo(() => ({
    ...props,
    matcap: texture,
  }), [props, texture]);

  return (
    <meshMatcapMaterial
      {...materialProps}
      ref={ref}
    />
  );
});

CustomMaterial.displayName = "CustomMaterial";