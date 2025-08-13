import { forwardRef, HTMLAttributes } from "react";

import { cn } from "../../utils/cn";
import { NavigationItem, type NavigationItemProps } from "./NavigationItem";

export interface NavigationMenuProps extends HTMLAttributes<HTMLDivElement> {
  items: (Omit<NavigationItemProps, "layout"> & {
    isSelected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  })[];
  layout?: "expanded" | "collapsed";
  mode?: "desktop" | "mobile";
}

export const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  (
    { items, layout = "expanded", mode = "desktop", className, ...props },
    ref
  ) => {
    const isMobile = mode === "mobile";
    const effectiveLayout = isMobile ? "collapsed" : layout;

    return (
      <nav
        ref={ref}
        className={cn(
          "w-max",
          isMobile ? "flex flex-row gap-0" : "flex flex-col gap-5",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <NavigationItem
            key={item.label}
            {...item}
            layout={effectiveLayout}
            mode={mode}
          />
        ))}
      </nav>
    );
  }
);

NavigationMenu.displayName = "NavigationMenu";
