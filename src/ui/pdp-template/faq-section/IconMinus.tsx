type Props = {
  color: string;
  className?: string;
  width?: number;
  height?: number;
};

export const IconMinus = ({
  color,
  className,
  width = 20,
  height = 21,
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className ?? ""}`}
    >
      <path
        d="M4.28125 10.7461H15.7146"
        stroke={color}
        stroke-width="2.04167"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconMinus;
