// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function AuthImg({ img }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the desired playback rate here
    }
  }, []);
  return (
    <div className="w-full login-image mb-8">
      <video
        ref={videoRef}
        autoPlay
        muted
        src={img}
        alt=""
        className="md:w-[70%] h-full items-center border-0"
      />
    </div>
  );
}

export default AuthImg;
