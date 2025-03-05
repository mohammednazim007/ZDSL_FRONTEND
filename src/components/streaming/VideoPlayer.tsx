/* eslint-disable import/no-extraneous-dependencies */
"use client"
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  streamUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = streamUrl;
      }
    }
  }, [streamUrl]);

  return <video ref={videoRef} controls style={{ width: '100%' }} />;
};

export default VideoPlayer;
