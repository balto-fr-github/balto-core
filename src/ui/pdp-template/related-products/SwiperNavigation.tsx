import { cn } from "../../../utils/cn";
import IconArrowLeft from "./ArrowLeft";
import type { ThemeLike } from "./RelatedProducts";

export enum SWIPER_VARIANT {
  PREV,
  NEXT,
}

type SwiperNavigationProps = {
  colorTheme?: ThemeLike;
  variant?: SWIPER_VARIANT;
  className?: string;
  onNavigate: () => void;
};

export const SwiperNavigation = ({
  colorTheme,
  variant,
  className,
  onNavigate,
}: SwiperNavigationProps) => {
  const isNext = variant === SWIPER_VARIANT.NEXT;
  return (
    <div
      className={cn(
        cn(
          "absolute top-1/2 z-10 -translate-y-1/2 pb-[32px]",
          isNext ? "-right-4" : "-left-4"
        ),
        className
      )}
    >
      <button
        onClick={onNavigate}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border-[2.143px] border-success-900 bg-white p-1.5 text-success-900"
        )}
        style={{
          color: colorTheme?.darkColor,
          borderColor: colorTheme?.darkColor,
        }}
      >
        <IconArrowLeft
          className={cn("h-5 w-5", isNext && "rotate-180")}
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};
