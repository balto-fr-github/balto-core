import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const topBarVariants = cva(
  "flex items-center justify-between border-b border-core-neutral-grey-300 sticky top-0 z-40 bg-white",
  {
    variants: {
      variant: {
        lp: "px-[90px] py-5",
        cp: "px-4 md:px-[66px] py-4 md:py-5",
      },
    },
    defaultVariants: {
      variant: "lp",
    },
  }
);

export interface TopBarProps extends VariantProps<typeof topBarVariants> {
  logo?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const TopBar = ({ variant, logo, className }: TopBarProps) => {
  return (
    <div className={cn(topBarVariants({ variant }), className)}>{logo}</div>
  );
};
