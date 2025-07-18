import React, { useState } from "react";

import { cn } from "../../utils/cn";

interface QuantitySelectorProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const PlusIcon = ({
  className,
  strokeColor = "#272727",
}: {
  className?: string;
  strokeColor?: string;
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.99992 3.33334V12.6667M3.33325 8H12.6666"
      stroke={strokeColor}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const MinusIcon = ({
  className,
  strokeColor = "#ABABAB",
}: {
  className?: string;
  strokeColor?: string;
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3.33325 8H12.6666"
      stroke={strokeColor}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialValue = 1,
  min = 1,
  max = 999,
  onChange,
  className,
}) => {
  const [quantity, setQuantity] = useState(initialValue);
  const isMinusDisabled = quantity <= min;
  const isPlusDisabled = quantity >= max;

  const handleDecrease = () => {
    const newValue = Math.max(min, quantity - 1);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, quantity + 1);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    setQuantity(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border border-[#E3E3E3] rounded-[4px] px-3 gap-2.5 h-8",
        className
      )}
    >
      <button
        onClick={handleDecrease}
        disabled={isMinusDisabled}
        className="disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <MinusIcon strokeColor={isMinusDisabled ? "#ABABAB" : "#272727"} />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="text-center w-3.5 text-[14px] tracking-[0.3px] font-semibold font-inter border-none outline-none focus:ring-0 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity"
      />

      <button
        onClick={handleIncrease}
        disabled={isPlusDisabled}
        className="disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <PlusIcon
          strokeColor={isPlusDisabled ? "#ABABAB" : "#272727"}
          className={isPlusDisabled ? "opacity-50" : ""}
        />
      </button>
    </div>
  );
};

export default QuantitySelector;
