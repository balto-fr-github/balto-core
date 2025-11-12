type Props = {
  color: string;
  className?: string;
  width?: number;
  height?: number;
};

export const IconPlus = ({
  color,
  className,
  width = 20,
  height = 19,
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className ?? ""}`}
    >
      <path
        d="M10 4.17969V15.0686"
        stroke={color}
        stroke-width="1.94444"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.55469 9.62109H15.4436"
        stroke={color}
        stroke-width="1.94444"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconPlus;
