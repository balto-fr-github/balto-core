import { cva } from "class-variance-authority";

export const inputDropdownContainerStyles = cva("relative space-y-1");

export const inputDropdownLabelStyles = cva("text-primary transition-colors", {
  variants: {
    error: {
      true: "text-error-60",
    },
    disabled: {
      true: "text-disabled",
    },
  },
});

export const inputDropdownWrapperStyles = cva(
  "relative flex items-center border rounded w-full transition-colors",
  {
    variants: {
      error: {
        true: "border-error-60",
        false: "border-neutral-30",
      },
      disabled: {
        true: "bg-neutral-00 text-disabled border-neutral-10",
      },
      active: {
        true: "border-neutral-90",
      },
    },
  }
);

export const inputDropdownToggleStyles = cva(
  "relative flex items-center px-3 py-[14px] cursor-pointer select-none gap-2 w-full",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed",
      },
    },
  }
);

export const inputDropdownFieldStyles = cva(
  "flex-1 bg-transparent outline-none text-sm px-2 py-[14px] w-full",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed",
      },
    },
  }
);
