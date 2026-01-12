import * as React from "react";

import { cn } from "../../../utils/cn";
import { IconMinus } from "./IconMinus";
import { IconPlus } from "./IconPlus";

type Theme = {
  lightColor: string;
  middleColor: string;
  darkColor: string;
};

type Props = {
  isOpen: boolean;
  question: string;
  answer: React.ReactNode;
  colorTheme?: Theme;
  onClick: () => void;
  index: number;
};

const Qna = ({
  question,
  answer,
  colorTheme,
  onClick,
  isOpen,
  index,
}: Props) => {
  return (
    <>
      <div
        className={cn(
          "qna-item w-full cursor-pointer border-b border-b-success-300 pb-4"
        )}
        onClick={onClick}
        style={{
          borderColor: colorTheme?.lightColor,
        }}
        data-test="pdp-faq-question"
        data-desc="FAQ question"
        data-index={index}
      >
        <div
          className={cn(
            "gap-8 text-left font-medium",
            "md:py-1",
            "flex w-full items-center justify-between"
          )}
        >
          <span
            className={cn(
              "flex-1 font-semibold leading-[110%]",
              "md:text-lg md:leading-[110%]"
            )}
            data-test="pdp-faq-question-text"
            data-desc="Question text"
            data-index={index}
          >
            {question}
          </span>

          <span
            className="icon relative h-[28px] w-[28px] rounded-full bg-success-300 text-dark-green transition-transform duration-300"
            style={{
              backgroundColor: colorTheme?.middleColor,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
            data-test="pdp-faq-toggle-icon"
            data-desc="Plus / minus icon"
            data-index={index}
          >
            {isOpen ? (
              <IconMinus
                className="absolute h-[19px] w-[20px]"
                color={colorTheme?.darkColor ?? "#155634"}
              />
            ) : (
              <IconPlus
                className="absolute h-[19px] w-[20px]"
                color={colorTheme?.darkColor ?? "#155634"}
              />
            )}
          </span>
        </div>
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-500 ease-out"
          )}
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
          }}
        >
          <div
            className="qna-item overflow-hidden pt-4 leading-[19.2px] text-neutral-grey-100 flex flex-col gap-3"
            data-test="pdp-faq-answer"
            data-desc="FAQ answer content"
            data-index={index}
          >
            {answer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Qna;
