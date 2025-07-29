import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const textCaptionVariants = cva("font-inter", {
  variants: {
    size: {
      md: "text-[12px] leading-[12px] md:text-[12px] md:leading-[14px]",
    },
    weight: {
      regular: "font-normal",
      semibold: "font-semibold",
    },
    italic: {
      true: "italic",
      false: "",
    },
    isLink: {
      true: "underline font-semibold underline-offset-[1.2px] decoration-[0.72px] decoration-neutral-70",
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
      isLink: false,
      isUppercase: false,
      class: "tracking-[0.2px] md:tracking-[0.6px]",
    },
    {
      size: "md",
      italic: true,
      class: "tracking-[0.4px] md:tracking-[0.8px]",
    },
    {
      size: "md",
      weight: "semibold",
      class: "tracking-[0.2px] md:tracking-[0.6px]",
    },
    {
      size: "md",
      isLink: true,
      class: "tracking-[0.2px] md:tracking-[0.6px]",
    },
    {
      size: "md",
      isUppercase: true,
      class: "tracking-[0.2px] md:tracking-[0.6px]",
    },
  ],
});

export interface TextCaptionProps
  extends VariantProps<typeof textCaptionVariants> {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export const TextCaption = ({
  as = "span",
  size,
  weight,
  italic = false,
  isLink = false,
  isUppercase = false,
  useDefaultColor,
  className,
  children,
  ...props
}: TextCaptionProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(
        textCaptionVariants({
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
