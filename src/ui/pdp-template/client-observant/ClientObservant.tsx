import React, { memo } from "react";

import { cn } from "../../../utils/cn";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

export type ClientObservantItem = {
  image: string;
  title: string;
  alt?: string;
};

export type ClientObservantTheme = {
  middleColor: string;
};

type ClassNames = Partial<{
  root: string;
  section: string;
  heading: string;
  itemsOuter: string;
  itemsInner: string;
  item: string;
  imageBox: string;
  image: string;
  itemTitle: string;
}>;

export type ClientObservantProps = {
  colorTheme: ClientObservantTheme;
  title: string;
  items: ClientObservantItem[];
  vectorSrc: { sm: string; md: string; xl: string };
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  classNames?: ClassNames;
};

const DefaultImg: React.FC<ImageLikeProps> = (props) => <img {...props} />;

const computeLayoutClasses = (itemsLen: number) => {
  const result = itemsLen % 2;

  const mappingClass: Record<number, string> = {
    0: "grid grid-cols-2 sm:flex sm:flex-wrap",
    1: "flex flex-wrap",
  };
  const mappingMaxWidth: Record<number, string> = {
    0: "xl:w-[240px]",
    1: "xl:w-[200px]",
  };
  const mappingWidth: Record<number, string> = {
    0: "w-full flex justify-center",
    1: "",
  };

  return {
    list: mappingClass[result],
    maxW: mappingMaxWidth[result],
    itemW: mappingWidth[result],
  };
};

const ClientObservant = memo(function ClientObservant({
  colorTheme,
  items,
  title,
  vectorSrc,
  ImageComponent = DefaultImg,
  classNames,
}: ClientObservantProps) {
  const layout = computeLayoutClasses(items.length);

  return (
    <div className={cn("relative", classNames?.root ?? "")}>
      <div
        style={{ backgroundColor: colorTheme.middleColor }}
        className={cn(
          "overflow-x-hidden p-[16px] sm:p-[40px] xl:px-[80px] xl:py-[40px]",
          classNames?.section ?? ""
        )}
      >
        <h2
          className={cn(
            "text-center font-mackinac text-[33px] font-medium leading-none tracking-[-0.02em] text-neutral-grey-800 sm:text-[40px] sm:leading-[40px] sm:tracking-[-0.8px] lg:text-[48px] lg:leading-[48px] lg:tracking-[-0.96px]",
            classNames?.heading ?? ""
          )}
        >
          {title}
        </h2>

        <div
          className={cn(
            "container mx-auto flex w-full justify-center",
            classNames?.itemsOuter ?? ""
          )}
        >
          <div
            className={cn(
              `w-[25rem] flex-wrap sm:w-full ${layout.list} justify-center gap-4 text-center sm:flex-nowrap md:gap-x-6 xl:gap-x-8`,
              classNames?.itemsInner ?? ""
            )}
          >
            {items.map((item, index) => (
              <div
                key={`observant-image-${index}`}
                className={`${layout.itemW} ${classNames?.item ?? ""}`}
              >
                <div className="flex h-full max-w-[90px] flex-col items-center space-y-[12px] sm:max-w-full sm:space-y-[16px] xl:space-y-[24px]">
                  <div
                    className={`relative h-[80px] w-[80px] lg:h-[125px] lg:w-[125px] ${
                      classNames?.imageBox ?? ""
                    }`}
                  >
                    <ImageComponent
                      src={item.image}
                      alt={item.alt ?? item.title}
                      className={cn(
                        "object-contain w-full h-full",
                        classNames?.image ?? ""
                      )}
                      fill
                    />
                  </div>
                  <p
                    className={cn(
                      "w-[100px] text-[#424242]",
                      "flex justify-center text-wrap align-top text-[16px] font-medium leading-[16px] xl:text-[20px] xl:leading-[24px]",
                      layout.maxW,
                      classNames?.itemTitle ?? ""
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`-mt-1 h-full w-full overflow-x-hidden`}>
        <ImageComponent
          src={vectorSrc.sm}
          alt="Wavy background"
          width={1440}
          height={38}
          className={
            "h-full w-full scale-x-[1.05] object-cover sm:scale-x-[1.03] md:hidden"
          }
        />

        <ImageComponent
          src={vectorSrc.md}
          alt="Wavy background"
          width={1440}
          height={38}
          className={
            "hidden h-full w-full scale-x-[1.05] object-cover md:block xl:hidden"
          }
        />

        <ImageComponent
          src={vectorSrc.xl}
          alt="Wavy background"
          width={1440}
          height={38}
          className={
            "hidden h-full w-full scale-x-[1.05] object-cover xl:block"
          }
        />
      </div>
    </div>
  );
});

export default ClientObservant;
