import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

type ElementType = keyof JSX.IntrinsicElements;

const textLabelVariants = cva("font-mackinac text-primary", {
  variants: {
    size: {
      md: "text-[10px] leading-[12px] md:text-[12px] md:leading-[18px]",
      lg: "text-[12px] leading-[14px] md:text-[14px]",
    },
    weight: {
      regular: "font-normal",
      italic: "italic font-semibold",
      medium: "font-medium",
      link: "underline font-medium decoration-neutral-70",
      uppercase: "uppercase font-normal",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "regular",
  },
  compoundVariants: [
    { size: "md", weight: "regular", class: "md:tracking-[0.2px]" },
    {
      size: "md",
      weight: "italic",
      class: "tracking-[0.2px] md:tracking-[0.4px]",
    },
    { size: "md", weight: "medium", class: "md:tracking-[0.2px]" },
    {
      size: "md",
      weight: "link",
      class:
        "md:tracking-[0.2px] underline-offset-[0.8px] decoration-[0.6px] md:decoration-[0.72px] md:underline-offset-[0.96px]",
    },
    { size: "md", weight: "uppercase", class: "md:tracking-[0.2px]" },
    {
      size: "lg",
      weight: "regular",
      class: "tracking-[0.2px] md:tracking-[0.4px]",
    },
    {
      size: "lg",
      weight: "italic",
      class: "tracking-[0.4px] md:tracking-[0.6px]",
    },
    {
      size: "lg",
      weight: "medium",
      class: "tracking-[0.2px] md:tracking-[0.4px]",
    },
    {
      size: "lg",
      weight: "link",
      class:
        "tracking-[0.2px] md:tracking-[0.4px] underline-offset-[0.96px] md:underline-offset-[1.12px] decoration-[0.72px] md:decoration-[0.84px]",
    },
    {
      size: "lg",
      weight: "uppercase",
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
  className,
  children,
  ...props
}: TextLabelProps) => {
  const Comp = as;

  return (
    <Comp
      className={cn(textLabelVariants({ size, weight }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
