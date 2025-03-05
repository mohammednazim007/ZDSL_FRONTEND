// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import { Canvas } from '@react-three/fiber';
// import { CameraControls, useGLTF } from '@react-three/drei';
// import { useRef } from 'react';
// import Hotspot from '@/components/Hotspot';

// const Model = () => {
//   const { scene } = useGLTF('/model/home/scene.gltf');
//   return <primitive object={scene} />;
// };

// const VirtualTour = ({virtualTourLink}: any) => {
//   const virtualTourDynamicData  = virtualTourLink?.data
//   const cameraControlsRef = useRef<any>(null);

//   const moveToPosition = (position: [number, number, number], lookAt: [number, number, number]) => {
//     if (cameraControlsRef.current) {
//       cameraControlsRef.current.setLookAt(
//         position[0], position[1], position[2], // Camera moves to this position
//         lookAt[0], lookAt[1], lookAt[2],       // Camera looks at this position
//         true // Smooth transition
//       );
//     }
//   };


//   console.log('virtualTourDynamicData', virtualTourDynamicData);

//   return (
//     <div className="relative border rounded-md p-4">
//       <div className="h-[500px] w-full">
//         <Canvas>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} />

//           {/* Camera Controls */}
//           <CameraControls ref={cameraControlsRef} />

//           {/* 3D Model */}
//           <Model />

//           {/* Hotspots */}
//           <Hotspot
//             position={[5, 1, 0]}
//             onClick={() => moveToPosition([5, 1, 0], [0, 1, 0])}
//           />
//           <Hotspot
//             position={[10, 1, -5]}
//             onClick={() => moveToPosition([10, 1, -5], [12, 1, -5])}
//           />
//         </Canvas>
//       </div>
//     </div>
//   );
// };

// export default VirtualTour;


// ========================================================================================
// // new code

// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import { useState } from 'react';
// import { Pannellum } from 'pannellum-react';

// const VirtualTour = ({ virtualTourLink }: any) => {
//   const virtualTourDynamicData = virtualTourLink?.data;

//   // Transform the dynamic data into scenes
//   const scenes = virtualTourDynamicData?.map((tour: any) => ({
//     id: tour.id,
//     imageUrl: `${process.env.NEXT_PUBLIC_MEDIA_URL}/${tour.imageUrl}`,
//     title: tour.title ?? 'Untitled Scene',
//     author: tour.author ?? 'Unknown',
//     width: tour.width ?? '100%', // Provide width
//     height: tour.height ?? '500px', // Provide height
//     pitch: tour.pitch ?? 0,
//     yaw: tour.yaw ?? 0,
//     hfov: tour.hfov ?? 100,
//     vaov: tour.vaov ?? null,
//     autoLoad: tour.autoLoad ?? true,
//     compass: tour.compass ?? false,
//     hotspots: tour.hotspots?.map((hotspot: any) => ({
//       pitch: hotspot.pitch ?? 0,
//       yaw: hotspot.yaw ?? 0,
//       text: hotspot.text ?? 'Navigate',
//       targetSceneId: hotspot.targetSceneId ?? null,
//       type: hotspot.type ?? 'custom',
//       createTooltipArgs: hotspot.createTooltipArgs ?? null,
//       url: hotspot.url ?? null,
//     })) ?? [],
//   })) ?? [];

//   console.log('Generated Scenes:', scenes); // Debugging
//   const [currentSceneId, setCurrentSceneId] = useState(scenes[0]?.id || null);

//   const handleHotspotClick = (hotspot: any) => {
//     console.log('Hotspot Clicked:', hotspot);
//     if (hotspot.targetSceneId) {
//       const targetScene = scenes.find((scene: any) => scene.id === hotspot.targetSceneId);
//       if (targetScene) {
//         setCurrentSceneId(targetScene.id);
//         console.log(`Navigating to Scene ${targetScene.id}`);
//       } else {
//         console.error(`No scene found for targetSceneId: ${hotspot.targetSceneId}`);
//       }
//     }
//   };

//   // Get the current scene based on currentSceneId
//   const currentScene = scenes.find((scene: any) => scene.id === currentSceneId);

//   console.log('currentScene', currentScene);

