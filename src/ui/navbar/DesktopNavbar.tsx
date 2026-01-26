"use client";

import { TextBody } from "../typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import { useEffect, useId, useMemo, useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { cn } from "../../utils/cn";
import {
  COMPLEMENT_PRODUCTS_FR,
  COMPLEMENT_PRODUCTS_ES,
  CROQUETTES_PRODUCTS_FR,
  FRIANDISES_PRODUCTS_FR,
  type CategoryTab,
  CATEGORY_TABS_FR,
} from "./constants";
import { DesktopProductCard } from "./DesktopProductCard";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

export type LinkLikeProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

const DefaultLink: React.FC<LinkLikeProps> = (props) => <a {...props} />;

const DefaultImg: React.FC<ImageLikeProps> = (props) => <img {...props} />;

type DesktopNavbarProps = {
  isOpen: boolean;
  LinkComponent?: React.ComponentType<LinkLikeProps>;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  variant?: "fr" | "es";
};

export const DesktopNavbar = ({
  isOpen,
  LinkComponent = DefaultLink,
  ImageComponent = DefaultImg,
  variant = "fr",
}: DesktopNavbarProps) => {
  const scrollbarId = useId().replace(/:/g, "");
  const [activeCategory, setActiveCategory] =
    useState<CategoryTab>("complements");

  useEffect(() => {
    if (!isOpen) {
      setActiveCategory("complements");
    }
  }, [isOpen]);

  const activeProducts = useMemo(() => {
    if (variant === "es") {
      return COMPLEMENT_PRODUCTS_ES;
    }

    switch (activeCategory) {
      case "complements":
        return COMPLEMENT_PRODUCTS_FR;
      case "croquettes":
        return CROQUETTES_PRODUCTS_FR;
      case "friandises":
        return FRIANDISES_PRODUCTS_FR;
      default:
        return COMPLEMENT_PRODUCTS_FR;
    }
  }, [activeCategory, variant]);

  const seeAllProductsText =
    variant === "fr" ? "Voir tous les produits" : "Ver todos los productos";
  const seeAllProductsHref = variant === "fr" ? "/collection" : "/coleccion";
  const complementsLabel = variant === "fr" ? "Compléments" : "Complementos";

  return (
    <div
      className={cn(
        "flex w-full items-stretch rounded-3xl",
        "bg-[#27272786]",
        "relative",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:p-[1px]",
        "overflow-hidden",
        "backdrop-blur-[4px] backdrop-saturate-200",
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
      )}
    >
      <div className="flex w-[260px] flex-shrink-0 flex-col justify-between gap-4 bg-[#5B5A5A]/50 p-4 xl:w-[260px]">
        <div className="flex flex-col gap-1">
          {variant === "fr" ? (
            CATEGORY_TABS_FR.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={cn(
                  "flex w-full items-center justify-between gap-2.5 px-3 py-2 transition-all duration-200",
                  activeCategory === tab.key && "rounded-[99px] bg-[#777]"
                )}
              >
                <TextBody
                  size={"md"}
                  weight={"regular"}
                  className="text-inverted"
                >
                  {tab.label}
                </TextBody>

                <ImageComponent
                  src="/assets/navbar/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className={cn(
                    "flex-shrink-0 transition-opacity duration-200",
                    activeCategory !== tab.key && "opacity-0"
                  )}
                />
              </button>
            ))
          ) : (
            <button
              className={cn(
                "flex w-full items-center justify-between gap-2.5 px-3 py-2 transition-all duration-200",
                "rounded-[99px] bg-[#777]"
              )}
            >
              <TextBody
                size={"md"}
                weight={"regular"}
                className="text-inverted"
              >
                {complementsLabel}
              </TextBody>

              <ImageComponent
                src="/assets/navbar/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="flex-shrink-0"
              />
            </button>
          )}
        </div>

        <LinkComponent
          href={seeAllProductsHref}
          className={cn(
            "inline-flex w-full justify-center rounded-lg border border-white/60 bg-transparent px-4 py-3",
            "transition-all duration-200",
            "hover:border-white hover:bg-white/10",
            "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent",
            "active:scale-[0.98] active:bg-white/20"
          )}
        >
          <TextBody size="md" weight="medium" className="text-inverted">
            {seeAllProductsText}
          </TextBody>
        </LinkComponent>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-hidden p-4">
        <Swiper
          key={variant === "fr" ? activeCategory : "complements"}
          modules={[FreeMode, Scrollbar]}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={{
            enabled: true,
            sticky: false,
            momentumRatio: 0.5,
          }}
          scrollbar={{
            draggable: true,
            el: `#scrollbar-${scrollbarId}`,
          }}
          observer
          observeParents
          className="w-full"
        >
          {activeProducts.map((product) => (
            <SwiperSlide key={product.href} className="!w-[163px]">
              <LinkComponent href={product.href}>
                <DesktopProductCard
                  ImageComponent={ImageComponent}
                  image={product.imageDesktop}
                  title={product.title}
                  description={product.description}
                  isComplementsProduct={activeCategory === "complements"}
                />
              </LinkComponent>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          id={`scrollbar-${scrollbarId}`}
          className="mx-auto h-1 w-full max-w-[200px] rounded-full bg-white/20"
        >
          <div className="swiper-scrollbar-drag rounded-full bg-white/60 transition-colors hover:bg-white/80" />
        </div>
      </div>
    </div>
  );
};
