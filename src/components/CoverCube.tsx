import { Canvas, MeshProps, useFrame } from "@react-three/fiber";

import { useRef } from "react";

const Box: React.FC<MeshProps> = ({ position, color }) => {
  const ref = useRef<MeshProps>();
  useFrame(() => (ref.current!.rotation.x = ref.current!.rotation.y += 0.01));

  return (
    <mesh position={position} ref={ref}>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshPhongMaterial color={color} attach="material" />
    </mesh>
  );
};

const CoverCube = () => {
  return (
    <Canvas>
      <Box color="#0072F5" position={[0, 0, 3]} />
      <directionalLight color="#ffffff" intensity={1} position={[-1, 2, 4]} />
    </Canvas>
  );
};

export default CoverCube;
