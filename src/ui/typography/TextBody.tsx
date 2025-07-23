import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

type ElementType = keyof JSX.IntrinsicElements;

const textBodyVariants = cva("font-inter text-primary", {
  variants: {
    size: {
      sm: "text-[12px] leading-[22px] md:text-[14px] md:leading-[24px]",
      md: "text-[14px] leading-[23px] md:text-[16px] md:leading-[25px]",
      lg: "text-[16px] leading-[24px] md:text-[18px] md:leading-[26px]",
      "2xl": "text-[24px] leading-[30px] md:text-[30px] md:leading-[38px]",
    },
    weight: {
      regular: "font-normal",
      italic: "italic font-normal",
      medium: "font-medium",
      link: "font-medium underline decoration-neutral-70",
      semibold: "font-semibold",
    },
  },
  compoundVariants: [
    {
      size: "sm",
      weight: "regular",
      className: "md:tracking-[0.2px]",
    },
    { size: "2xl", weight: "italic", className: "tracking-[0.3px]" },
    {
      size: "lg",
      weight: "italic",
      className: "tracking-[0.1px] md:tracking-[0.3px]",
    },
    {
      size: "md",
      weight: "italic",
      className: "tracking-[0.1px] md:tracking-[0.3px]",
    },
    {
      size: "sm",
      weight: "italic",
      className: "tracking-[0.1px] md:tracking-[0.5px]",
    },
    {
      size: "sm",
      weight: "link",
      className:
        "md:tracking-[0.2px] underline-offset-[0.96px] md:underline-offset-[1.12px] decoration-[0.72px] md:decoration-[0.84px]",
    },
    {
      size: "2xl",
      weight: "medium",
      className: "tracking-[0.1px]",
    },
    {
      size: "lg",
      weight: "medium",
      className: "md:tracking-[0.1px]",
    },
    {
      size: "md",
      weight: "medium",
      className: "md:tracking-[0.1px]",
    },
    {
      size: "sm",
      weight: "medium",
      className: "tracking-[0.1px] md:tracking-[0.3px]",
    },
    {
      size: "2xl",
      weight: "semibold",
      className: "tracking-[0.1px]",
    },
    {
      size: "lg",
      weight: "semibold",
      className: "md:tracking-[0.1px]",
    },
    {
      size: "md",
      weight: "semibold",
      className: "tracking-[0.1px]",
    },
    {
      size: "sm",
      weight: "semibold",
      className: "tracking-[0.1px] md:tracking-[0.3px]",
    },
    {
      size: "md",
      weight: "link",
      className:
        "decoration-[0.84px] underline-offset-[1.12px] md:decoration-[0.96px] md:underline-offset-[1.28px]",
    },
    {
      size: "lg",
      weight: "link",
      className:
        "decoration-[0.96px] underline-offset-[1.28px] md:decoration-[1.08px] md:underline-offset-[1.44px]",
    },
    {
      size: "2xl",
      weight: "link",
      className:
        "decoration-[1.44px] underline-offset-[1.92px] md:decoration-[1.8px] md:underline-offset-[2.4px]",
    },
  ],
  defaultVariants: {
    size: "md",
    weight: "regular",
  },
});

export interface TextBodyProps extends VariantProps<typeof textBodyVariants> {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const TextBody = ({
  as = "p",
  size,
  weight,
  className,
  children,
  ...props
}: TextBodyProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(textBodyVariants({ size, weight }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
