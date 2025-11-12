import { useState } from "react";

import type { Benefices, Theme } from "./types";
import VideoPlayer from "./VideoPlayer";
import { type ImageLikeProps, DefaultImg } from "./FormulaSection";

type Props = {
  beneficesContent: Array<Benefices>;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  chevronImageUrl: string;
  dashedBorderColor: string;
  beneficesTabTitle: string;
  formulaVideoSrc: string;
  colorTheme: Theme;
};

const renderWidthXtraLarge = (
  beneficesContent: Array<Benefices>,
  dashedBorderColor: string,
  formulaVideoSrc: string
) => {
  return (
    <div className="hidden w-full items-stretch pt-[16px] sm:pt-[40px] xl:flex">
      <div className="grid grid-cols-3 gap-[32px]">
        {beneficesContent.map((data, index) => {
          const textAlign =
            index == 0 || index == 3 ? "text-right" : "text-left";
          return (
            <>
              <div
                className={`${textAlign} ${
                  index == 1 ? "hidden" : ""
                } h-auto w-full bg-white ${dashedBorderColor} space-y-[8px] rounded-[12px] p-[18px] text-left`}
                key={index}
              >
                <div className="font-mackinac text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-neutral-grey-800">
                  <p>{data.title}</p>
                </div>

                <div>
                  <p className="font-inter text-[18px] font-normal leading-[25.2px] tracking-[-0.36px] text-[#525252]">
                    {data.desc}
                  </p>
                </div>
              </div>

              <div
                className={`${
                  index == 1 ? "block" : "hidden"
                } row-span-2 h-full w-full`}
              >
                <VideoPlayer formulaVideoSrc={formulaVideoSrc} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

const renderWidthLarge = (
  beneficesContent: Array<Benefices>,
  formulaVideoSrc: string,
  dashedBorderColor: string
) => {
  return (
    <div className="hidden h-full w-full flex-col items-center pt-[40px] sm:flex xl:hidden">
      <div className="flex h-full w-full justify-center ">
        <VideoPlayer formulaVideoSrc={formulaVideoSrc} />
      </div>

      <div className="mt-[30px] grid grid-cols-2 gap-[30px]">
        {beneficesContent.map((data, index) => {
          const textAlign =
            index == 0 || index == 3 ? "text-right" : "text-left";
          return (
            <div
              className={`${textAlign} ${
                index == 1 ? "hidden" : ""
              } h-auto bg-white ${dashedBorderColor} space-y-[8px] rounded-[12px] p-[18px] text-left`}
              key={index}
            >
              <div className="font-mackinac text-[24px] font-semibold leading-[28.8px] tracking-[-0.48px] text-[#333]">
                <p>{data.title}</p>
              </div>

              <div>
                <p className="font-inter text-[14px] font-normal leading-[19.6px] tracking-[-0.28px] text-[#525252]">
                  {data.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const renderMobile = (
  beneficesContent: Array<Benefices>,
  colorTheme: Theme,
  activeIndex: number | null,
  handleFormulaClicked: (key: number) => void,
  formulaVideoSrc: string,
  dashedBorderColor: string,
  ImageComponent: React.ComponentType<ImageLikeProps>,
  chevronImageUrl: string
) => {
  return (
    <>
      {beneficesContent.map((data: Benefices, index: number) => {
        const isActive = activeIndex === index;
        const color = isActive ? colorTheme.darkColor : "black";
        const backgroundColor = isActive ? colorTheme.middleColor : "white";
        const borderColor = dashedBorderColor;

        return (
          <div
            style={{ backgroundColor }}
            className={`${
              index == 1 ? "hidden" : ""
            } mt-[16px] w-full sm:hidden ${borderColor} rounded-[12px] p-[12px] ${
              isActive ? "space-y-[8px]" : "space-y-[0px]"
            }`}
            onClick={() => handleFormulaClicked(index)}
          >
            <div className="flex flex-row justify-between">
              <p
                style={{ color }}
                className={`${
                  isActive ? "font-bold" : "font-medium"
                } font-mackinac text-[18px] leading-[21.6px] tracking-[-0.36px] text-[#333]`}
              >
                {data.title}
              </p>

              <ImageComponent
                src={chevronImageUrl}
                alt={"icon chevron"}
                width={24}
                height={24}
                className={`${
                  isActive ? "" : "rotate-180"
                } cursor-pointer transition-transform duration-300`}
              />
            </div>

            <div
              className={`${
                isActive ? "block" : "hidden"
              } border-b border-[#A3A3A3]`}
            ></div>

            <div
              className={`${
                isActive ? "opacity-100" : "max-h-0 overflow-hidden opacity-0"
              } transition-all  duration-300 ease-in-out`}
            >
              <p className="font-inter text-[12px] font-normal leading-[16.8px] tracking-[-0.24px] text-[#333]">
                {data.desc}
              </p>
            </div>
          </div>
        );
      })}

      <div className="mt-[16px] flex h-full w-full justify-center sm:hidden">
        <VideoPlayer formulaVideoSrc={formulaVideoSrc} />
      </div>
    </>
  );
};

export default function BeneficesTab(props: Props) {
  const {
    beneficesContent,
    ImageComponent = DefaultImg,
    chevronImageUrl,
    dashedBorderColor,
    beneficesTabTitle,
    formulaVideoSrc,
    colorTheme,
  } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleFormulaClicked = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-[32px] flex h-full w-full flex-col items-center md:mt-[40px] xl:mt-[50px]">
      <div className="">
        <p
          className="w-[343px] text-center font-mackinac text-[33px] font-medium leading-none tracking-[-0.02em] text-neutral-grey-800 sm:text-[40px] md:w-[700px] md:leading-[40px] md:tracking-[-0.8px] lg:leading-[48px] xl:text-[48px] xl:tracking-[-0.96px]"
          dangerouslySetInnerHTML={{
            __html: beneficesTabTitle,
          }}
        ></p>
      </div>

      {renderWidthXtraLarge(
        beneficesContent,
        dashedBorderColor,
        formulaVideoSrc
      )}

      {renderWidthLarge(beneficesContent, formulaVideoSrc, dashedBorderColor)}

      {renderMobile(
        beneficesContent,
        colorTheme,
        activeIndex,
        handleFormulaClicked,
        formulaVideoSrc,
        dashedBorderColor,
        ImageComponent,
        chevronImageUrl
      )}
    </div>
  );
}
