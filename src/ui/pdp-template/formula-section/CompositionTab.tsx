import type { Theme } from "./types";
import { type ImageLikeProps, DefaultImg } from "./FormulaSection";

type Props = {
  colorTheme: Theme;
  productName: string;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  compositionImage: {
    imageUrl: string;
    alt: string;
  };
};

export default function CompositionTab({
  colorTheme,
  ImageComponent = DefaultImg,
  compositionImage,
}: Props) {
  return (
    <div
      className="mt-[16px] flex h-full w-[343px] max-w-[343px] items-center justify-center sm:w-[500px] sm:max-w-none md:mt-[40px] lg:mt-[50px]"
      data-test="pdp-composition"
      data-desc="Composition tab content"
    >
      <div
        style={{
          borderColor: colorTheme.darkColor,
          backgroundColor: colorTheme.lightColor,
        }}
        className="space-y-[3.99px] rounded-[7.98px] border-2 p-[7.3px] sm:p-[10.64px]"
      >
        <div className="h-full w-full md:w-[478.8px]">
          <ImageComponent
            src={compositionImage.imageUrl}
            alt={compositionImage.alt}
            height={1000}
            data-test="pdp-composition-image"
            data-desc="Ingredients composition image"
          />
        </div>
      </div>
    </div>
  );
}
