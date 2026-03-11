import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { CheckIcon } from "./CheckIcon";

export const checkboxVariants = cva(
  "inline-flex items-center justify-center rounded-[4px] transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#272727]",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
      checked: {
        true: "p-px",
        false: "",
      },
    },
    compoundVariants: [
      {
        disabled: false,
        checked: false,
        class: "bg-white border border-[#ababab] hover:bg-[#f2f2f2]",
      },
      {
        disabled: false,
        checked: true,
        class: "bg-[#272727] hover:bg-[#5e5e5e]",
      },
      {
        disabled: true,
        checked: false,
        class: "bg-[#e3e3e3]",
      },
      {
        disabled: true,
        checked: true,
        class: "bg-[#ababab]",
      },
    ],
    defaultVariants: {
      disabled: false,
      checked: false,
    },
  }
);

export type CheckboxProps = {
  checked: boolean;
  onChange?: ((checked: boolean) => void) | React.Dispatch<React.SetStateAction<boolean>>;
  size?: number;
  className?: string;
  iconClassName?: string;
} & Omit<VariantProps<typeof checkboxVariants>, "checked" | "disabled"> &
  Omit<React.ComponentPropsWithoutRef<"button">, "onChange">;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      onChange,
      disabled = false,
      size = 18,
      className,
      iconClassName,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(checkboxVariants({ disabled, checked }), className)}
        style={{ width: size, height: size }}
        {...props}
      >
        {checked && (
          <CheckIcon className={cn("w-full h-full", iconClassName)} />
        )}
      </button>
    );
  }
);

Checkbox.displayName = "Checkbox";
