import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const displayHeadingVariants = cva("font-mackinac text-primary", {
  variants: {
    weight: {
      regular: "font-normal tracking-[0px]",
      italic: "italic font-bold tracking-[0.2px] md:tracking-[0.4px]",
      bold: "font-bold tracking-[0px] md:tracking-[0.2px]",
    },
    size: {
      xl: "md:text-[60px] md:leading-[72px] text-[40px] leading-[50px]",
    },
  },
  defaultVariants: {
    weight: "regular",
    size: "xl",
  },
});

type Props = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
} & VariantProps<typeof displayHeadingVariants>;

export const DisplayHeading = ({
  children,
  as = "h1",
  weight,
  size,
  className,
}: Props) => {
  const Comp = as;

  return (
    <Comp className={cn(displayHeadingVariants({ weight, size }), className)}>
      {children}
    </Comp>
  );
};
