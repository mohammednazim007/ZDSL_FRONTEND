// /* eslint-disable import/prefer-default-export */
// /* eslint-disable react-hooks/rules-of-hooks */

// import { useThree } from '@react-three/fiber';

// export const Hotspot = ({ position, cameraPosition }: { position: [number, number, number]; cameraPosition: [number, number, number] }) => {
//     const moveCamera = () => {
//       const { camera } = useThree();
//       camera.position.set(...cameraPosition);
//     };
  
//     return (
//       <mesh position={position} onClick={moveCamera}>
//         <sphereGeometry args={[0.1, 32, 32]} />
//         <meshStandardMaterial color="red" />
//       </mesh>
//     );
//   };
  


import { Html } from '@react-three/drei';

interface HotspotProps {
  position: [number, number, number];
  onClick: () => void;
}

const Hotspot = ({ position, onClick }: HotspotProps) => {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
      <Html position={[0, 0.5, 0]}>
        <div className="bg-white text-black p-1 rounded shadow cursor-pointer">Go</div>
      </Html>
    </mesh>
  );
};

export default Hotspot;

