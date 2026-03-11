import { ReactNode, useEffect, useState } from "react";

import { cn } from "../../utils/cn";

export interface AnnouncementBarProps {
  contents: ReactNode[];
  containerClassName?: string;
  textWrapperClassName?: string;
  textStripClassName?: string;
  textClassName?: string;
  dotsContainerClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;
  inactiveDotClassName?: string;
  intervalMs?: number;
}

const DEFAULT_TEXT_CLASSES =
  "text-[#F2F2F2] text-center font-inter text-[12px] leading-[16px] tracking-[0.1px] md:text-[14px] md:leading-[22px] md:tracking-[0.3px]";

const DEFAULT_ACTIVE_DOT_CLASSES = "w-1 h-1 rounded-full bg-[#919191]";
const DEFAULT_INACTIVE_DOT_CLASSES =
  "w-1 h-1 rounded-full bg-[#ABABAB] opacity-30";

const TRANSITION_DURATION_MS = 600;

export const AnnouncementBar = ({
  contents,
  containerClassName,
  textWrapperClassName,
  textStripClassName,
  textClassName,
  dotsContainerClassName,
  dotClassName,
  activeDotClassName,
  inactiveDotClassName,
  intervalMs = 2000,
}: AnnouncementBarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Strip includes a clone of the first item at the end for seamless loop (right-to-left)
  const stripItems =
    contents.length > 1 ? [...contents, contents[0]] : contents;

  useEffect(() => {
    if (contents.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1;
        return next <= contents.length ? next : 0;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [contents.length, intervalMs]);

  // When we land on the clone (index === contents.length), reset to 0 without animation
  useEffect(() => {
    if (activeIndex === contents.length && contents.length > 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, TRANSITION_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, contents.length]);

  if (!contents.length) return null;

  const displayIndexForDots = activeIndex % contents.length;

  return (
    <div
      className={cn(
        "relative flex h-8 md:h-10 w-full items-center justify-center overflow-hidden bg-[#272727]",
        containerClassName
      )}
    >
      {/* Text area - centered in full width, with overflow hidden for sliding effect */}
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
          textWrapperClassName
        )}
      >
        <div
          className={cn(
            "flex h-full w-full ease-in-out",
            isTransitioning && "transition-transform duration-[600ms]",
            textStripClassName
          )}
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {stripItems.map((text, index) => (
            <div
              key={index}
              className={cn(
                "flex h-full min-w-full shrink-0 items-center justify-center px-4",
                textClassName ?? DEFAULT_TEXT_CLASSES
              )}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Dots - positioned on the right */}
      {contents.length > 1 && (
        <div
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 gap-1",
            "right-4 md:right-14 xl:right-[90px]",
            dotsContainerClassName
          )}
        >
          {contents.map((_, index) => (
            <div
              key={index}
              className={cn(
                "rounded-full transition-opacity duration-200",
                index === displayIndexForDots
                  ? activeDotClassName ?? dotClassName ?? DEFAULT_ACTIVE_DOT_CLASSES
                  : inactiveDotClassName ?? dotClassName ?? DEFAULT_INACTIVE_DOT_CLASSES
              )}
              aria-hidden
            />
          ))}
        </div>
      )}
    </div>
  );
};
