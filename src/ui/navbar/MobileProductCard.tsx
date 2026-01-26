import { TextBody, TextCaption } from "../typography";

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

type MobileProductCardProps = {
  ImageComponent: React.ComponentType<ImageLikeProps>;
  image: string;
  title: string;
  description: string;
};

export const MobileProductCard = ({
  ImageComponent = DefaultImg,
  image,
  title,
  description,
}: MobileProductCardProps) => {
  return (
    <div className="space-y-1">
      <div className="relative aspect-[128/80] w-full overflow-hidden rounded-lg">
        <ImageComponent
          src={image}
          alt={title}
          fill
          className="scale-[1.2] rounded-lg object-cover object-top pt-[7px] transition-transform duration-300 ease-out hover:scale-[1.25] sm:scale-[1.25] sm:pt-4 sm:hover:scale-[1.3]"
          quality={100}
        />
      </div>

      <div className="flex flex-col">
        <TextBody size="md" weight="medium" className="text-inverted">
          {title}
        </TextBody>

        <TextCaption size="md" weight="regular" className="text-inverted">
          {description}
        </TextCaption>
      </div>
    </div>
  );
};
