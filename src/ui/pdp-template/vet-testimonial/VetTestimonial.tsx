import React, { memo, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { cn } from "../../../utils/cn";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

export type VetTestimonialTheme = {
  middleColor: string;
};

export type VetTestimonialImage = {
  imageSrc: string;
  imageAlt: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
};

type ClassNames = Partial<{
  root: string;
  container: string;
  card: string;
  textWrapper: string;
  image: string;
}>;

export type VetTestimonialProps = {
  colorTheme: VetTestimonialTheme;
  content: React.ReactNode;
  image: VetTestimonialImage;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  classNames?: ClassNames;
  desktopMinWidthPx?: number;
  desktopBackground?: string;
};

const DefaultImg: React.FC<ImageLikeProps> = (props) => <img {...props} />;

const VetTestimonial = memo(function VetTestimonial({
  colorTheme,
  content,
  image,
  ImageComponent = DefaultImg,
  classNames,
  desktopMinWidthPx = 768,
  desktopBackground = "white",
}: VetTestimonialProps) {
  const isDesktop = useMediaQuery({
    query: `(min-width: ${desktopMinWidthPx}px)`,
  });

  const [bg, setBg] = useState<string | undefined>(undefined);

  useEffect(() => {
    setBg(isDesktop ? desktopBackground : colorTheme.middleColor);
  }, [isDesktop, desktopBackground, colorTheme.middleColor]);

  return (
    <div
      className={cn("w-full", classNames?.root)}
      style={bg ? { backgroundColor: bg } : undefined}
      data-test="pdp-expert-endorsement"
    >
      <div
        className={cn(
          "container mx-auto px-4 pt-8 md:px-[32px] md:py-[40px] xl:px-[32px] xl:py-[60px]",
          classNames?.container
        )}
      >
        <div
          className={cn(
            "relative flex h-full w-full flex-col items-center justify-end gap-[80px] rounded-xl md:flex-row md:p-[40px] xl:px-[80px] xl:py-[40px]",
            classNames?.card
          )}
          style={{ backgroundColor: colorTheme.middleColor }}
        >
          <div
            className={cn(
              "md:w-[65%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%]",
              classNames?.textWrapper
            )}
          >
            <div className="flex flex-col space-y-4">{content}</div>
          </div>

          <ImageComponent
            src={image.imageSrc}
            alt={image.imageAlt}
            width={image.width ?? 2500}
            height={image.height ?? 2500}
            className={cn(
              "w-[350px] sm:bottom-0 md:absolute md:left-0 md:w-[250px] lg:left-10 xl:bottom-0 xl:left-5 xl:w-[450px] 2xl:bottom-0 2xl:left-16",
              classNames?.image
            )}
            {...image}
          />
        </div>
      </div>
    </div>
  );
});

export default VetTestimonial;
