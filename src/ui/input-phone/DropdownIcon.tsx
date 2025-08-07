import { cn } from "../../utils/cn";

interface DropdownIconProps extends React.SVGProps<SVGSVGElement> {}

const DropdownIcon = ({ className, ...props }: DropdownIconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-4 aspect-square", className)}
      {...props}
    >
      <path
        d="M8 11.1667C7.93433 11.1668 7.86927 11.154 7.80862 11.1288C7.74797 11.1036 7.69292 11.0666 7.64666 11.02L2.98 6.35334C2.89168 6.25856 2.84359 6.1332 2.84588 6.00366C2.84817 5.87413 2.90064 5.75054 2.99225 5.65893C3.08386 5.56732 3.20745 5.51485 3.33698 5.51256C3.46652 5.51027 3.59188 5.55836 3.68666 5.64668L8 9.95934L12.3133 5.64668C12.4081 5.55836 12.5335 5.51027 12.663 5.51256C12.7925 5.51485 12.9161 5.56732 13.0077 5.65893C13.0994 5.75054 13.1518 5.87413 13.1541 6.00366C13.1564 6.1332 13.1083 6.25856 13.02 6.35334L8.35333 11.02C8.30708 11.0666 8.25203 11.1036 8.19137 11.1288C8.13072 11.154 8.06567 11.1668 8 11.1667Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default DropdownIcon;
