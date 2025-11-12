import "swiper/css";
import "swiper/css/pagination";

import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";

import { cn } from "../../../utils/cn";
import TestimonialCarouselCard from "./TestimonialCarouselCard";
import {
  type ImageLikeProps,
  type TestimonialItem,
  DefaultImg,
} from "./TestimonialCarouselSection";

type TestimonialCarouselSwiperProps = {
  testimonials: TestimonialItem[];
  ImageComponent?: React.ComponentType<ImageLikeProps>;
};

const TestimonialCarouselSwiper = ({
  testimonials,
  ImageComponent = DefaultImg,
}: TestimonialCarouselSwiperProps) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const isDesktopXL = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  const isCenteredSlide = testimonials.length > 5;

  const getSlidesPerView = () => {
    if (isDesktopXL) return isCenteredSlide ? 3.3 : 3;
    if (isTablet) return 2;
    return isCenteredSlide ? 1.3 : 1;
  };

  const slidesPerView = getSlidesPerView();

  const shouldLoop = !(
    slidesPerView > 1 && testimonials.length === Math.ceil(slidesPerView) + 1
  );

  const updateSlideStates = () => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const slidePrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };
  const slideNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const renderArrow = (direction: "left" | "right", onClick: () => void) => {
    const isDisabled =
      !shouldLoop &&
      ((direction === "left" && isBeginning) ||
        (direction === "right" && isEnd));

    return (
      <ImageComponent
        src={"/assets/slider-arrow-left-2.svg"}
        width={38}
        height={38}
        alt={`carousel ${direction} arrow icon`}
        loading="lazy"
        className={cn(
          "absolute bottom-0 top-0 z-20 my-auto hidden cursor-pointer transition-opacity",
          direction === "left"
            ? "left-0 -translate-x-1/2 pb-10"
            : "right-0 translate-x-1/2 rotate-180 pt-10",
          testimonials.length > 2 && "md:block",
          testimonials.length > 3 ? "xl:block" : "xl:hidden",
          isDisabled && "pointer-events-none opacity-40"
        )}
        onClick={!isDisabled ? onClick : undefined}
      />
    );
  };

  return (
    <>
      <div className="relative w-full">
        {renderArrow("left", slidePrev)}

        <Swiper
          spaceBetween={24}
          slidesPerView={3}
          ref={swiperRef}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: isCenteredSlide ? 1.3 : 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: isCenteredSlide ? 3.3 : 3 },
          }}
          loop={shouldLoop}
          onSlideChange={updateSlideStates}
          onAfterInit={updateSlideStates}
          className={cn(
            "testimonial-carousel-swiper",
            testimonials.length <= 3 && "!pb-10"
          )}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.title}
              className="testimonial-carousel-swiper-slide flex items-stretch"
            >
              <TestimonialCarouselCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        {renderArrow("right", slideNext)}
      </div>
    </>
  );
};

export default TestimonialCarouselSwiper;
