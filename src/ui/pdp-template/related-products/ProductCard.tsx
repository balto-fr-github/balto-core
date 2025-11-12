import { cn } from "../../../utils/cn";
import { Button } from "../../button";
import { type ImageLikeProps, DefaultImg } from "./RelatedProducts";

type Props = {
  isBlurred?: boolean;
  image: string;
  title: string;
  productType: string;
  price: string;
  onClick?: () => void;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
};

export const ProductCard = ({
  isBlurred,
  image,
  title,
  productType,
  price,
  onClick,
  ImageComponent = DefaultImg,
}: Props) => {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-lg cursor-pointer"
      onClick={onClick}
    >
      {isBlurred && <div className="absolute inset-0 z-10 backdrop-blur-sm" />}
      <div className="relative aspect-square">
        <ImageComponent src={image} alt={title} className="object-cover" fill />
      </div>

      <div className="flex flex-col rounded-b-lg border border-neutral-grey-300 bg-base-white p-4">
        <p
          className={cn(
            "line-clamp-1 font-inter text-xl font-bold leading-none"
          )}
        >
          {title}
        </p>

        <p
          className={cn(
            "mt-2 line-clamp-1 text-sm font-medium leading-none text-neutral-grey-600"
          )}
        >
          {productType}
        </p>

        <p className="mt-4 text-sm leading-none text-neutral-grey-500">
          À partir de{" "}
          <span className="font-semibold text-neutral-grey-800">{price}</span>
        </p>

        <Button
          variant="conversion"
          size="lg"
          className="mt-4 w-full bg-[#4257D9] rounded"
        >
          Voir le produit
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
