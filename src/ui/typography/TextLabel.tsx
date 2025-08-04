import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

export const textLabelVariants = cva("font-mackinac leading-[100%]", {
  variants: {
    size: {
      md: "text-[12px]",
      lg: "text-[13px] md:text-[14px]",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    italic: {
      true: "italic",
      false: "",
    },
    isLink: {
      true: "underline font-bold decoration-neutral-70",
      false: "",
    },
    isUppercase: {
      true: "uppercase",
      false: "",
    },
    useDefaultColor: {
      true: "text-primary",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
    italic: false,
    isLink: false,
    isUppercase: false,
    useDefaultColor: true,
  },
  compoundVariants: [
    {
      size: "md",
      weight: "regular",
      italic: false,
      class: "md:tracking-[0.2px]",
    },
    {
      size: "lg",
      weight: "regular",
      italic: false,
      class: "tracking-[0.2px] md:tracking-[0.4px]",
    },

    { size: "md", italic: true, class: "tracking-[0.2px] md:tracking-[0.4px]" },
    { size: "lg", italic: true, class: "tracking-[0.4px] md:tracking-[0.6px]" },

    {
      size: "md",
      weight: "medium",
      italic: false,
      class: "md:tracking-[0.2px]",
    },
    {
      size: "lg",
      weight: "medium",
      italic: false,
      class: "tracking-[0.2px] md:tracking-[0.4px]",
    },

    {
      size: "md",
      isLink: true,
      class:
        "md:tracking-[0.2px] underline-offset-[0.8px] decoration-[0.6px] md:decoration-[0.72px] md:underline-offset-[0.96px]",
    },
    {
      size: "lg",
      isLink: true,
      class:
        "tracking-[0.2px] md:tracking-[0.4px] underline-offset-[0.96px] md:underline-offset-[1.12px] decoration-[0.72px] md:decoration-[0.84px]",
    },

    { size: "md", isUppercase: true, class: "md:tracking-[0.2px]" },
    {
      size: "lg",
      isUppercase: true,
      class: "tracking-[0.2px] md:tracking-[0.4px]",
    },
  ],
});

export interface TextLabelProps extends VariantProps<typeof textLabelVariants> {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const TextLabel = ({
  as = "label",
  size,
  weight,
  italic = false,
  isLink = false,
  isUppercase = false,
  useDefaultColor,
  className,
  children,
  ...props
}: TextLabelProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(
        textLabelVariants({
          size,
          weight,
          italic,
          isLink,
          isUppercase,
          useDefaultColor,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
