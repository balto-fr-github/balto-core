import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const textHeadingVariants = cva("font-mackinac text-primary", {
  variants: {
    weight: {
      regular: "font-normal",
      italic: "italic font-semibold",
      bold: "font-bold",
    },
    size: {
      sm: "md:text-[24px] md:leading-[30px] text-[20px] leading-[26px] ",
      md: "md:text-[30px] md:leading-[38px] text-[24px] leading-[30px]",
      lg: "md:text-[40px] md:leading-[50px] text-[32px] leading-[40px]",
    },
  },
  compoundVariants: [
    {
      size: "sm",
      weight: "regular",
      className: "tracking-[0.1px] md:tracking-[0.2px]",
    },
    {
      size: "sm",
      weight: "italic",
      className: "tracking-[0.2px]",
    },
    {
      size: "sm",
      weight: "bold",
      className: "tracking-[0.1px] md:tracking-[0.4px]",
    },
    {
      size: "md",
      weight: "regular",
      className: "tracking-[0px]",
    },
    {
      size: "md",
      weight: "italic",
      className: "tracking-[0.1px]",
    },
    {
      size: "md",
      weight: "bold",
      className: "tracking-[0px] md:tracking-[0.2px]",
    },
    {
      size: "lg",
      weight: "regular",
      className: "tracking-[0px]",
    },
    {
      size: "lg",
      weight: "italic",
      className: "tracking-[0.1px]",
    },
    {
      size: "lg",
      weight: "bold",
      className: "tracking-[0px] md:tracking-[0.2px]",
    },
  ],
  defaultVariants: {
    weight: "regular",
    size: "lg",
  },
});

type TextHeadingProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
} & VariantProps<typeof textHeadingVariants>;

export const TextHeading = ({
  children,
  as = "h2",
  weight,
  size,
  className,
}: TextHeadingProps) => {
  const Comp = as;

  return (
    <Comp className={cn(textHeadingVariants({ weight, size }), className)}>
      {children}
    </Comp>
  );
};
