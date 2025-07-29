import { cn } from "../../utils/cn";

type Props = {
  title: string;
  description: string;
  as?: keyof JSX.IntrinsicElements;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export const TitleBlock = ({
  title,
  description,
  as = "h2",
  containerClassName,
  titleClassName,
  descriptionClassName,
}: Props) => {
  const TitleTag = as;

  return (
    <div className={cn("md:space-y-2 space-y-1", containerClassName)}>
      <TitleTag
        className={cn(
          "text-primary font-mackinac text-[24px] md:text-[30px] leading-[30px] md:leading-[38px] font-bold md:tracking-[0.2px]",
          titleClassName
        )}
      >
        {title}
      </TitleTag>

      <p
        className={cn(
          "text-light text-[16px] md:text-[18px] leading-[22px] md:leading-[24px]",
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  );
};
