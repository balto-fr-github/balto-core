import { cn } from "../../utils/cn";
import { Button } from "../button";

type ProductCardProps = {
  productImage: React.ReactNode;
  productName: string;
  productDescription: string;
  productPrice: string;
  onClickButton: () => void;
  priceLabel?: string;
  buttonChildren: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
  productNameClassName?: string;
  productDescriptionClassName?: string;
  priceLabelClassName?: string;
  productPriceClassName?: string;
  buttonClassName?: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  productImage,
  productName,
  productDescription,
  productPrice,
  onClickButton,
  priceLabel = "À partir de",
  buttonChildren,
  containerClassName,
  contentClassName,
  productNameClassName,
  productDescriptionClassName,
  priceLabelClassName,
  productPriceClassName,
  buttonClassName,
}) => {
  return (
    <div className={(cn("w-full rounded-lg font-inter"), containerClassName)}>
      {productImage}

      <div className={cn("p-3 space-y-3 bg-white", contentClassName)}>
        <div>
          <h3
            className={cn(
              "text-core-neutral-grey-800 text-[18px] leading-[23px] font-semibold tracking-[0.1px]",
              productNameClassName
            )}
          >
            {productName}
          </h3>

          <p
            className={cn(
              "text-core-neutral-grey-600 text-[14px] leading-[22px] tracking-[0.2px]",
              productDescriptionClassName
            )}
          >
            {productDescription}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <p
            className={cn(
              "text-core-neutral-grey-500 text-[14px] leading-[22px] tracking-[0.2px]",
              priceLabelClassName
            )}
          >
            {priceLabel}
          </p>

          <p
            className={cn(
              "text-core-neutral-grey-800 text-[14px] leading-[22px] tracking-[0.2px] font-semibold",
              productPriceClassName
            )}
          >
            {productPrice}
          </p>
        </div>

        <Button
          variant="conversion"
          size="lg"
          onClick={onClickButton}
          className={cn(
            "w-full bg-[#4257D9] text-white rounded-[4px]",
            buttonClassName
          )}
        >
          {buttonChildren}
        </Button>
      </div>
    </div>
  );
};
