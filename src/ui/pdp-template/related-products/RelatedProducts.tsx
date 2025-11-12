import React, { memo, useId, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Swiper,
  SwiperSlide,
  type SwiperClass,
  type SwiperRef,
} from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { cn } from "../../../utils/cn";
import ProductCard from "./ProductCard";
import { SWIPER_VARIANT, SwiperNavigation } from "./SwiperNavigation";

export type ThemeLike = {
  middleColor?: string;
  darkColor?: string;
};

export type RelatedProduct = {
  image: string;
  title: string;
  productType: string;
  price: string;
  id: string;
};

export type NavigationVariant = "prev" | "next";

export type NavigationComponentProps = {
  variant: NavigationVariant;
  onNavigate: () => void;
  colorTheme?: ThemeLike;
};

export type ImageLikeProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

type ClassNames = Partial<{
  root: string;
  container: string;
  title: string;
  swiper: string;
  slide: string;
}>;

type Props = {
  products: RelatedProduct[];
  colorTheme?: ThemeLike;
  titleText?: string;
  onProductClick?: (product: RelatedProduct) => void;
  classNames?: ClassNames;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
};

export const DefaultImg: React.FC<ImageLikeProps> = (props) => (
  <img {...props} />
);

enum SWIPER_POSITION {
  BEGINNING,
  MIDDLE,
  END,
}

const RelatedProducts = memo(function RelatedProducts({
  products,
  colorTheme,
  titleText = "Il aimera aussi :",
  onProductClick,
  classNames,
  ImageComponent = DefaultImg,
}: Props) {
  const ref = useRef<SwiperRef>(null);
  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [position, setPosition] = useState<SWIPER_POSITION>(
    SWIPER_POSITION.BEGINNING
  );

  const handleTransitionEnd = (e: SwiperClass) => {
    if (e.isBeginning) setPosition(SWIPER_POSITION.BEGINNING);
    else if (e.isEnd) setPosition(SWIPER_POSITION.END);
    else setPosition(SWIPER_POSITION.MIDDLE);
  };

  const slideNext = () => ref.current?.swiper.slideNext();
  const slidePrev = () => ref.current?.swiper.slidePrev();

  const handleSlideChange = (e: SwiperClass) => setActiveIndex(e.realIndex);

  const productsCount = useMemo(() => {
    if (isLg) return Math.max(3, products.length);
    if (isMd) return 3;
    return 1.1;
  }, [isMd, isLg, products.length]);

  const navControls = useMemo(() => {
    const shouldShow = isMd && !isLg && products.length > 3;
    if (!shouldShow) return null;

    switch (position) {
      case SWIPER_POSITION.BEGINNING:
        return (
          <SwiperNavigation
            variant={SWIPER_VARIANT.NEXT}
            onNavigate={slideNext}
            colorTheme={colorTheme}
          />
        );
      case SWIPER_POSITION.END:
        return (
          <SwiperNavigation
            variant={SWIPER_VARIANT.PREV}
            onNavigate={slidePrev}
            colorTheme={colorTheme}
          />
        );
      default:
        return (
          <>
            <SwiperNavigation
              variant={SWIPER_VARIANT.PREV}
              onNavigate={slidePrev}
              colorTheme={colorTheme}
            />
            <SwiperNavigation
              variant={SWIPER_VARIANT.NEXT}
              onNavigate={slideNext}
              colorTheme={colorTheme}
            />
          </>
        );
    }
  }, [isMd, isLg, products.length, position, colorTheme]);

  const scope = useId().replace(/[:]/g, "");
  const scopeClass = `rp-${scope}`;

  return (
    <section
      className={cn(
        "overflow-hidden text-neutral-grey-800",
        scopeClass,
        classNames?.root
      )}
      style={{ backgroundColor: colorTheme?.middleColor }}
    >
      <style>{`
        .${scopeClass} .related-products .swiper-pagination {
          position: absolute;
          bottom: -24px;
          display: ${isMd ? "none" : "block"};
        }
        .${scopeClass} .related-products { overflow: visible; }
        .${scopeClass} .related-products .swiper-pagination-bullet {
          background: #f3fff7;
          opacity: 1;
        }
        .${scopeClass} .related-products .swiper-pagination-bullet-active {
          background: ${colorTheme?.darkColor ?? "#0a0a0a"};
        }
        .${scopeClass} .related-products .swiper-slide {
          height: auto;
        }
      `}</style>

      <div
        className={cn(
          products.length === 0 ? "hidden" : "block",
          "container mx-auto px-[16px] py-[32px] sm:px-[32px] sm:py-[40px] xl:px-[32px] xl:py-[80px]",
          classNames?.container
        )}
      >
        <div className="container mx-auto">
          <h2
            className={cn(
              "text-center font-mackinac text-[33px] font-medium leading-none tracking-[-0.02em] text-neutral-grey-800 md:text-[40px] md:tracking-[-0.8px] xl:text-[48px] xl:tracking-[-0.96px]",
              classNames?.title
            )}
          >
            {titleText}
          </h2>

          <div className="relative w-full">
            <Swiper
              ref={ref}
              slidesPerView={productsCount}
              modules={[Pagination]}
              centeredSlides={!isMd}
              centerInsufficientSlides={isMd}
              spaceBetween={isMd ? 20 : 16}
              pagination={{ clickable: true }}
              onTransitionEnd={handleTransitionEnd}
              onSlideChange={handleSlideChange}
              className={cn(
                "related-products mt-4 !overflow-visible pb-5 md:mt-10",
                classNames?.swiper
              )}
            >
              {products.map((product, index) => (
                <SwiperSlide
                  key={`related-product-${index}`}
                  className={cn(
                    "flex h-full w-full justify-center self-stretch rounded-lg shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]",
                    classNames?.slide
                  )}
                >
                  <ProductCard
                    isBlurred={activeIndex !== index && !isMd}
                    image={product.image}
                    title={product.title}
                    productType={product.productType}
                    price={product.price}
                    ImageComponent={ImageComponent}
                    onClick={() => onProductClick?.(product)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {navControls}
          </div>
        </div>
      </div>
    </section>
  );
});

export default RelatedProducts;
