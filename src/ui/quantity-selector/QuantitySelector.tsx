import { cn } from "../../utils/cn";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 999,
  onChange,
  className,
}) => {
  const isMinusDisabled = value <= min;
  const isPlusDisabled = value >= max;

  const handleDecrease = () => {
    const newValue = Math.max(min, value - 1);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, value + 1);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value);
    if (!isNaN(raw)) {
      const clamped = Math.max(min, Math.min(max, raw));
      onChange(clamped);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const raw = parseInt(e.target.value);
    const clamped = Math.max(min, Math.min(max, isNaN(raw) ? min : raw));
    if (clamped !== value) {
      onChange(clamped);
    }
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
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
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
