import { Button } from "../button";
import { TextBody, TextHeading } from "../typography";

type ModalFormProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export const ModalForm: React.FC<ModalFormProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="px-4 py-6 md:px-10 md:py-10 space-y-8 md:space-y-10 bg-white rounded-[16px] md:rounded-xl shadow-modal max-h-[80vh] overflow-y-auto">
      <div className="space-y-6">
        <div className="space-y-3">
          <TextHeading size="sm" weight="regular">
            {title}
          </TextHeading>

          <TextBody size="md" weight="regular">
            {description}
          </TextBody>
        </div>

        {children}
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-2.5">
        <Button variant={"secondary"} size="lg" className="flex-1">
          Cancel
        </Button>

        <Button variant={"primary"} size="lg" className="flex-1">
          Accept
        </Button>
      </div>
    </div>
  );
};
