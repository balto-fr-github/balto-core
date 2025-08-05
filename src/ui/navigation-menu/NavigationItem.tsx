import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { TextBody } from "../typography";

export const navigationItemVariants = cva(
  "text-primary flex items-center rounded transition-colors ease-in-out hover:bg-bright-blue-10 active:bg-bright-blue-20",
  {
    variants: {
      variant: {
        default: "",
        selected: "bg-bright-blue-5 active:!bg-bright-blue-20",
        disabled:
          "disabled:bg-bright-blue-5 disabled:pointer-events-none disabled:text-disabled disabled:cursor-not-allowed",
      },
      layout: {
        expanded: "flex-row w-[245px] gap-2 p-3",
        collapsed: "flex-col justify-center w-[100px] gap-1.5 px-0.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      layout: "expanded",
    },
  }
);

export interface NavigationItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationItemVariants> {
  icon: React.ReactNode;
  label: string;
  iconClassName?: string;
  dividerClassName?: string;
  isSelected?: boolean;
  withDivider?: boolean;
  mode?: "desktop" | "mobile";
}

export const NavigationItem = forwardRef<
  HTMLButtonElement,
  NavigationItemProps
>((props, ref) => {
  const {
    icon,
    label,
    className,
    iconClassName,
    dividerClassName,
    layout,
    isSelected,
    disabled,
    onClick,
    withDivider,
    mode,
    ...rest
  } = props;

  const computedVariant = disabled
    ? "disabled"
    : isSelected
    ? "selected"
    : props.variant ?? "default";

  return (
    <>
      <button
        type="button"
        ref={ref}
        className={cn(
          navigationItemVariants({ variant: computedVariant, layout }),
          className
        )}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        <div
          role="presentation"
          className={cn("w-4 aspect-square text-inherit", iconClassName)}
        >
          {icon}
        </div>
        {layout === "expanded" ? (
          <TextBody size="sm" className="text-inherit">
            {label}
          </TextBody>
        ) : (
          <p className="text-[10px] leading-[18px] tracking-[0.6px] font-inter">
            {label}
          </p>
        )}
      </button>
      {withDivider && mode !== "mobile" && (
        <hr
          className={cn(
            "border-neutral-10 mx-auto",
            layout === "expanded" ? "w-[245px]" : "w-[100px]",
            dividerClassName
          )}
        />
      )}
    </>
  );
});

NavigationItem.displayName = "NavigationItem";
