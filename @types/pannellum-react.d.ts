declare module "pannellum-react" {
    import { ReactNode } from "react";
  
    export interface HotspotProps {
      pitch: number;
      yaw: number;
      tooltip?: string;
      clickHandlerFunc?: () => void;
    }
  
    export interface PannellumProps {
      width: string;
      height: string;
      image: string;
      pitch?: number;
      yaw?: number;
      hfov?: number;
      autoLoad?: boolean;
      showControls?: boolean;
      hotspotDebug?: boolean;
      onLoad?: () => void;
      hotspots?: HotspotProps[];
      children?: ReactNode;
    }
  
    export const Pannellum: React.FC<PannellumProps>;
    export const Hotspot: React.FC<HotspotProps>;
  }
  