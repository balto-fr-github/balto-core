import React from "react";

import { cn } from "../../utils/cn";
import { TextBody } from "../typography";

type FlavorProps = {
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  position: "left" | "right";
  activeStyle: {
    borderColor: string;
    bgColor: string;
  };
};

const Flavor = ({
  label,
  icon,
  isActive,
  onClick,
  position,
  activeStyle,
}: FlavorProps) => {
  return (
    <div
      className={cn(
        "px-3 py-1 flex-1 flex justify-center border-[0.5px] items-center gap-1.5 cursor-pointer",
        position === "left" ? "rounded-l-[4px]" : "rounded-r-[4px]",
        isActive && "border"
      )}
      style={{
        backgroundColor: isActive ? activeStyle.bgColor : "#FFF",
        borderColor: isActive ? activeStyle.borderColor : "#ABABAB",
      }}
      onClick={onClick}
    >
      {icon}
      <TextBody
        size="sm"
        weight="medium"
        style={{
          color: isActive ? activeStyle.borderColor : "#777777",
        }}
      >
        {label}
      </TextBody>
    </div>
  );
};

export default Flavor;
