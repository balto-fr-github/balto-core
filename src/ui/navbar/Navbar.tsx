"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../button";

import { cn } from "../../utils/cn";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { HamburgerIcon } from "./HamburgerIcon";
import { DropdownPanel } from "./DropdownPanel";
import { type MobileTab } from "./constants";

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

export type LottieComponentProps = {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  [key: string]: unknown;
};

const DefaultLink: React.FC<LinkLikeProps> = (props) => <a {...props} />;

const DefaultImg: React.FC<ImageLikeProps> = (props) => <img {...props} />;

const DefaultLottie: React.FC<LottieComponentProps> = ({
  src,
  className,
  ...props
}) => <img src={src} className={className} {...props} />;

type DesktopTab = "products" | null;
type NavbarVariant = "dark" | "light" | "gradient";

const GRADIENT_BG =
  "radial-gradient(65% 95% at 50% 50%, rgba(39, 39, 39, 0.61) 0%, rgba(39, 39, 39, 0.61) 48%, rgba(170, 170, 170, 0.54) 100%)";

const useDelayedNull = (value: DesktopTab, delayMs: number) => {
  const [debounced, setDebounced] = useState<DesktopTab>(value);

  useEffect(() => {
    if (value !== null) {
      setDebounced(value);
      return;
    }

    const id = window.setTimeout(() => setDebounced(null), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
};

type NavbarProps = {
  variant?: "fr" | "es";
  LinkComponent?: React.ComponentType<LinkLikeProps>;
  ImageComponent?: React.ComponentType<ImageLikeProps>;
  LottieComponent?: React.ComponentType<LottieComponentProps>;
  isOverHero?: boolean;
  isHomepage?: boolean;
  cartCounter?: number;
  onUserIconClick?: () => void;
  onCartIconClick?: () => void;
  onNavbarMouseEnter?: () => void;
};

export const Navbar = ({
  variant = "fr",
  LinkComponent = DefaultLink,
  ImageComponent = DefaultImg,
  LottieComponent = DefaultLottie,
  isOverHero = false,
  isHomepage = false,
  cartCounter = 0,
  onUserIconClick,
  onCartIconClick,
  onNavbarMouseEnter,
}: NavbarProps) => {
  const [desktopActiveTab, setDesktopActiveTab] = useState<DesktopTab>(null);
  const desktopActiveTabDebounced = useDelayedNull(desktopActiveTab, 300);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<MobileTab>("products");

  const isDesktopDropdownOpen = desktopActiveTabDebounced === "products";
  const isDropdownOpen = isDesktopDropdownOpen || isMobileMenuOpen;

  const navbarVariant: NavbarVariant = useMemo(() => {
    if (isDropdownOpen) return "dark";

    if (isHomepage && isOverHero) return "light";

    return "gradient";
  }, [isDropdownOpen, isHomepage, isOverHero]);

  const cartCounterDigitsLength = useMemo(() => {
    return cartCounter.toString().length;
  }, [cartCounter]);

  const onHamburgerClick = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setMobileActiveTab("products");
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const accountButtonText = variant === "fr" ? "Mon compte" : "Mi cuenta";

  return (
    <nav
      className="fixed inset-x-0 top-3 z-[45] px-2 min-[500px]:px-5 sm:px-9 md:px-4"
      onMouseEnter={onNavbarMouseEnter}
      onMouseLeave={() => setDesktopActiveTab(null)}
    >
      <div className="relative mx-auto max-w-[1260px]">
        <DropdownPanel
          isOpen={isDesktopDropdownOpen}
          outerClassName="hidden pt-16 md:block"
          innerClassName="pt-4"
          onMouseEnter={() => setDesktopActiveTab("products")}
        >
          <DesktopNavbar
            isOpen={isDesktopDropdownOpen}
            LinkComponent={LinkComponent}
            ImageComponent={ImageComponent}
            variant={variant}
          />
        </DropdownPanel>

        <DropdownPanel
          isOpen={isMobileMenuOpen}
          outerClassName="pt-14 md:hidden"
          innerClassName="pt-2"
        >
          <MobileNavbar
            activeTab={mobileActiveTab}
            LinkComponent={LinkComponent}
            ImageComponent={ImageComponent}
            variant={variant}
          />
        </DropdownPanel>

        <div className="relative z-[41]">
          <div
            className={cn(
              "relative flex w-full items-center justify-between rounded-[99px] px-6 md:px-9",
              isDropdownOpen && "px-3",
              "h-12 md:h-16",
              "overflow-hidden",
              "backdrop-blur-[10px] backdrop-saturate-200",
              "shadow-[0_10px_30px_rgba(0,0,0,0.18)]",
              "transition-none",
              "before:pointer-events-none before:absolute before:inset-0 before:rounded-[99px] before:p-[1.25px]",
              navbarVariant === "dark" && cn("bg-[#27272786]"),
              navbarVariant === "light" && cn("bg-[#A9B9CF]/40"),
              navbarVariant === "gradient" &&
                cn("bg-[#27272786] md:bg-transparent")
            )}
          >
            {navbarVariant === "gradient" && (
              <div
                className="absolute inset-0 -z-10 hidden md:block"
                style={{ background: GRADIENT_BG }}
              />
            )}

            <LinkComponent
              href="/"
              className={cn("block", isMobileMenuOpen && "hidden md:block")}
            >
              <LottieComponent
                src="/assets/logo/balto-logo-light.lottie"
                autoplay
                loop
                className="h-[24px] w-[78px]"
              />
            </LinkComponent>

            <MobileMenu
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={closeMobileMenu}
              mobileActiveTab={mobileActiveTab}
              setMobileActiveTab={setMobileActiveTab}
              ImageComponent={ImageComponent}
              variant={variant}
            />

            <DesktopMenu
              setDesktopActiveTab={setDesktopActiveTab}
              isDesktopDropdownOpen={isDesktopDropdownOpen}
              ImageComponent={ImageComponent}
              LinkComponent={LinkComponent}
              variant={variant}
            />

            <div className="flex items-center gap-3 md:gap-6">
              <button
                onClick={onUserIconClick}
                aria-label="Account"
                className="md:hidden"
              >
                <ImageComponent
                  src="/assets/navbar/user-icon.svg"
                  alt="user"
                  width={20}
                  height={20}
                />
              </button>

              <button
                className="relative"
                onClick={onCartIconClick}
                aria-label="Cart"
              >
                <ImageComponent
                  src="/assets/navbar/cart-icon.svg"
                  alt="cart"
                  width={24}
                  height={24}
                  className="h-5 w-5 md:h-6 md:w-6"
                />

                {!!cartCounter && (
                  <div
                    className={cn(
                      "absolute -right-1 -top-1 flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#015BD6] md:-right-2 md:-top-2 md:h-[19px] md:w-[19px]",
                      cartCounterDigitsLength > 1 &&
                        "h-[15px] w-[15px] md:h-[22px] md:w-[22px]"
                    )}
                  >
                    <p className="text-[9px] font-semibold leading-[13px] tracking-[-0.01px] text-inverted md:text-[14px] md:leading-[19px]">
                      {cartCounter}
                    </p>
                  </div>
                )}
              </button>

              <Button
                variant="primary"
                size="md"
                className="hidden md:block"
                onClick={onUserIconClick}
                textContainerClassName="leading-[16px] md:leading-[16px]"
              >
                {accountButtonText}
              </Button>

              <button
                className="md:hidden"
                onClick={onHamburgerClick}
                aria-label="Menu"
                aria-expanded={isMobileMenuOpen}
              >
                <HamburgerIcon isOpen={isMobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
