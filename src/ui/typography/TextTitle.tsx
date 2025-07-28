import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const textTitleVariants = cva("font-mackinac", {
  variants: {
    size: {
      sm: "text-[14px] leading-[18px] md:text-[16px] md:leading-[22px]",
      md: "text-[16px] leading-[20px] md:text-[18px] md:leading-[24px]",
    },
    weight: {
      regular: "font-normal tracking-[0px]",
      italic: "italic font-bold tracking-[0.1px] md:tracking-[0.3px]",
      bold: "font-bold tracking-[0px] md:tracking-[-0.1px]",
      link: "underline font-bold decoration-neutral-70 tracking-[0px]",
    },
    useDefaultColor: {
      true: "text-primary",
      false: "",
    },
  },
  compoundVariants: [
    {
      size: "md",
      weight: "link",
      className:
        "underline-offset-[1.28px] decoration-[0.96px] md:decoration-[1.08px] md:underline-offset-[1.44px]",
    },
    {
      size: "sm",
      weight: "link",
      className:
        "underline-offset-[1.12px] decoration-[0.84px] md:decoration-[0.96px] md:underline-offset-[1.28px]",
    },
  ],
  defaultVariants: {
    size: "md",
    weight: "regular",
    useDefaultColor: true,
  },
});

export interface TextTitleProps extends VariantProps<typeof textTitleVariants> {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const TextTitle = ({
  as = "h4",
  size,
  weight,
  useDefaultColor,
  className,
  children,
  ...props
}: TextTitleProps) => {
  const Comp = as as any;

  return (
    <Comp
      className={cn(
        textTitleVariants({ size, weight, useDefaultColor }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
