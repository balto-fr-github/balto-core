import { cva } from "class-variance-authority";

export const inputPhoneContainerStyles = cva("relative space-y-1");

export const inputPhoneLabelStyles = cva("text-primary transition-colors", {
  variants: {
    error: {
      true: "text-error-60",
    },
    disabled: {
      true: "text-disabled",
    },
  },
});

export const inputPhoneWrapperStyles = cva(
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
    },
  }
);

export const inputPhoneDropdownToggleStyles = cva(
  "relative flex items-center pl-3 pr-2 cursor-pointer select-none gap-1",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed",
      },
    },
  }
);

export const inputPhoneFieldStyles = cva(
  "flex-1 bg-transparent outline-none text-sm px-2 py-[14px] w-full",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed",
      },
      clearable: {
        true: "pr-8",
      },
    },
  }
);
