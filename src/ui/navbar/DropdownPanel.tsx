import { cn } from "../../utils/cn";

type DropdownPanelProps = {
  isOpen: boolean;
  outerClassName?: string;
  innerClassName?: string;
  onMouseEnter?: () => void;
  children: React.ReactNode;
};

export const DropdownPanel = ({
  isOpen,
  outerClassName,
  innerClassName,
  onMouseEnter,
  children,
}: DropdownPanelProps) => {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-0 z-[40] transition-transform duration-500",
        !isOpen && "pointer-events-none",
        outerClassName
      )}
      style={{
        transform: isOpen ? "translateY(0)" : "translateY(-120%)",
      }}
      onMouseEnter={onMouseEnter}
    >
      <div className={innerClassName}>{children}</div>
    </div>
  );
};
