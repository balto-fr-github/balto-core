import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

type ElementType = keyof JSX.IntrinsicElements;

export const textBodyVariants = cva("font-inter", {
  variants: {
    size: {
      sm: "text-[12px] leading-[20px] md:text-[14px] md:leading-[22px]",
      md: "text-[14px] leading-[21px] md:text-[16px] md:leading-[23px]",
      lg: "text-[16px] leading-[22px] md:text-[18px] md:leading-[24px]",
      "2xl": "text-[24px] leading-[28px] md:text-[30px] md:leading-[36px]",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    italic: {
      true: "italic",
      false: "",
    },
    isLink: {
      true: "underline font-medium decoration-neutral-70",
      false: "",
    },
    useDefaultColor: {
      true: "text-primary",
      false: "",
    },
  },
  compoundVariants: [
    {
      size: "sm",
      weight: "regular",
      italic: false,
      class: "md:tracking-[0.2px]",
    },

    { size: "2xl", italic: true, class: "tracking-[0.3px]" },
    { size: "lg", italic: true, class: "tracking-[0.1px] md:tracking-[0.3px]" },
    { size: "md", italic: true, class: "tracking-[0.1px] md:tracking-[0.3px]" },
    { size: "sm", italic: true, class: "tracking-[0.1px] md:tracking-[0.5px]" },

    {
      size: "sm",
      isLink: true,
      class:
        "tracking-[0px] md:tracking-[0.2px] underline-offset-[0.96px] decoration-[0.72px] md:decoration-[0.84px] md:underline-offset-[1.12px]",
    },
    {
      size: "md",
      isLink: true,
      class:
        "tracking-[0px] decoration-[0.84px] underline-offset-[1.12px] md:decoration-[0.96px] md:underline-offset-[1.28px]",
    },
    {
      size: "lg",
      isLink: true,
      class:
        "tracking-[0px] decoration-[0.96px] underline-offset-[1.28px] md:decoration-[1.08px] md:underline-offset-[1.44px]",
    },
    {
      size: "2xl",
      isLink: true,
      class:
        "tracking-[0px] decoration-[1.44px] underline-offset-[1.92px] md:decoration-[1.8px] md:underline-offset-[2.4px]",
    },

    { size: "2xl", weight: "medium", italic: false, class: "tracking-[0.1px]" },
    {
      size: "lg",
      weight: "medium",
      italic: false,
      class: "md:tracking-[0.1px]",
    },
    {
      size: "md",
      weight: "medium",
      italic: false,
      class: "md:tracking-[0.1px]",
    },
    {
      size: "sm",
      weight: "medium",
      italic: false,
      class: "tracking-[0.1px] md:tracking-[0.3px]",
    },

    {
      size: "2xl",
      weight: "semibold",
      italic: false,
      class: "tracking-[0.1px]",
    },
    {
      size: "lg",
      weight: "semibold",
      italic: false,
      class: "md:tracking-[0.1px]",
    },
    {
      size: "md",
      weight: "semibold",
      italic: false,
      class: "tracking-[0.1px]",
    },
    {
      size: "sm",
      weight: "semibold",
      italic: false,
      class: "tracking-[0.1px] md:tracking-[0.3px]",
    },
  ],
  defaultVariants: {
    size: "md",
    weight: "regular",
    italic: false,
    isLink: false,
    useDefaultColor: true,
  },
});

export interface TextBodyProps extends VariantProps<typeof textBodyVariants> {
  as?: ElementType;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const TextBody = ({
  as = "p",
  size,
  weight,
  italic = false,
  isLink = false,
  useDefaultColor,
  className,
  children,
  ...props
}: TextBodyProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(
        textBodyVariants({ size, weight, italic, isLink, useDefaultColor }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
