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
};

const Qna = ({ question, answer, colorTheme, onClick, isOpen }: Props) => {
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
          >
            {question}
          </span>

          <span
            className="icon relative h-[28px] w-[28px] rounded-full bg-success-300 text-dark-green transition-transform duration-300"
            style={{
              backgroundColor: colorTheme?.middleColor,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
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
          <div className="qna-item overflow-hidden pt-4 leading-[19.2px] text-neutral-grey-100 flex flex-col gap-3">
            {answer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Qna;
