import { forwardRef } from "react";

import { cn } from "../../utils/cn";

export type FlavorOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
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
  flavors?: [FlavorOption, FlavorOption];
  selectedFlavor?: string;
  onFlavorSelect?: (value: string) => void;
  flavorStyle?: {
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
      flavors,
      selectedFlavor,
      onFlavorSelect,
      flavorStyle,
      className,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)}>
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

        {showFlavorSelector && flavors?.length === 2 && (
          <div className="flex gap-2">
            {flavors.map((flavor) => {
              const isSelected = flavor.value === selectedFlavor;
              return (
                <button
                  key={flavor.value}
                  type="button"
                  onClick={() => onFlavorSelect?.(flavor.value)}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-md border w-full justify-center text-sm font-medium",
                    isSelected ? "text-primary font-semibold" : "text-light",
                    isSelected && flavorStyle?.borderColor,
                    isSelected && flavorStyle?.bgColor,
                    !isSelected && "border-gray-300"
                  )}
                >
                  {flavor.icon}
                  {flavor.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

HorizontalProductCard.displayName = "HorizontalProductCard";
