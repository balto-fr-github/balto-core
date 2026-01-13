import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { toggleVariants } from "../toggle";

export const switchVariants = cva(
  "inline-flex items-center rounded-full transition-all duration-200",
  {
    variants: {
      size: {
        sm: "w-[40px] h-[20px] p-[2px]",
        lg: "w-[44px] h-[24px] p-[2px]",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        disabled: false,
        checked: false,
        class: "bg-[#C8C8C8]",
      },
      {
        disabled: false,
        checked: true,
        class: "bg-[#015BD6]",
      },
      {
        disabled: true,
        checked: true,
        class: "bg-[#B6D0FC]",
      },
      {
        disabled: true,
        checked: false,
        class: "bg-[#F2F2F2]",
      },
    ],
    defaultVariants: {
      size: "lg",
      disabled: false,
      checked: false,
    },
  }
);

export type SwitchProps = {
  checked: boolean;
  onChange:
    | ((checked: boolean) => void)
    | React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
} & VariantProps<typeof switchVariants> &
  React.ComponentPropsWithoutRef<"button">;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { checked, onChange, disabled = false, size = "lg", className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(switchVariants({ size, disabled, checked }), className)}
        {...props}
      >
        <span
          className={cn(
            "bg-white rounded-full transition-all duration-200",
            checked ? "translate-x-5" : "translate-x-0",
            size === "sm" ? "w-4 h-4" : "w-5 h-5"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";
