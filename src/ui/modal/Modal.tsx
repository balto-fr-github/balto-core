import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import { Button } from "../button";
import { TextBody, TextHeading } from "../typography";

const MessageIcon = () => (
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.5 20C28.5 20.7072 28.219 21.3855 27.719 21.8856C27.2189 22.3857 26.5406 22.6667 25.8333 22.6667H9.83333L4.5 28V6.66667C4.5 5.95942 4.78095 5.28115 5.28105 4.78105C5.78115 4.28095 6.45942 4 7.16667 4H25.8333C26.5406 4 27.2189 4.28095 27.719 4.78105C28.219 5.28115 28.5 5.95942 28.5 6.66667V20Z"
      stroke="#3B82F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.1666 8.33325L12.4999 22.9999L5.83325 16.3333"
      stroke="#22C55E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AlertIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.22 5.81332L2.92669 24.6667C2.69385 25.0699 2.57065 25.5271 2.56935 25.9927C2.56804 26.4583 2.68868 26.9162 2.91926 27.3207C3.14984 27.7252 3.48233 28.0623 3.88364 28.2985C4.28495 28.5346 4.74109 28.6615 5.20669 28.6667H27.7934C28.259 28.6615 28.7151 28.5346 29.1164 28.2985C29.5177 28.0623 29.8502 27.7252 30.0808 27.3207C30.3114 26.9162 30.432 26.4583 30.4307 25.9927C30.4294 25.5271 30.3062 25.0699 30.0734 24.6667L18.78 5.81332C18.5423 5.42146 18.2077 5.09748 17.8083 4.87263C17.4089 4.64779 16.9583 4.52966 16.5 4.52966C16.0417 4.52966 15.5911 4.64779 15.1918 4.87263C14.7924 5.09748 14.4577 5.42146 14.22 5.81332V5.81332Z"
      stroke="#F59E0B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 12.6666V18"
      stroke="#F59E0B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 23.3333H16.5133"
      stroke="#F59E0B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.5 8L8.5 24"
      stroke="#DC2626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 8L24.5 24"
      stroke="#DC2626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6.33325L18 18.3333"
      stroke="#272727"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Icon = ({ type }: { type: "message" | "check" | "alert" | "error" }) => {
  switch (type) {
    case "message":
      return <MessageIcon />;
    case "check":
      return <CheckIcon />;
    case "alert":
      return <AlertIcon />;
    case "error":
      return <ErrorIcon />;
    default:
      return null;
  }
};

const iconContainerColor = {
  message: "bg-info-10",
  check: "bg-success-10",
  alert: "bg-warning-10",
  error: "bg-error-5",
};

const modalVariants = cva(
  "w-full bg-white rounded-[16px] md:rounded-xl md:shadow-modal",
  {
    variants: {
      variant: {
        icon: "max-w-[375px] md:max-w-[468px] space-y-8 md:space-y-10",
        image: "max-w-[375px] md:max-w-[468px] space-y-6 md:space-y-10",
        form: "max-w-[375px] md:max-w-[468px] space-y-8 md:space-y-10 max-h-[80vh] overflow-y-auto",
      },
    },
    defaultVariants: {
      variant: "form",
    },
  }
);

type ButtonConfig = {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
};

type ModalProps = VariantProps<typeof modalVariants> & {
  title: string;
  description: string;
  variant: "icon" | "image" | "form";

  type?: "message" | "check" | "alert" | "error";
  image?: React.ReactNode;
  children?: React.ReactNode;

  className?: string;
  contentClassName?: string;
  headerClassName?: string;

  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;

  onClose?: () => void;
  showCloseButton?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  variant,
  type = "message",
  image,
  children,
  className,
  contentClassName,
  headerClassName,
  primaryButton = { text: "Accept", variant: "primary" },
  secondaryButton = { text: "Cancel", variant: "secondary" },
  onClose,
  showCloseButton = variant === "image",
}) => {
  const renderContent = () => {
    switch (variant) {
      case "icon":
        return (
          <div
            className={cn(
              "space-y-4 md:space-y-6 pt-6 md:pt-8 px-6 md:px-8",
              contentClassName
            )}
          >
            <div
              className={cn(
                "w-[52px] h-[52px] flex items-center justify-center rounded-xl mx-auto",
                iconContainerColor[type]
              )}
            >
              <Icon type={type} />
            </div>
            <div className={cn("space-y-4", headerClassName)}>
              <TextHeading size="sm" weight="regular" className="text-center">
                {title}
              </TextHeading>
              <TextBody size="md" weight="regular">
                {description}
              </TextBody>
            </div>
          </div>
        );

      case "image":
        return (
          <>
            <div className="relative">
              {image}
              {showCloseButton && onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 hover:opacity-75 transition-opacity"
                  aria-label="Close modal"
                >
                  <BlackCloseIcon />
                </button>
              )}
            </div>
            <div
              className={cn(
                "space-y-10 px-4 md:px-10 pt-6 pb-6 md:pb-10",
                contentClassName
              )}
            >
              <div className={cn("space-y-4", headerClassName)}>
                <TextHeading size="sm" weight="regular" className="text-center">
                  {title}
                </TextHeading>
                <TextBody size="md" weight="regular">
                  {description}
                </TextBody>
              </div>
            </div>
          </>
        );

      case "form":
        return (
          <div
            className={cn(
              "px-4 py-6 md:px-10 md:py-10 space-y-8 md:space-y-10",
              contentClassName
            )}
          >
            <div className="space-y-6">
              <div className={cn("space-y-3", headerClassName)}>
                <TextHeading size="sm" weight="regular">
                  {title}
                </TextHeading>
                <TextBody size="md" weight="regular">
                  {description}
                </TextBody>
              </div>
              {children}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderActions = () => {
    if (variant === "image") {
      return (
        <div className="flex flex-col md:flex-row gap-2.5 px-6 md:px-8 pb-6 md:pb-8">
          {secondaryButton && (
            <Button
              variant={secondaryButton.variant}
              size="lg"
              className={cn("flex-1", secondaryButton.className)}
              onClick={secondaryButton.onClick}
              disabled={secondaryButton.disabled}
            >
              {secondaryButton.text}
            </Button>
          )}
          {primaryButton && (
            <Button
              variant={primaryButton.variant}
              size="lg"
              className={cn("flex-1", primaryButton.className)}
              onClick={primaryButton.onClick}
              disabled={primaryButton.disabled}
            >
              {primaryButton.text}
            </Button>
          )}
        </div>
      );
    }

    return (
      <div
        className={cn(
          "flex flex-col md:flex-row gap-2 md:gap-2.5",
          variant === "icon" ? "px-6 md:px-8 pb-6 md:pb-8" : ""
        )}
      >
        {secondaryButton && (
          <Button
            variant={secondaryButton.variant}
            size="lg"
            className={cn("flex-1", secondaryButton.className)}
            onClick={secondaryButton.onClick}
            disabled={secondaryButton.disabled}
          >
            {secondaryButton.text}
          </Button>
        )}
        {primaryButton && (
          <Button
            variant={primaryButton.variant}
            size="lg"
            className={cn("flex-1", primaryButton.className)}
            onClick={primaryButton.onClick}
            disabled={primaryButton.disabled}
          >
            {primaryButton.text}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={cn(modalVariants({ variant }), className)}>
      {renderContent()}
      {renderActions()}
    </div>
  );
};
