import { Button } from "../button";
import { TextBody, TextHeading } from "../typography";

type ModalProps = {
  title: string;
  description: string;
  image?: React.ReactNode;
};

const BlackCloseIcon = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6.33325L6 18.3333"
      stroke="#272727"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6.33325L18 18.3333"
      stroke="#272727"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ModalImage: React.FC<ModalProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="w-full max-w-[375px] md:max-w-[468px] space-y-6 md:space-y-10 md:shadow-modal bg-white rounded-[16px] md:rounded-xl">
      <div className="relative">
        {image}

        <div className="absolute top-4 right-4">
          <BlackCloseIcon />
        </div>
      </div>

      <div className="space-y-10 px-4 md:px-10 pt-6 pb-6 md:pb-10">
        <div className="space-y-4">
          <TextHeading size="sm" weight="regular" className="text-center">
            {title}
          </TextHeading>

          <TextBody size="md" weight="regular">
            {description}
          </TextBody>
        </div>

        <div className="flex flex-col md:flex-row gap-2.5 px-6 md:px-8 pb-6 md:pb-8">
          <Button variant={"secondary"} size="lg" className="flex-1">
            Cancel
          </Button>

          <Button variant={"primary"} size="lg" className="flex-1">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
