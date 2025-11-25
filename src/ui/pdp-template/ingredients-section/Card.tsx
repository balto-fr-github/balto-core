import { useRef, useState, useEffect } from "react";

import type { BackDesc, IngredientsType, Theme } from "./types";
import { cn } from "../../../utils/cn";
import {
  type ImageLikeProps,
  DefaultImg,
} from "../ingredients-section/IngredientsSection";

type CardProps = {
  colorTheme: Theme;
  content: IngredientsType;
  index: number;
  productName: string;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  plusIcon: string;
  minusIcon: string;
};

const renderBackDesc = (backDesc: BackDesc) => {
  if (backDesc == null) return null;

  if (!Array.isArray(backDesc)) {
    return backDesc;
  }

  return backDesc.map((item, idx) => (
    <p
      key={idx}
      className="font-inter text-[16px] font-normal leading-[140%] tracking-[-0.32px] text-[#525252]"
    >
      {item}
    </p>
  ));
};

export default function Card(props: CardProps) {
  const {
    colorTheme,
    content,
    index,
    productName,
    ImageComponent = DefaultImg,
    plusIcon,
    minusIcon,
  } = props;
  const isDental =
    productName === "complement-hygiene-dentaire" ||
    productName === "complemento-higiene-dental";

  const [progressHeight, setProgressHeight] = useState<number>(0);
  const [isBackCard, setIsBackCard] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const backCardRef = useRef<HTMLDivElement | null>(null);

  const handleFlipCard = () => {
    if (!cardRef.current) {
      return;
    }
    setIsBackCard(!isBackCard);
    cardRef.current.classList.toggle("flip");
  };

  const handleHref = (url: string) => {
    if (url == "#") {
      return;
    }
    window.open(url, "_blank");
  };

  useEffect(() => {
    const handleScrollVertical = (e: Event) => {
      if (!backCardRef.current || !scrollRef.current) {
        return;
      }

      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = backCardRef.current;
      const scrollableHeight = scrollHeight - clientHeight;

      if (scrollableHeight <= 0) {
        setProgressHeight(0);
        return;
      }

      const scrolledPercentage = Math.min(
        100,
        Math.max(0, (scrollTop / scrollableHeight) * 100)
      );
      const maxProgressHeight = scrollRef.current?.clientHeight || 130;
      const calculatedHeight = (scrolledPercentage / 100) * maxProgressHeight;

      setProgressHeight(Math.min(calculatedHeight, maxProgressHeight));
    };
    const divElement = backCardRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", handleScrollVertical);
    }
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScrollVertical);
      }
    };
  }, []);

  return (
    <div className="flipper relative" ref={cardRef} key={index}>
      <div
        style={{ backgroundColor: colorTheme.lightColor }}
        className={cn(
          "front-card h-[270px] w-[300px] min-w-[300px] overflow-hidden rounded-[8px] px-[16px] py-[24px] md:h-[300px] md:w-full lg:h-[220px]"
        )}
      >
        <div className="flex h-full w-full justify-start space-x-[12px] xl:space-x-[16px]">
          <div className="flex h-full w-full max-w-[156px] flex-col justify-between gap-1.5 sm:max-w-none">
            <div
              className={cn(
                "h-full w-full space-y-[9px]",
                isDental && "max-w-[170px] lg:max-w-none"
              )}
            >
              <p
                style={{ color: colorTheme.darkColor }}
                className={cn(
                  "flex items-center gap-2 break-words font-mackinac text-[24px] font-bold leading-[24px]",
                  content.isTitleItalic && "italic"
                )}
              >
                {content.frontTitle}

                {content?.frontTitleImage && (
                  <ImageComponent
                    src={content.frontTitleImage}
                    alt="Balto Ingredient"
                    className="-mt-1"
                    width={84}
                    height={20}
                  />
                )}
              </p>

              <p className="font-inter text-[14px] leading-normal tracking-[-0.02em] text-[#525252] md:text-[16px]">
                {content.frontDesc}
              </p>
            </div>
            <p
              style={{ color: colorTheme.darkColor }}
              className="font-inter text-[14px] font-semibold leading-[normal]"
            >
              {content.frontBouche}
            </p>
          </div>

          <div className="flex h-full w-[100px] flex-col items-end justify-between">
            <div
              className={cn(
                "rounded-[4px] h-[80px] w-[80px] lg:h-[100px] lg:w-[100px]"
              )}
            >
              <ImageComponent
                src={content.frontImage}
                alt={"ingredient one"}
                width={300}
                height={300}
                className={cn("mt-7 md:mt-0")}
              />
            </div>

            <div
              style={{ backgroundColor: colorTheme.middleColor }}
              className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
            >
              <ImageComponent
                src={plusIcon}
                alt={"ingredient one"}
                width={24}
                height={24}
                className="cursor-pointer"
                role="button"
                onClick={() => {
                  handleFlipCard();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: colorTheme.lightColor }}
        className={cn(
          `back-card hide-scrollbar absolute top-0 flex h-[270px] w-[300px] min-w-[300px] flex-row space-x-[16px] overflow-y-scroll  rounded-[8px] px-[16px] py-[24px] md:h-[300px] md:w-full lg:h-[220px]`
        )}
        ref={backCardRef}
      >
        <div className="space-y-[12px]">
          <p className="font-inter text-[18px] font-bold leading-[normal] tracking-[-0.36px] text-[#525252]">
            {content.backTitle}
          </p>

          <div className="space-y-[12px]">
            {renderBackDesc(content.backDesc)}
          </div>
          <p className="font-inter text-[18px] font-bold leading-[normal] tracking-[-0.36px] text-[#525252]">
            {content.backSubTitle}
          </p>
          <div className="space-y-[12px] pb-[12px]">
            {content.hrefLink.map((data, index) => {
              return (
                <p
                  key={index}
                  className={`font-inter text-[16px] font-normal leading-[140%] tracking-[-0.32px] text-[#525252] ${
                    data.href == "#" ? "" : "cursor-pointer"
                  } italic underline`}
                  onClick={() => handleHref(data.href)}
                >
                  {data.text}
                </p>
              );
            })}
          </div>
        </div>
        <div className="sticky top-0 flex flex-col items-center space-y-[16px]">
          <div
            style={{
              color: colorTheme.darkColor,
              backgroundColor: colorTheme.middleColor,
            }}
            className="flex h-[36px] min-h-[36px] w-[36px] min-w-[36px] items-center justify-center rounded-full"
          >
            <ImageComponent
              src={minusIcon}
              alt={"ingredient one"}
              width={24}
              height={24}
              className="cursor-pointer"
              role="button"
              onClick={() => {
                handleFlipCard();
              }}
            />
          </div>

          <div
            className="h-[130px] w-[8px] rounded-[100px] bg-[#E5E5E5]"
            ref={scrollRef}
          >
            <div
              style={{ height: `${progressHeight}px` }}
              className="max-h-full rounded-[100px] bg-[#A3A3A3]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
