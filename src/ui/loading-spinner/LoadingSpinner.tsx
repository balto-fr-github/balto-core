import { HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export interface LoadingSpinnerProps extends HTMLAttributes<SVGElement> {
  size?: "sm" | "md" | "lg" | number;
  color?: "current" | "primary" | "secondary" | "white" | "error";
  speed?: "slow" | "normal" | "fast";
}

const spinnerSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const spinnerColors = {
  current: "text-current",
  primary: "text-neutral-default",
  secondary: "text-neutral-60",
  white: "text-white",
  error: "text-error-default",
};

const spinnerSpeeds = {
  slow: "animate-spin duration-[2000ms]",
  normal: "animate-spin",
  fast: "animate-spin duration-500",
};

export const LoadingSpinner = ({
  size = "md",
  color = "current",
  speed = "normal",
  className,
  style,
  ...props
}: LoadingSpinnerProps) => {
  const getSizeClasses = () => {
    if (typeof size === "number") {
      return "";
    }
    return spinnerSizes[size as keyof typeof spinnerSizes];
  };

  const getCustomSizeStyle = () => {
    if (typeof size === "number") {
      return {
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      };
    }
    return style;
  };

  return (
    <svg
      className={cn(
        spinnerSpeeds[speed],
        getSizeClasses(),
        spinnerColors[color],
        className
      )}
      style={getCustomSizeStyle()}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