//   return (
//     <div className="relative border rounded-md p-4">
//       {currentScene ? (
//         <div className="relative h-full w-full rounded-md shadow-lg">
//           {/* Pannellum Viewer */}
//           <Pannellum
//             key={currentSceneId} // Ensure re-render on scene change
//             image={currentScene.imageUrl}
//             pitch={currentScene.pitch}
//             yaw={currentScene.yaw}
//             hfov={currentScene.hfov}
//             autoLoad={currentScene.autoLoad}
//             width={currentScene.width} // Add width
//             height={currentScene.height} // Add height
//             onLoad={() => console.log(`Scene Loaded: ${currentScene.title}`)}
//           >
//             {/* Render Hotspots */}
//             {currentScene.hotspots.map((hotspot: any, index: any) => (
//               <Pannellum.Hotspot
//                 key={index}
//                 pitch={hotspot.pitch}
//                 yaw={hotspot.yaw}
//                 type={hotspot.type}
//                 text={hotspot.text}
//                 cssClass="custom-hotspot"
//                 handleClick={() => handleHotspotClick(hotspot)}
//               />
//             ))}
//           </Pannellum>
//         </div>
//       ) : (
//         <p>No scenes available.</p>
//       )}
//     </div>
//   );
// };

// export default VirtualTour;




/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Pannellum } from 'pannellum-react';

const VirtualTour = ({ virtualTourLink }: any) => {
  // const virtualTourDynamicData = virtualTourLink?.data;

  // // Transform the dynamic data into scenes
  // const scenes = virtualTourDynamicData?.map((tour: any) => ({
  //   id: tour.id,
  //   imageUrl: `${process.env.NEXT_PUBLIC_MEDIA_URL}/${tour.imageUrl}`,
  //   title: tour.title ?? 'Untitled Scene',
  //   author: tour.author ?? 'Unknown',
  //   width: tour.width ?? '100%',
  //   height: tour.height ?? '500px',
  //   pitch: tour.pitch ?? 0,
  //   yaw: tour.yaw ?? 0,
  //   hfov: tour.hfov ?? 100,
  //   vaov: tour.vaov ?? null,
  //   autoLoad: tour.autoLoad ?? true,
  //   compass: tour.compass ?? false,
  //   hotspots: tour.hotspots?.map((hotspot: any) => ({
  //     pitch: hotspot.pitch ?? 0,
  //     yaw: hotspot.yaw ?? 0,
  //     text: hotspot.text ?? 'Navigate',
  //     targetSceneId: hotspot.targetSceneId ?? null,
  //     type: hotspot.type ?? 'info',
  //   })) ?? [],
  // })) ?? [];

  // const [currentSceneId, setCurrentSceneId] = useState(scenes[0]?.id || null);

  // const handleHotspotClick = (hotspot: any) => {
  //   console.log('Hotspot Clicked:', hotspot);
  //   if (hotspot.targetSceneId) {
  //     const targetScene = scenes.find((scene: any) => scene.id === hotspot.targetSceneId);
  //     if (targetScene) {
  //       setCurrentSceneId(targetScene.id);
  //       console.log(`Navigating to Scene ${targetScene.id}`);
  //     } else {
  //       console.error(`No scene found for targetSceneId: ${hotspot.targetSceneId}`);
  //     }
  //   }
  // };

  // // Get the current scene based on currentSceneId
  // const currentScene = scenes.find((scene: any) => scene.id === currentSceneId);

  return (
    <div className="relative border rounded-md p-4">
      <h1>3d tour</h1>
      {/* {currentScene ? (
        <div className="relative h-full w-full rounded-md shadow-lg">
          <Pannellum
            key={currentSceneId} // Ensure re-render on scene change
            image={currentScene.imageUrl}
            pitch={currentScene.pitch}
            yaw={currentScene.yaw}
            hfov={currentScene.hfov}
            autoLoad={currentScene.autoLoad}
            width={currentScene.width}
            height={currentScene.height}
            hotspots={currentScene.hotspots.map((hotspot: any) => ({
              pitch: hotspot.pitch,
              yaw: hotspot.yaw,
              text: hotspot.text,
              clickHandlerFunc: () => handleHotspotClick(hotspot),
            }))}
            onLoad={() => console.log(`Scene Loaded: ${currentScene.title}`)}
          />

        </div>
      ) : (
        <p>No scenes available.</p>
      )} */}
    </div>
  );
};

export default VirtualTour;
