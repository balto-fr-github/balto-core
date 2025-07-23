import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

type ElementType = keyof JSX.IntrinsicElements;

const textCaptionVariants = cva("font-inter text-primary", {
  variants: {
    size: {
      md: "text-[10px] leading-[12px] md:text-[12px] md:leading-[18px]",
    },
    weight: {
      regular: "font-normal",
      italic: "italic font-normal",
      semibold: "font-semibold",
      link: "underline font-semibold underline-offset-[1.2px] decoration-[0.72px] decoration-neutral-70",
      uppercase: "uppercase font-normal",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
  },
  compoundVariants: [
    {
      size: "md",
      weight: "regular",
      class: "tracking-[0.2px] md:tracking-[0.6px]",
    },
    {
      size: "md",
      weight: "italic",
      class: "tracking-[0.4px] md:tracking-[0.8px]",
    },
    {
      size: "md",
      weight: "semibold",
      class: "tracking-[0.2px] md:tracking-[0.6px]",
    },
    {
      size: "md",
      weight: "link",
      class: "tracking-[0.2px] md:tracking-[0.6px]",
    },
    {
      size: "md",
      weight: "uppercase",
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
  className,
  children,
  ...props
}: TextCaptionProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(textCaptionVariants({ size, weight }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
