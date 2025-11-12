import Hls from "hls.js";
import { useEffect, useRef, useState, useCallback } from "react";
import { GrFormClose } from "react-icons/gr";
import mime from "mime-types";

import { hasNativeHLS } from "../../../utils/hasNativeHls";

interface Props {
  src: string;
  poster?: string;
  loop?: boolean;
  muted?: boolean;
  preload?: string;
  controls?: boolean;
  onClose?: () => void;
  isPlaying?: boolean;
}

const VideoPlayer = ({
  src,
  poster,
  loop = false,
  muted = false,
  preload = "none",
  controls = true,
  onClose,
  isPlaying = false,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  const playHls = useCallback(
    (args: {
      video: HTMLVideoElement;
      url: string;
      hlsRef: React.MutableRefObject<Hls | null>;
    }) => {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(args.url);
      hls.attachMedia(args.video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        args.video
          .play()
          .catch((error) => console.error("Error playing video:", error));
      });
    },
    []
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const type = mime.lookup(src) || "";

    if (hasNativeHLS() && type === "application/vnd.apple.mpegurl") {
      video.src = src;
      video.play().catch(() => playHls({ video, url: src, hlsRef }));
    } else if (Hls.isSupported() && type === "application/vnd.apple.mpegurl") {
      playHls({ video, url: src, hlsRef });
    } else if (video.canPlayType(type)) {
      video.src = src;
      video.play().catch((error) => console.log("Error playing video:", error));
    } else {
      console.warn("Unsupported video format for this environment.");
    }

    video.onloadedmetadata = () => {
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src, playHls]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video
        .play()
        .catch((error) => console.error("Error playing video:", error));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const videoStyle =
    videoDimensions.width / videoDimensions.height < 1
      ? { width: "auto", height: "100%", maxHeight: "80vh" }
      : { width: "100%", height: "auto", maxHeight: "80vh" };

  const handleClose = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      onClose?.();
    },
    [onClose]
  );

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center overflow-hidden"
      style={{ maxHeight: "80vh" }}
    >
      <div
        className="relative inline-block"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-0 top-0 z-50 mr-[10px] mt-[10px] rounded-[50%] border border-black bg-white p-[6px]"
          aria-label="Close video"
        >
          <GrFormClose size={24} />
        </button>

        <video
          ref={videoRef}
          loop={loop}
          muted={muted}
          controls={controls}
          poster={poster}
          preload={preload}
          style={videoStyle}
          className="max-h-full"
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
