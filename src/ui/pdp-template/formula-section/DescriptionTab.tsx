import { useState } from "react";

import { DescriptionContent, Theme } from "./types";
import { type ImageLikeProps, DefaultImg } from "./FormulaSection";

type Props = {
  colorTheme: Theme;
  content: Array<DescriptionContent>;
  productName: string;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  chevronImageUrl: string;
};

export default function DescriptionTab(props: Props) {
  const {
    colorTheme,
    content,
    ImageComponent = DefaultImg,
    chevronImageUrl,
  } = props;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleDescClicked = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const borderColor = colorTheme.darkColor;

  return (
    <div className="mt-4 h-full w-full space-y-4 sm:space-y-5 md:mt-10 lg:mt-[50px]">
      {content.map((data, index) => {
        const isActive = activeIndex === index;
        const backgroundColor = isActive ? colorTheme.middleColor : "white";
        const borderWidth = isActive ? "2px" : "1px";
        const color = isActive ? colorTheme.darkColor : "#333";

        return (
          <div
            style={{ borderColor, backgroundColor, borderWidth }}
            className={`h-full w-full rounded-xl p-3 sm:p-6 ${
              isActive
                ? "space-y-[8px] sm:space-y-[20px]"
                : "space-y-[0px] sm:space-y-[0px]"
            } cursor-pointer`}
            key={index}
            onClick={() => handleDescClicked(index)}
          >
            <div className="flex items-center justify-between space-x-[30px] sm:space-x-[40px]">
              <p
                style={{ color }}
                className={`${
                  isActive ? "font-bold" : "font-normal"
                } tracking-[-0.02em]", "md:text-lg font-mackinac text-[28px] leading-[1.2] sm:text-[28px]`}
              >
                {data.title}
              </p>

              <div className="h-6 w-6 flex-shrink-0 sm:h-[43px] sm:w-[43px]">
                <ImageComponent
                  src={chevronImageUrl}
                  alt="icon chevron"
                  width={43}
                  height={43}
                  className={`${
                    isActive ? "" : "rotate-180"
                  } cursor-pointer transition-transform duration-300`}
                />
              </div>
            </div>

            <div
              className={`${
                isActive ? "block" : "hidden"
              } border-b border-[#A3A3A3]`}
            ></div>

            <div
              className={`${
                isActive ? "opacity-100 " : "max-h-0 overflow-hidden opacity-0"
              } space-y-[24px]  font-inter text-[12px] leading-[16.8px] tracking-[-0.24px] text-[#333] transition-all duration-300 ease-in-out sm:text-[20px] sm:leading-[28px] sm:tracking-[-0.4px]`}
            >
              {data.descHtml && typeof data.descHtml === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: data.descHtml }} />
              ) : (
                data.descHtml
              )}

              {data.desc?.map((data, index) => {
                return (
                  <p key={index} dangerouslySetInnerHTML={{ __html: data }}></p>
                );
              })}

              <ul className="list-outside list-disc px-10">
                {data.subDesc?.map((data, index) => {
                  return <li key={index}>{data}</li>;
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
