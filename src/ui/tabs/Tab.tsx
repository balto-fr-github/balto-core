import { cn } from "../../utils/cn";

type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export const Tab: React.FC<TabProps> = ({
  label,
  isActive,
  onClick,
  disabled = false,
  className,
}) => {
  const isTrulyActive = isActive && !disabled;

  return (
    <div
      className={cn(
        "px-4 py-[7px] rounded-lg text-[16px] leading-[23px] text-center",
        disabled
          ? "cursor-not-allowed text-light bg-bright-blue-5 border-bright-blue-5"
          : "text-primary cursor-pointer hover:bg-bright-blue-10 hover:border-bright-blue-10",
        isTrulyActive && "border border-secondary bg-bright-blue-5",
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      {label}
    </div>
  );
};
