import { lazy, Suspense } from "react";

import Loader from "../../loader/Loader";

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
};

export const DefaultImg: React.FC<ImageLikeProps> = (p) => <img {...p} />;

export type TestimonialItem = {
  title: string;
  description: string;
  author: string;
  tag: string;
  treatmentDuration?: string;
  treatmentText?: string;
  tags: string[];
  videoUrl: string;
  thumbnailUrl: string;
};

type TestimonialCarouselProps = {
  title: React.ReactNode;
  testimonials: TestimonialItem[];
  description: string;
};

const TestimonialCarouselSwiper = lazy(
  () => import("./TestimonialCarouselSwiper")
);

const TestimonialCarouselBlock = ({
  title,
  testimonials,
  description,
}: TestimonialCarouselProps) => {
  const renderHeader = () => (
    <div className="space-y-4 px-4">
      <h1
        className="text-center font-mackinac text-3xl leading-none tracking-[-0.02em] text-neutral-grey-800 md:text-4xl xl:text-5xl"
        data-test="pdp-testimonials-title"
      >
        {title}
      </h1>

      <p
        className="text-center font-inter text-base font-medium text-neutral-grey-600 xl:text-lg"
        data-test="pdp-testimonials-subtitle"
      >
        {description}
      </p>
    </div>
  );

  return (
    <section
      className="container mx-auto space-y-6 bg-white py-8 md:space-y-10 md:px-8 md:py-10 xl:py-20"
      data-test="pdp-testimonials"
      data-desc="Social proof section"
    >
      {renderHeader()}

      <Suspense fallback={<Loader height="250px" />}>
        <TestimonialCarouselSwiper testimonials={testimonials} />
      </Suspense>
    </section>
  );
};

export default TestimonialCarouselBlock;
