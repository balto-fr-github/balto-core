import { forwardRef } from "react";

import { cn } from "../../utils/cn";
import Flavor from "./Flavor";
import { SalmonIcon } from "./SalmonIcon";
import { ChickenIcon } from "./ChickenIcon";

export type FlavorOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type PredefinedFlavorType = "chicken" | "salmon";

const PREDEFINED_FLAVORS: Record<PredefinedFlavorType, FlavorOption> = {
  salmon: {
    label: "Saumon",
    value: "salmon",
    icon: <SalmonIcon />,
  },
  chicken: {
    label: "Poulet",
    value: "chicken",
    icon: <ChickenIcon />,
  },
};

type HorizontalProductCardProps = {
  productImage: React.ReactNode;
  productName: string;
  productDescription?: string;
  quantity?: number;
  quantityLabel?: string;
  originalPrice?: string;
  currentPrice: string;
  showFlavorSelector?: boolean;
  selectedFlavor?: PredefinedFlavorType;
  onFlavorSelect?: (value: PredefinedFlavorType) => void;
  activeFlavorStyle: {
    borderColor: string;
    bgColor: string;
  };
  className?: string;
};

export const HorizontalProductCard = forwardRef<
  HTMLDivElement,
  HorizontalProductCardProps
>(
  (
    {
      productImage,
      productName,
      productDescription,
      quantity,
      quantityLabel,
      originalPrice,
      currentPrice,
      showFlavorSelector = false,
      selectedFlavor,
      onFlavorSelect,
      activeFlavorStyle,
      className,
    },
    ref
  ) => {
    const salmonFlavor = PREDEFINED_FLAVORS.salmon;
    const chickenFlavor = PREDEFINED_FLAVORS.chicken;

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-stretch gap-3">
          {productImage}

          <div className="flex flex-1 flex-col h-full justify-between gap-2">
            <div className="flex flex-col gap-1 md:gap-2">
              <h3 className="text-primary font-inter text-[14px] leading-[21px] font-medium md:text-[16px] md:leading-[23px] md:tracking-[0.1px]">
                {productName}
              </h3>

              {productDescription && (
                <p className="text-light font-inter text-[12px] leading-[20px] md:font-medium md:text-[14px] md:leading-[20px] md:tracking-[0.3px]">
                  {productDescription}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] leading-[21px] text-light font-inter md:text-[16px] md:leading-[23px]">
                {quantity} {quantityLabel}
              </p>

              <div className="flex flex-col gap-1">
                {originalPrice && (
                  <p className="text-right text-light line-through text-[12px] leading-[12px] tracking-[0.2px] font-inter">
                    {originalPrice}
                  </p>
                )}

                <p className="text-primary font-inter text-[14px] leading-[21px] tracking-[0.1px] font-medium md:text-[16px] md:leading-[23px]">
                  {currentPrice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {showFlavorSelector && (
          <div className="flex items-center">
            <Flavor
              label={chickenFlavor.label}
              icon={
                <ChickenIcon
                  color={
                    selectedFlavor === "chicken"
                      ? activeFlavorStyle.borderColor
                      : "#777777"
                  }
                />
              }
              isActive={selectedFlavor === "chicken"}
              onClick={() => onFlavorSelect?.("chicken")}
              position="left"
              activeStyle={activeFlavorStyle}
            />

            <Flavor
              label={salmonFlavor.label}
              icon={
                <SalmonIcon
                  color={
                    selectedFlavor === "salmon"
                      ? activeFlavorStyle.borderColor
                      : "#777777"
                  }
                />
              }
              isActive={selectedFlavor === "salmon"}
              onClick={() => onFlavorSelect?.("salmon")}
              position="right"
              activeStyle={activeFlavorStyle}
            />
          </div>
        )}
      </div>
    );
  }
);

HorizontalProductCard.displayName = "HorizontalProductCard";
