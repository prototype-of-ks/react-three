import React, { useRef, useState } from 'react';
import {
  Canvas,
  MeshStandardMaterialProps,
  useFrame,
} from '@react-three/fiber';
import ThreeComponent from './component/three';
import './App.css';

const Box: React.FC = () => {
  const ref = useRef<MeshStandardMaterialProps>();
  const [isHoverd, setIsHoverd] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  useFrame(() => {
    if (ref.current) {
      return (ref.current.rotation.x += 0.01);
    }
  });
  return (
    <mesh
      ref={ref}
      userData={{ hello: 'world' }}
      scale={isClicked ? 1.5 : 1}
      onClick={() => setIsClicked(!isClicked)}
      onPointerOver={() => setIsHoverd(true)}
      onPointerOut={() => setIsHoverd(false)}
    >
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={isHoverd ? 'blue' : 'orange'} />
    </mesh>
  );
};

const Light: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
    </>
  );
};

function App() {
  return (
    <div id="canvas-container">
      {/* <Canvas>
        <Light />
        <Box />
      </Canvas> */}

      <ThreeComponent />
    </div>
  );
}

export default App;
