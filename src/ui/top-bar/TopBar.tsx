import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

const topBarVariants = cva(
  "flex items-center justify-between border-b border-core-neutral-grey-300 sticky top-0 z-40 bg-white",
  {
    variants: {
      variant: {
        landingPage: "px-[90px] py-5",
        customerPortal: "px-4 md:px-[66px] py-4 md:py-5",
      },
    },
    defaultVariants: {
      variant: "landingPage",
    },
  }
);

export interface TopBarProps extends VariantProps<typeof topBarVariants> {
  as?: keyof JSX.IntrinsicElements;
  logo?: ReactNode;
  className?: string;
}

export const TopBar = ({
  as: Tag = "div",
  variant,
  logo,
  className,
}: TopBarProps) => {
  return (
    <Tag className={cn(topBarVariants({ variant }), className)}>{logo}</Tag>
  );
};
