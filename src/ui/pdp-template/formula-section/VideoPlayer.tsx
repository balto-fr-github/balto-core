import { useEffect, useRef } from "react";
import Hls from "hls.js";

import { useDetectOS } from "../../../utils/detectOs";

type Props = {
  formulaVideoSrc: string;
};

export default function VideoPlayer(props: Props) {
  const { formulaVideoSrc } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const detectOS = useDetectOS();

    if (!video) {
      return;
    }

    if (detectOS.isIOS) {
      video.src = formulaVideoSrc;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      return;
    }

    if (!Hls.isSupported) {
      video.src = formulaVideoSrc;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      return;
    }

    const hls = new Hls();
    hls.loadSource(formulaVideoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
    });
  }, []);

  return (
    <div>
      <video
        style={{
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="h-[259px] w-[216px] sm:h-[415px] sm:w-[350px] xl:h-[450px] xl:w-full"
        ref={videoRef}
        playsInline
      ></video>
    </div>
  );
}
