import { Text } from "@nextui-org/react";
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

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <Canvas style={{ height: "50vh" }}>
        <Box color="#0072F5" position={[0, 0, 3]} />
        <directionalLight color="#ffffff" intensity={1} position={[-1, 2, 4]} />
      </Canvas>
      <Text size={20}>
        Welcome to{" "}
        <Text
          span
          size={20}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight={"bold"}
        >
          MusicCube
        </Text>
        !
      </Text>
    </div>
  );
};

export default Home;
