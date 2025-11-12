import React, { memo, useRef, useState } from "react";

import { cn } from "../../../utils/cn";
import Qna from "./QNA";

export type ThemeLike = {
  darkColor: string;
  middleColor: string;
  lightColor: string;
  accentColor: string;
  weightSelectorLightColor?: string;
  weightSelectorMiddleColor?: string;
};

export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type ClassNames = Partial<{
  root: string;
  container: string;
  title: string;
  subtitle: string;
  listOuter: string;
  listInner: string;
}>;

export type FaqHeaderProps = {
  title?: string;
  subtitle?: React.ReactNode;
  email?: string;
  showVetBadge?: boolean;
};

export type FaqSectionProps = {
  colorTheme?: ThemeLike;
  items?: FaqItem[];
  classNames?: ClassNames;
  title: string;
  subtitle: string;
};

function FaqHeader({
  title = "Questions fréquentes",
  subtitle,
  classNames,
}: FaqHeaderProps & { classNames?: ClassNames }) {
  return (
    <>
      <h2
        className={cn(
          "text-center font-mackinac text-[33px] font-medium leading-none tracking-[-0.02em] text-white md:text-[40px] md:tracking-[-0.8px] xl:text-[48px] xl:tracking-[-0.96px]",
          classNames?.title
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-4 text-center font-medium leading-[19.36px] text-neutral-green-100 md:tracking-[-0.32px] xl:text-lg xl:leading-[21.78px] xl:tracking-[-0.36px]",
          classNames?.subtitle
        )}
      >
        {subtitle}
      </p>
    </>
  );
}

const FaqSection = memo(function FaqSection({
  colorTheme,
  items,
  classNames,
  title,
  subtitle,
}: FaqSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={(el) => (containerRef.current = el)}
      id="faq"
      className={cn("bg-dark-green text-base-white", classNames?.root)}
      style={{ backgroundColor: colorTheme?.darkColor }}
    >
      <div
        className={cn(
          "container mx-auto px-[16px] py-[32px] sm:px-[32px] sm:py-[40px] xl:px-[32px] xl:py-[80px]",
          classNames?.container
        )}
      >
        <FaqHeader classNames={classNames} title={title} subtitle={subtitle} />

        <div className="mt-10 md:mt-[52px] lg:px-4">
          <div className="flex w-full justify-center">
            <div
              className={cn(
                "flex w-full flex-col gap-3 md:gap-10",
                classNames?.listInner
              )}
            >
              {(items ?? []).map((faq, index) => (
                <Qna
                  key={index}
                  isOpen={openIndex === index}
                  question={faq.question}
                  answer={faq.answer}
                  onClick={() => handleToggle(index)}
                  colorTheme={colorTheme}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default FaqSection;
