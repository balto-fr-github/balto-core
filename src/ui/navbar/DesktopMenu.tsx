import { TextBody } from "../typography";

import { cn } from "../../utils/cn";
import { DESKTOP_LINKS_FR, DESKTOP_LINKS_ES } from "./constants";

type DesktopTab = "products" | null;

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

export type LinkLikeProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

const DefaultLink: React.FC<LinkLikeProps> = (props) => <a {...props} />;

export const DesktopMenu = ({
  setDesktopActiveTab,
  isDesktopDropdownOpen,
  ImageComponent = DefaultImg,
  LinkComponent = DefaultLink,
  variant = "fr",
}: {
  setDesktopActiveTab: (tab: DesktopTab) => void;
  isDesktopDropdownOpen: boolean;
  ImageComponent: React.ComponentType<ImageLikeProps>;
  LinkComponent?: React.ComponentType<LinkLikeProps>;
  variant: "fr" | "es";
}) => {
  const desktopLinks = variant === "fr" ? DESKTOP_LINKS_FR : DESKTOP_LINKS_ES;
  const productsLabel = variant === "fr" ? "Nos produits" : "Productos";

  return (
    <div className="hidden items-center gap-4 md:flex">
      <div
        className="flex cursor-pointer items-center gap-2.5 px-2 md:px-1 xl:px-2"
        onMouseEnter={() => setDesktopActiveTab("products")}
      >
        <TextBody size="md" weight="medium" className="text-inverted">
          {productsLabel}
        </TextBody>

        <ImageComponent
          src="/assets/navbar/chevron-down.svg"
          alt="chevron down"
          width={16}
          height={16}
          className={cn(
            "rotate-180 transition-transform duration-300",
            isDesktopDropdownOpen && "rotate-360"
          )}
        />
      </div>

      {desktopLinks.map((item) => (
        <LinkComponent
          key={item.href}
          className="px-2 md:px-1 xl:px-2"
          href={item.href}
        >
          <TextBody size="md" weight="medium" className="text-inverted">
            {item.label}
          </TextBody>
        </LinkComponent>
      ))}
    </div>
  );
};
