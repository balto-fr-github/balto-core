import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { createPortal } from "react-dom";

import Card from "./Card";
import { IngredientsType, Theme } from "./types";
import { checkProductWithoutDosageText } from "./utils";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

export type SectionTexts = {
  title: string;
  subtitle?: string;
  dosageText?: string;
  viewMoreText?: string;
  viewLessText?: string;
  viewFullIngredientsText?: string;
};

export type ModalImage = {
  src: string;
  alt: string;
};

export type IngredientsSectionProps = {
  colorTheme: Theme;
  productName: string;
  cardContent: IngredientsType[];
  texts: SectionTexts;
  progressBarColor?: string;
  modalImage: ModalImage;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  plusIcon: string;
  minusIcon: string;
};

export const DefaultImg: React.FC<ImageLikeProps> = (p) => <img {...p} />;

const IngredientsSection = ({
  colorTheme,
  productName,
  cardContent,
  texts,
  progressBarColor,
  modalImage,
  ImageComponent = DefaultImg,
  plusIcon,
  minusIcon,
}: IngredientsSectionProps) => {
  const [content, setContent] = useState<IngredientsType[]>([]);
  const [progressWidth, setProgressWidth] = useState<number>(0);
  const [showFullIngredients, setShowFullIngredients] = useState(false);
  const [toggleViewAllData, setToggleViewAllData] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const [showDosageText, setShowDosageText] = useState(false);
  const isProductWithoutDosageText = checkProductWithoutDosageText(productName);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const isXlUp = useMediaQuery({ query: "(min-width: 1280px)" });
  const isBelowXl = useMediaQuery({ query: "(max-width:1279px)" });
  const isBelowMd = useMediaQuery({ query: "(max-width:767px)" });

  const getInitialCount = () => {
    let total = 6;

    if (isBelowMd) {
      total = cardContent.length;
    } else if (isBelowXl) {
      total = 4;
    }

    return total;
  };

  const initialSlice = useMemo(() => {
    const n = getInitialCount();

    return cardContent.slice(0, n);
  }, [isBelowMd, isBelowXl, isXlUp, cardContent]);

  useEffect(() => {
    if (isXlUp && cardContent.length === 6) {
      setShowButton(false);
      setShowDosageText(true);
    } else if (isBelowXl && cardContent.length === 4) {
      setShowButton(false);
      setShowDosageText(true);
    } else {
      setShowButton(true);
    }
    setContent(initialSlice);
  }, [isXlUp, isBelowXl, isBelowMd, cardContent.length, initialSlice]);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || !progressRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = cardRef.current;
      const scrollableWidth = Math.max(1, scrollWidth - clientWidth);
      const scrolledPercentage = (scrollLeft / scrollableWidth) * 100;
      setProgressWidth(
        (scrolledPercentage / 100) * progressRef.current.clientWidth
      );
    };

    // Initialize progress width for mobile
    if (isBelowMd && progressRef.current) {
      setProgressWidth(0);
    }

    const el = cardRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [isBelowMd]);

  const viewMoreData = () => {
    setToggleViewAllData(true);
    setShowDosageText(true);
    setContent(cardContent);
  };

  const viewLessData = () => {
    setToggleViewAllData(false);
    setShowDosageText(false);
    setContent(initialSlice);
  };

  const renderButton = () => {
    if (!showButton) return null;
    return toggleViewAllData ? (
      <button
        onClick={viewLessData}
        className="hidden rounded-[4px] border border-white px-[12px] py-[8px] text-center font-inter text-[14px] font-medium leading-normal text-white sm:px-[16px] sm:py-[14px] md:block xl:px-[32px] xl:py-[16px] xl:text-[18px] xl:font-semibold"
        data-test="pdp-ingredients-show-less"
        data-desc="Show fewer ingredients"
      >
        {texts.viewLessText}
      </button>
    ) : (
      <button
        onClick={viewMoreData}
        className="hidden rounded-[4px] border border-white px-[12px] py-[8px] text-center font-inter text-[14px] font-medium leading-normal text-white sm:px-[16px] sm:py-[14px] md:block xl:px-[32px] xl:py-[16px] xl:text-[18px] xl:font-semibold"
        data-test="pdp-ingredients-show-more"
        data-desc="Show more ingredients"
      >
        {texts.viewMoreText}
      </button>
    );
  };

  return (
    <div
      style={{ backgroundColor: colorTheme.darkColor }}
      className="h-full w-full"
      id="ingredients-section"
      data-test="pdp-ingredients"
      data-desc="Main ingredients section"
    >
      <div className="container mx-auto px-[16px] py-[32px] sm:px-[32px] sm:py-[40px] xl:px-[32px] xl:py-[60px]">
        <div className="space-y-[16px]">
          <p
            className="text-center font-mackinac text-[33px] leading-none tracking-[-0.02em] text-white sm:text-[40px] sm:leading-[40px] sm:tracking-[-0.8px] xl:text-[48px] xl:leading-[48px] xl:tracking-[-0.96px]"
            dangerouslySetInnerHTML={{
              __html: texts.title ?? "",
            }}
            data-test="pdp-ingredients-title"
            data-desc="pdp ingredients - title"
          />

          <p
            className="whitespace-pre-line text-center font-inter text-[16px] leading-none text-white xl:text-[18px]"
            data-test="pdp-ingredients-subtitle"
            data-desc="pdp ingredients - subtitle"
          >
            {texts.subtitle}
          </p>
        </div>

        <div
          ref={cardRef}
          className="hide-scrollbar mt-[32px] flex h-full space-x-[24px] overflow-x-scroll sm:mt-[40px] sm:grid-cols-2 md:grid md:gap-[16px] md:space-x-0 xl:grid-cols-3 xl:gap-[24px]"
          data-test="pdp-ingredients-list"
          data-desc="pdp ingredients - list container"
        >
          {content.map((data, index) => {
            return (
              <Card
                key={index}
                colorTheme={colorTheme}
                content={data}
                index={index}
                productName={productName}
                ImageComponent={ImageComponent}
                plusIcon={plusIcon}
                minusIcon={minusIcon}
              />
            );
          })}
        </div>

        <div
          ref={progressRef}
          style={{ backgroundColor: progressBarColor ?? colorTheme.darkColor }}
          className="mt-[24px] block h-[5px] min-w-full overflow-hidden md:hidden"
        >
          <div
            style={{ width: `${progressWidth}px` }}
            className="h-full rounded-[6px] bg-white"
          />
        </div>

        {showDosageText && isProductWithoutDosageText && (
          <div className="mt-[20px] font-inter text-[14px] font-normal leading-[140%] tracking-[-0.36px] sm:mt-[32px] sm:text-[18px] xl:mt-[40px]">
            <p className="text-center text-white">{texts.dosageText}</p>
          </div>
        )}

        <div className="mt-[20px] flex w-full flex-col items-center justify-center space-y-[8px] sm:mt-[32px] md:flex-row md:space-x-[16px] md:space-y-0 xl:mt-[40px]">
          {renderButton()}
          <button
            onClick={() => setShowFullIngredients(true)}
            className="rounded-[4px] border border-white px-[12px] py-[8px] text-center font-inter text-[14px] font-medium leading-normal text-white sm:px-[16px] sm:py-[14px] xl:px-[32px] xl:py-[16px] xl:text-[18px] xl:font-semibold"
            data-test="pdp-ingredients-view-composition"
            data-desc="View composition"
          >
            {texts.viewFullIngredientsText}
          </button>
        </div>
      </div>

      {showFullIngredients &&
        createPortal(
          <div
            className="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm"
            onClick={() => setShowFullIngredients(false)}
          >
            <div
              className="flex h-full w-full max-w-[80dvh] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  borderColor: colorTheme.darkColor,
                  backgroundColor: colorTheme.lightColor,
                }}
                className="relative space-y-[3.99px] rounded-[7.98px] border-2 p-[24px]"
              >
                <div
                  className="absolute right-1 top-1 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-2 border-black"
                  onClick={() => setShowFullIngredients(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 6L18 18M6 18L18 6" />
                  </svg>
                </div>

                <ImageComponent
                  src={modalImage.src}
                  alt={modalImage.alt}
                  width={1000}
                  height={1000}
                  className="w-full max-h-[80dvh]"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default IngredientsSection;
