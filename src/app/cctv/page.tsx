import VideoPlayer from "@/components/streaming/VideoPlayer";

const CameraPage = () => {
  return (
    <div>
      <h1>Live Camera Feed</h1>
      {/* <VideoPlayer streamUrl="rtsp://admin:admin123@103.121.216.70:80/cam/realmonitor?channel=1&subtype=0" /> */}
      <div><iframe width="640" height="480" src="https://rtsp.me/embed/AbfFDDNN/" frameBorder="0" allowFullScreen></iframe></div>
    </div>
  );
};

export default CameraPage;