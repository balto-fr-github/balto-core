import { TextBody, TextCaption } from "../typography";

import { cn } from "../../utils/cn";
import {
  COMPLEMENT_PRODUCTS_ES,
  COMPLEMENT_PRODUCTS_FR,
  CROQUETTES_PRODUCTS_FR,
  FRIANDISES_PRODUCTS_FR,
  HELP_LINKS_ES,
  HELP_LINKS_FR,
} from "./constants";
import { MobileProductCard } from "./MobileProductCard";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

export type LinkLikeProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

export type Product = {
  imageMobile: string;
  imageDesktop: string;
  title: string;
  description: string;
  href: string;
  category: string;
};

const DefaultLink: React.FC<LinkLikeProps> = (props) => <a {...props} />;

const DefaultImg: React.FC<ImageLikeProps> = (props) => <img {...props} />;

type ProductsTabProps = {
  LinkComponent: React.ComponentType<LinkLikeProps>;
  ImageComponent: React.ComponentType<ImageLikeProps>;
  variant: "fr" | "es";
};

const ProductsTab = ({
  LinkComponent = DefaultLink,
  ImageComponent = DefaultImg,
  variant = "fr",
}: ProductsTabProps) => {
  const complementProducts =
    variant === "fr" ? COMPLEMENT_PRODUCTS_FR : COMPLEMENT_PRODUCTS_ES;
  const seeAllProductsText =
    variant === "fr" ? "Voir tous les produits" : "Ver todos los productos";
  const seeAllProductsHref = variant === "fr" ? "/collection" : "/coleccion";

  return (
    <>
      <div className="space-y-3">
        <div className="space-y-4">
          <TextBody size="md" weight="semibold" className="text-inverted">
            {variant === "fr" ? "Compléments" : "Complementos"}
          </TextBody>

          <div className="grid grid-cols-2 items-stretch gap-4">
            {complementProducts.map((product) => (
              <LinkComponent key={product.href} href={product.href}>
                <MobileProductCard
                  ImageComponent={ImageComponent}
                  image={product.imageMobile}
                  title={product.title}
                  description={product.description}
                />
              </LinkComponent>
            ))}
          </div>
        </div>

        {variant === "fr" && (
          <>
            <div className="h-[0.5px] w-full bg-[#ABABAB]" />

            <div className="space-y-2">
              <TextBody size="md" weight="semibold" className="text-inverted">
                Croquettes
              </TextBody>

              <div className="flex flex-col gap-2">
                {CROQUETTES_PRODUCTS_FR.map((product) => (
                  <LinkComponent key={product.href} href={product.href}>
                    <div className="flex items-center gap-2.5">
                      <div className="relative aspect-square w-12 flex-shrink-0 xs:w-16 sm:w-20">
                        <ImageComponent
                          src={product.imageMobile}
                          alt={product.title}
                          fill
                          className="rounded-[4px] object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <TextBody
                          size="md"
                          weight="medium"
                          className="text-inverted"
                        >
                          {product.title}
                        </TextBody>

                        <TextCaption
                          size="md"
                          weight="regular"
                          className="text-inverted"
                        >
                          {product.description}
                        </TextCaption>
                      </div>
                    </div>
                  </LinkComponent>
                ))}
              </div>
            </div>

            <div className="h-[0.5px] w-full bg-[#ABABAB]" />

            <div className="space-y-2">
              <TextBody size="md" weight="semibold" className="text-inverted">
                Friandises
              </TextBody>

              <div className="flex flex-col gap-2">
                {FRIANDISES_PRODUCTS_FR.map((product) => (
                  <LinkComponent key={product.href} href={product.href}>
                    <div className="flex items-center gap-2.5">
                      <div className="relative aspect-square w-12 flex-shrink-0 xs:w-16 sm:w-20">
                        <ImageComponent
                          src={product.imageMobile}
                          alt={product.title}
                          fill
                          className="rounded-[4px] object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <TextBody
                          size="md"
                          weight="medium"
                          className="text-inverted"
                        >
                          {product.title}
                        </TextBody>

                        <TextCaption
                          size="md"
                          weight="regular"
                          className="text-inverted"
                        >
                          {product.description}
                        </TextCaption>
                      </div>
                    </div>
                  </LinkComponent>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <LinkComponent
        href={seeAllProductsHref}
        className={cn(
          "mb-2 inline-flex w-full justify-center rounded-lg border border-white/60 bg-transparent px-4 py-3",
          "transition-all duration-200",
          "hover:border-white hover:bg-white/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50",
          "active:scale-[0.98] active:bg-white/20"
        )}
      >
        <TextBody size="md" weight="medium" className="text-inverted">
          {seeAllProductsText}
        </TextBody>
      </LinkComponent>
    </>
  );
};

type InformationTabProps = {
  LinkComponent: React.ComponentType<LinkLikeProps>;
  ImageComponent: React.ComponentType<ImageLikeProps>;
  variant: "fr" | "es";
};

export const InformationTab = ({
  LinkComponent = DefaultLink,
  ImageComponent = DefaultImg,
  variant = "fr",
}: InformationTabProps) => {
  const helpLinks = variant === "fr" ? HELP_LINKS_FR : HELP_LINKS_ES;

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[128/80] w-full">
        <div className="h-full w-full bg-slate-300"></div>
      </div>

      {helpLinks.map((link) => (
        <LinkComponent key={link.title} href={link.href}>
          <div className="flex items-center justify-between gap-2">
            <TextBody size="md" weight="semibold" className="text-inverted">
              {link.title}
            </TextBody>

            <ImageComponent
              src="/assets/navbar/chevron-right.svg"
              alt="chevron right"
              width={20}
              height={20}
            />
          </div>
        </LinkComponent>
      ))}
    </div>
  );
};

type MobileNavbarProps = {
  activeTab: "products" | "information";
  LinkComponent?: React.ComponentType<LinkLikeProps>;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  variant?: "fr" | "es";
};

export const MobileNavbar = ({
  activeTab,
  LinkComponent = DefaultLink,
  ImageComponent = DefaultImg,
  variant = "fr",
}: MobileNavbarProps) => {
  return (
    <div
      className={cn(
        "flex max-h-[85vh] flex-col",
        "rounded-3xl p-4",
        "bg-[#27272786]",
        "relative",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:p-[1px]",
        "overflow-hidden",
        "backdrop-blur-[4px] backdrop-saturate-200",
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
      )}
    >
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        {activeTab === "products" && (
          <ProductsTab
            LinkComponent={LinkComponent}
            ImageComponent={ImageComponent}
            variant={variant}
          />
        )}
        {activeTab === "information" && (
          <InformationTab
            LinkComponent={LinkComponent}
            ImageComponent={ImageComponent}
            variant={variant}
          />
        )}
      </div>
    </div>
  );
};
