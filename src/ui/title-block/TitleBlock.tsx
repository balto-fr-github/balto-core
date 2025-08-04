import { cn } from "../../utils/cn";
import { TextBody } from "../typography";
import { TextHeading } from "../typography/TextHeading";

export type TitleBlockProps = {
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
  containerClassName,
  titleClassName,
  descriptionClassName,
}: TitleBlockProps) => {
  return (
    <div className={cn("md:space-y-2 space-y-1", containerClassName)}>
      <TextHeading className={titleClassName} weight="bold" size="md">
        {title}
      </TextHeading>

      <TextBody
        weight="regular"
        size="lg"
        className={cn("text-light", descriptionClassName)}
        useDefaultColor={false}
      >
        {description}
      </TextBody>
    </div>
  );
};
