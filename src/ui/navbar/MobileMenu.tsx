import { cn } from "../../utils/cn";
import { type MobileTab, MOBILE_TABS_FR, MOBILE_TABS_ES } from "./constants";
import { TextCaption } from "../typography";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

const DefaultImg: React.FC<ImageLikeProps> = (props) => <img {...props} />;

export const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setMobileActiveTab,
  mobileActiveTab,
  ImageComponent = DefaultImg,
  variant = "fr",
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setMobileActiveTab: (tab: MobileTab) => void;
  mobileActiveTab: MobileTab;
  ImageComponent: React.ComponentType<ImageLikeProps>;
  variant: "fr" | "es";
}) => {
  const mobileTabs = variant === "fr" ? MOBILE_TABS_FR : MOBILE_TABS_ES;

  return (
    <div
      className={cn(
        "hidden items-center gap-2 md:!hidden",
        isMobileMenuOpen && "flex"
      )}
    >
      {mobileTabs.map((tab) => (
        <button
          key={tab.key}
          className="flex items-center gap-1"
          onClick={() => {
            if (mobileActiveTab === tab.key) {
              setIsMobileMenuOpen(false);
              return;
            }

            setMobileActiveTab(tab.key);
          }}
        >
          <TextCaption
            size="md"
            weight="regular"
            className="font-medium text-inverted"
          >
            {tab.label}
          </TextCaption>

          <ImageComponent
            src="/assets/navbar/chevron-down.svg"
            alt="chevron"
            width={16}
            height={16}
            className={cn(
              "rotate-180 transition-transform duration-300",
              mobileActiveTab === tab.key && "rotate-360"
            )}
          />
        </button>
      ))}
    </div>
  );
};
