"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "../../../utils/cn";
import VideoPlayer from "../video-player";
import { type ImageLikeProps, DefaultImg } from "./TestimonialCarouselSection";

const TESTIMONIAL_CARD_PLAY_BUTTON = "/assets/testimonial-card-play-button.svg";

type TestimonialCarouselVideoPlayerProps = {
  videoUrl: string;
  thumbnailUrl: string;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
};

const TestimonialCarouselVideoPlayer = ({
  videoUrl,
  thumbnailUrl,
  ImageComponent = DefaultImg,
}: TestimonialCarouselVideoPlayerProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsVideoPlaying(false);
    setIsVideoLoaded(false);
  };

  const onCloseVideoPlayer = () => {
    setIsVideoPlaying(false);
    setIsVideoLoaded(false);
  };

  const handlePlayButtonClick = () => {
    setIsVideoPlaying(true);
    setIsVideoLoaded(true);
  };

  return (
    <div className="w-full cursor-pointer" onClick={handlePlayButtonClick}>
      <div className="relative aspect-[4/3] w-full rounded-full">
        <ImageComponent
          className="absolute inset-0 z-10 m-auto"
          src={TESTIMONIAL_CARD_PLAY_BUTTON}
          alt="Testimonial Play Icon"
          width={65}
          height={65}
          priority
        />
        <ImageComponent
          src={thumbnailUrl}
          alt="Video Thumbnail"
          width={500}
          height={500}
          quality={100}
          className="absolute inset-0 h-full w-full rounded-t-md object-fill"
        />
      </div>

      {isVideoLoaded &&
        createPortal(
          <div
            className={cn(
              isVideoPlaying ? "flex" : "hidden",
              "fixed inset-0 z-50 items-center justify-center bg-black/90"
            )}
            onClick={handleOverlayClick}
          >
            <VideoPlayer
              src={videoUrl}
              poster={thumbnailUrl}
              onClose={onCloseVideoPlayer}
              isPlaying={isVideoPlaying}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default TestimonialCarouselVideoPlayer;
