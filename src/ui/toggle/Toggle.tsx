import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const toggleVariants = cva(
  "inline-flex items-center rounded-full transition-all duration-200",
  {
    variants: {
      size: {
        small: "w-[40px] h-[20px] p-[2px]",
        large: "w-[44px] h-[24px] p-[2px]",
      },
      disabled: {
        true: "bg-gray-200 cursor-not-allowed",
        false: "bg-black cursor-pointer",
      },
    },
    compoundVariants: [
      {
        disabled: false,
        className: "hover:bg-neutral-700",
      },
    ],
    defaultVariants: {
      size: "large",
      disabled: false,
    },
  }
);

type ToggleProps = {
  checked: boolean;
  onChange:
    | ((checked: boolean) => void)
    | React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
} & VariantProps<typeof toggleVariants> &
  React.ComponentPropsWithoutRef<"button">;

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      size = "large",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          toggleVariants({ size, disabled: String(disabled) as any }),
          checked ? "bg-neutral-90" : "bg-neutral-10",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "bg-white rounded-full transition-all duration-200",
            checked ? "translate-x-5" : "translate-x-0",
            size === "small" ? "w-4 h-4" : "w-5 h-5"
          )}
        />
      </button>
    );
  }
);

Toggle.displayName = "Toggle";
