import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";

const DefaultBadge = () => (
  <span className="px-2 py-1 rounded-[99px] text-primary bg-warning-40 text-[10px] leading-[12px] font-medium tracking-[0.2px] md:text-[12px] md:tracking-[0.4px] font-mackinac italic">
    Default
  </span>
);

const cardVariants = cva(
  "flex justify-between p-3 rounded-lg border transition-colors duration-200 gap-2 bg-neutral-00 border-neutral-10",
  {
    variants: {
      variant: {
        default: "items-center",
        inverted: "items-center",
        payment: "items-center",
        address: "items-start",
      },
      size: {
        desktop: "flex-row gap-4",
        mobile: "flex-col gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "desktop",
    },
  }
);

const cardMainTextVariants = cva("font-inter", {
  variants: {
    variant: {
      default:
        "text-[12px] text-light leading-[12px] md:leading-[18px] tracking-[0.2px] md:tracking-[0.6px]",
      inverted:
        "text-primary text-[14px] leading-[21px] font-medium md:text-[16px] md:leading-[23px] md:tracking-[0.1px]",
      payment:
        "text-primary text-[14px] leading-[21px] font-medium md:text-[16px] md:leading-[23px] md:tracking-[0.1px]",
      address:
        "text-primary text-[12px] leading-[14px] font-medium tracking-[0.1px] md:text-[16px] md:leading-[23px]",
    },
  },
});

const cardSecondaryTextVariants = cva("font-inter", {
  variants: {
    variant: {
      default:
        "text-primary text-[14px] leading-[21px] font-medium md:text-[16px] md:leading-[23px] md:tracking-[0.1px]",
      inverted:
        "text-light text-[12px] leading-[20px] md:leading-[18px] md:tracking-[0.6px]",
      payment:
        "text-[12px] leading-[12px] text-light tracking-[0.2px] md:leading-[18px] md:tracking-[0.6px]",
      address:
        "text-light text-[12px] leading-[20px] md:text-[14px] md:leading-[22px] md:tracking-[0.2px]",
    },
  },
});

type SelectableCardProps = {
  icon?: React.ReactNode;
  mainText?: string;
  secondaryText?: string;
  label?: string;
  editable?: boolean;
  defaultBadge?: boolean;
  subtext?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  iconContainerClassName?: string;
  mainTextClassName?: string;
  secondaryTextClassName?: string;
  editIcon?: React.ReactNode;
} & VariantProps<typeof cardVariants> &
  React.ComponentPropsWithoutRef<"div">;

export const SelectableCard = forwardRef<HTMLDivElement, SelectableCardProps>(
  (
    {
      icon,
      mainText,
      secondaryText,
      label,
      editable,
      defaultBadge,
      subtext,
      variant,
      size,
      onClick,
      className,
      iconContainerClassName,
      mainTextClassName,
      secondaryTextClassName,
      editIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        className={cn(cardVariants({ variant, size }), className)}
        {...props}
      >
        <div className={cn("flex gap-2 flex-1")}>
          {icon && (
            <div
              className={cn(
                "rounded-[4px] bg-info-10 w-[38px] h-[38px] flex-shrink-0 flex items-center justify-center",
                iconContainerClassName
              )}
            >
              {icon}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {mainText && (
                <span
                  className={cn(
                    cardMainTextVariants({ variant }),
                    mainTextClassName
                  )}
                >
                  {mainText}
                </span>
              )}
              {defaultBadge && <DefaultBadge />}
            </div>

            {secondaryText && (
              <p
                className={cn(
                  cardSecondaryTextVariants({ variant }),
                  secondaryTextClassName
                )}
              >
                {secondaryText}
              </p>
            )}

            {subtext && subtext}
          </div>
        </div>

        {label && (
          <div className="flex items-center gap-1 p-2 text-primary text-[12px] leading-[14px] font-medium tracking-[0.1px] md:text-[14px] md:leading-[20px] md:tracking-[0.3px] flex-shrink-0">
            {editable && editIcon}
            <p>{label}</p>
          </div>
        )}
      </div>
    );
  }
);

SelectableCard.displayName = "SelectableCard";
