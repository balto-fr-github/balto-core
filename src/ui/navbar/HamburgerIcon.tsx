import { cn } from "../../utils/cn";

export const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <span
        className={cn(
          "h-[2px] w-5 rounded-full bg-white transition-all duration-300",
          isOpen && "translate-y-[7px] rotate-45"
        )}
      />
      <span
        className={cn(
          "h-[2px] w-5 rounded-full bg-white transition-all duration-300",
          isOpen && "scale-0 opacity-0"
        )}
      />
      <span
        className={cn(
          "h-[2px] w-5 rounded-full bg-white transition-all duration-300",
          isOpen && "-translate-y-[7px] -rotate-45"
        )}
      />
    </div>
  );
};
