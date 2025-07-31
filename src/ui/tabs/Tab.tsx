import { cn } from "../../utils/cn";
import { TextBody } from "../typography";

export type TabProps = {
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
    <TextBody
      as="button"
      type="button"
      size="md"
      weight="regular"
      useDefaultColor={false}
      className={cn(
        "px-4 py-[7px] rounded-lg text-center",
        disabled
          ? "cursor-not-allowed text-light bg-bright-blue-5 border-bright-blue-5"
          : "text-primary cursor-pointer hover:bg-bright-blue-10 hover:border-bright-blue-10",
        isTrulyActive && "border border-secondary bg-bright-blue-5",
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {label}
    </TextBody>
  );
};
