import { cn } from "../../utils/cn";
import { Button } from "../button";
import { TextBody } from "../typography";

export type ProductCardProps = {
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
    <div className={cn("w-full rounded-lg font-inter", containerClassName)}>
      {productImage}

      <div
        className={cn(
          "p-3 space-y-3 bg-white border border-core-neutral-grey-300",
          contentClassName
        )}
      >
        <div>
          <TextBody
            weight="semibold"
            size="lg"
            className={cn("text-core-neutral-grey-800", productNameClassName)}
            as="h3"
            useDefaultColor={false}
          >
            {productName}
          </TextBody>

          <TextBody
            weight={"regular"}
            size="sm"
            useDefaultColor={false}
            className={cn(
              "text-core-neutral-grey-600",
              productDescriptionClassName
            )}
          >
            {productDescription}
          </TextBody>
        </div>

        <div className="flex items-center gap-1">
          <TextBody
            weight="regular"
            size="sm"
            useDefaultColor={false}
            className={cn("text-core-neutral-grey-500", priceLabelClassName)}
          >
            {priceLabel}
          </TextBody>

          <TextBody
            weight="semibold"
            size="sm"
            useDefaultColor={false}
            className={cn("text-core-neutral-grey-800", productPriceClassName)}
          >
            {productPrice}
          </TextBody>
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
