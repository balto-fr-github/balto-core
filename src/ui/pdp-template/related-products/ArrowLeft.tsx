type Props = {
  className?: string;
  width?: number;
  height?: number;
};

export const IconArrowLeft = ({
  className,
  width = 20,
  height = 21,
}: Props) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.832 10.4414L4.16537 10.4414"
        stroke="#124028"
        stroke-width="2.14286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 16.2734L4.16667 10.4401L10 4.60677"
        stroke="#124028"
        stroke-width="2.14286"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconArrowLeft;
