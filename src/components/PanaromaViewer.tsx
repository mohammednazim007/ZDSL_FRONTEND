/* eslint-disable import/no-extraneous-dependencies */
import { Pannellum } from "pannellum-react";

const PanoramaViewer = () => {
  return (
    <Pannellum
      width="100%"
      height="500px"
      image="/path-to-your-panorama.jpg"
      pitch={10}
      yaw={180}
      hfov={110}
      autoLoad
      showControls={true}
      hotspotDebug={false}
      onLoad={() => console.log("Panorama Loaded")}
      hotspots={[
        {
          pitch: 10,
          yaw: 120,
          tooltip: "Go to Room",
          clickHandlerFunc: () => console.log("Navigate to Room"),
        },
      ]}
    />
  );
};

export default PanoramaViewer;
