import { useState, Suspense, lazy, useEffect } from "react";

import Loader from "../../loader/Loader";
import type { Benefices, DescriptionContent, Theme } from "./types";

const BeneficesTab = lazy(() => import("./BeneficesTab"));
const DescriptionTab = lazy(() => import("./DescriptionTab"));
const CompositionTab = lazy(() => import("./CompositionTab"));

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

export const DefaultImg: React.FC<ImageLikeProps> = (p) => <img {...p} />;

type Props = {
  colorTheme: Theme;
  productName: string;
  content?: {
    beneficesContent: Array<Benefices>;
    descriptionContent: Array<DescriptionContent>;
  };
  isSnack?: boolean;
  chevronImageUrl: string;
  dashedBorderColor: string;
  beneficesTabTitle: string;
  compositionImage: {
    imageUrl: string;
    alt: string;
  };
  boxShadowColor: string;
  beneficesContentSnack?: Array<Benefices>;
  descriptionContentSnack?: Array<DescriptionContent>;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  formulaVideoSrc: string;
  isSpanish?: boolean;
};

type GetContent<T> = {
  content: Array<T>;
  mappingContent: Array<T>;
};

export default function Formula(props: Props) {
  const {
    colorTheme,
    productName,
    content,
    isSnack = false,
    chevronImageUrl,
    dashedBorderColor,
    beneficesTabTitle,
    compositionImage,
    boxShadowColor,
    beneficesContentSnack,
    descriptionContentSnack,
    ImageComponent = DefaultImg,
    formulaVideoSrc,
    isSpanish = false,
  } = props;

  const tabLabels = {
    benefits: isSpanish ? "Beneficios" : "Bénéfices",
    description: isSpanish ? "Descripción" : "Description",
    composition: isSpanish ? "Composición" : "Composition",
  };

  const defaultTabs = [
    tabLabels.benefits,
    tabLabels.description,
    tabLabels.composition,
  ];
  const snackTabs = [tabLabels.benefits, tabLabels.composition];

  const [choosenTab, setChoosenTab] = useState<string>(tabLabels.benefits);
  const [tabs, setTabs] = useState<Array<string>>(defaultTabs);
  const productType = productName.split("-")[0];

  function getContent<T>({ content, mappingContent }: GetContent<T>): Array<T> {
    if (!isSnack) {
      return content;
    }

    return mappingContent;
  }

  useEffect(() => {
    if (productType == "friandises") {
      setTabs(snackTabs);
      return;
    }
    setTabs(defaultTabs);
  }, [productName, isSpanish]);

  const renderTabs = () => {
    switch (choosenTab) {
      case tabLabels.benefits:
        return (
          <Suspense
            fallback={<Loader color={colorTheme.darkColor} height="700px" />}
          >
            <BeneficesTab
              beneficesContent={getContent<Benefices>({
                content: content?.beneficesContent || [],
                mappingContent: beneficesContentSnack || [],
              })}
              chevronImageUrl={chevronImageUrl}
              dashedBorderColor={dashedBorderColor}
              beneficesTabTitle={beneficesTabTitle}
              formulaVideoSrc={formulaVideoSrc}
              colorTheme={colorTheme}
            />
          </Suspense>
        );

      case tabLabels.description:
        return (
          <Suspense
            fallback={<Loader color={colorTheme.darkColor} height="700px" />}
          >
            <DescriptionTab
              colorTheme={colorTheme}
              content={getContent<DescriptionContent>({
                content: content?.descriptionContent || [],
                mappingContent: descriptionContentSnack || [],
              })}
              productName={productName}
              ImageComponent={ImageComponent}
              chevronImageUrl={chevronImageUrl}
            />
          </Suspense>
        );

      case tabLabels.composition:
        return (
          <Suspense
            fallback={<Loader color={colorTheme.darkColor} height="700px" />}
          >
            <CompositionTab
              colorTheme={colorTheme}
              productName={productName}
              compositionImage={compositionImage}
            />
          </Suspense>
        );
    }
  };

  return (
    <div className="container mx-auto flex h-full w-full flex-col items-center px-4 py-8 sm:px-8 sm:py-10 xl:px-8 xl:py-[80px] ">
      <div
        style={{
          backgroundColor: colorTheme.middleColor,
          boxShadow: `0px 1px 1px 0px ${boxShadowColor}`,
        }}
        className="flex w-full max-w-[343px] justify-center space-x-2 rounded-lg border p-2 sm:w-auto  sm:max-w-none  sm:p-3"
      >
        {tabs.map((data, index) => {
          const backgroundColor =
            choosenTab == data ? colorTheme.darkColor : "white";
          const color = choosenTab == data ? "white" : colorTheme.darkColor;
          const borderColor = choosenTab == data ? "" : colorTheme.darkColor;

          return (
            <div
              style={{ backgroundColor, color, borderColor }}
              className={`${
                choosenTab == data ? "" : "border"
              } flex w-1/3 cursor-pointer items-center justify-center  rounded-md py-1 sm:w-full sm:px-6`}
              key={index}
              onClick={() => setChoosenTab(data)}
            >
              <p className="text-center font-inter text-[12px] font-medium leading-[normal] sm:text-[15px]">
                {data}
              </p>
            </div>
          );
        })}
      </div>

      {renderTabs()}
    </div>
  );
}
