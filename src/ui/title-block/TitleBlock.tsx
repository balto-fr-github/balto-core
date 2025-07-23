import { cn } from "../../utils/cn";

type TitleBlockProps = {
  title: string;
  description: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export const TitleBlock: React.FC<TitleBlockProps> = ({
  title,
  description,
  containerClassName,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div className={cn("md:space-y-2 space-y-1", containerClassName)}>
      <h2
        className={cn(
          "text-primary font-mackinac text-[24px] md:text-[30px] leading-[30px] md:leading-[38px] font-bold md:tracking-[0.2px]",
          titleClassName
        )}
      >
        {title}
      </h2>

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
