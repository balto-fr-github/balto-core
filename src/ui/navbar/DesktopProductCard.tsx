import { TextBody, TextCaption } from "../typography";
import { cn } from "../../utils/cn";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

const DefaultImg: React.FC<ImageLikeProps> = (props) => <img {...props} />;

export const DesktopProductCard = ({
  ImageComponent = DefaultImg,
  image,
  title,
  description,
  isComplementsProduct,
}: {
  ImageComponent: React.ComponentType<ImageLikeProps>;
  image: string;
  title: string;
  description: string;
  isComplementsProduct: boolean;
}) => {
  return (
    <div className="space-y-3">
      <div
        className={cn(
          "relative aspect-[163/204] w-full overflow-hidden rounded-lg"
        )}
      >
        <ImageComponent
          src={image}
          alt={title}
          fill
          className={cn(
            "rounded-lg object-cover transition-transform duration-300 ease-out hover:scale-105",
            isComplementsProduct && "scale-105 object-[50%_40%] hover:scale-110"
          )}
          quality={100}
          priority
        />
      </div>

      <div className="space-y-1">
        <TextBody size="sm" weight="medium" className="text-inverted">
          {title}
        </TextBody>

        <TextCaption size="md" weight="regular" className="text-inverted">
          {description}
        </TextCaption>
      </div>
    </div>
  );
};
