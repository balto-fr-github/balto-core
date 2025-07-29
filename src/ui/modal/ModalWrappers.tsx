import { Modal } from "./Modal";

type IconModalProps = {
  title: string;
  description: string;
  type: "message" | "check" | "alert" | "error";
  onAccept?: () => void;
  onCancel?: () => void;
  acceptText?: string;
  cancelText?: string;
  className?: string;
};

export const IconModal: React.FC<IconModalProps> = ({
  title,
  description,
  type,
  onAccept,
  onCancel,
  acceptText = "Accept",
  cancelText = "Cancel",
  className,
}) => (
  <Modal
    variant="icon"
    type={type}
    title={title}
    description={description}
    className={className}
    primaryButton={{
      text: acceptText,
      onClick: onAccept,
      variant: "primary",
    }}
    secondaryButton={{
      text: cancelText,
      onClick: onCancel,
      variant: "secondary",
    }}
  />
);

// Convenience wrapper for Image Modal
type ImageModalProps = {
  title: string;
  description: string;
  image: React.ReactNode;
  onAccept?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  acceptText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
  className?: string;
};

export const ImageModal: React.FC<ImageModalProps> = ({
  title,
  description,
  image,
  onAccept,
  onCancel,
  onClose,
  acceptText = "Accept",
  cancelText = "Cancel",
  showCloseButton = true,
  className,
}) => (
  <Modal
    variant="image"
    title={title}
    description={description}
    image={image}
    className={className}
    onClose={onClose}
    showCloseButton={showCloseButton}
    primaryButton={{
      text: acceptText,
      onClick: onAccept,
      variant: "primary",
    }}
    secondaryButton={{
      text: cancelText,
      onClick: onCancel,
      variant: "secondary",
    }}
  />
);

type FormModalProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  onAccept?: () => void;
  onCancel?: () => void;
  acceptText?: string;
  cancelText?: string;
  className?: string;
  contentClassName?: string;
};

export const FormModal: React.FC<FormModalProps> = ({
  title,
  description,
  children,
  onAccept,
  onCancel,
  acceptText = "Continue",
  cancelText = "Cancel",
  className,
  contentClassName,
}) => (
  <Modal
    variant="form"
    title={title}
    description={description}
    children={children}
    className={className}
    contentClassName={contentClassName}
    primaryButton={{
      text: acceptText,
      onClick: onAccept,
      variant: "primary",
    }}
    secondaryButton={{
      text: cancelText,
      onClick: onCancel,
      variant: "secondary",
    }}
  />
);
