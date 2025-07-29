import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const textHeadingVariants = cva("font-mackinac", {
  variants: {
    weight: {
      regular: "font-normal",
      bold: "font-bold",
    },
    italic: {
      true: "italic",
      false: "",
    },
    size: {
      sm: "md:text-[24px] md:leading-[30px] text-[20px] leading-[26px]",
      md: "md:text-[30px] md:leading-[38px] text-[24px] leading-[30px]",
      lg: "md:text-[40px] md:leading-[50px] text-[32px] leading-[40px]",
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
      class: "tracking-[0.1px] md:tracking-[0.2px]",
    },
    {
      size: "sm",
      italic: true,
      class: "tracking-[0.2px]",
    },
    {
      size: "sm",
      weight: "bold",
      italic: false,
      class: "tracking-[0.1px] md:tracking-[0.4px]",
    },
    {
      size: "md",
      weight: "regular",
      italic: false,
      class: "tracking-[0px]",
    },
    {
      size: "md",
      italic: true,
      class: "tracking-[0.1px]",
    },
    {
      size: "md",
      weight: "bold",
      italic: false,
      class: "tracking-[0px] md:tracking-[0.2px]",
    },

    {
      size: "lg",
      weight: "regular",
      italic: false,
      class: "tracking-[0px]",
    },
    {
      size: "lg",
      italic: true,
      class: "tracking-[0.1px]",
    },
    {
      size: "lg",
      weight: "bold",
      italic: false,
      class: "tracking-[0px] md:tracking-[0.2px]",
    },
  ],
  defaultVariants: {
    weight: "regular",
    size: "lg",
    italic: false,
    useDefaultColor: true,
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
  useDefaultColor,
  className,
  italic = false,
}: TextHeadingProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(
        textHeadingVariants({ weight, size, useDefaultColor, italic }),
        className
      )}
    >
      {children}
    </Comp>
  );
};
