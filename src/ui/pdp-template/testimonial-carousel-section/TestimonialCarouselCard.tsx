import TestimonialCarouselVideoPlayer from "./TestimonialCarouselVideoPlayer";
import type { TestimonialItem } from "./TestimonialCarouselSection";

type TestimonialCarouselCardProps = {
  testimonial: TestimonialItem;
};

const TestimonialCarouselCard = ({
  testimonial,
}: TestimonialCarouselCardProps) => {
  const {
    title,
    description,
    author,
    tags,
    videoUrl,
    thumbnailUrl,
    treatmentDuration,
    treatmentText,
  } = testimonial;

  const renderTags = () => (
    <div className="flex w-full flex-wrap items-center justify-center gap-[0.375rem] px-10">
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex h-[25px] items-center justify-center rounded-md border border-[#60B27B] px-1.5 text-[11px] font-medium leading-none text-dark-green md:text-sm"
        >
          {tag}
        </div>
      ))}
    </div>
  );

  const renderCardHeader = () => (
    <TestimonialCarouselVideoPlayer
      videoUrl={videoUrl}
      thumbnailUrl={thumbnailUrl}
    />
  );

  const renderCardBody = () => (
    <div className="flex flex-col items-center justify-center gap-2.5 p-4 md:gap-3">
      <h3 className="text-center font-inter text-[19px] font-semibold tracking-tight text-neutral-grey-800 md:text-2xl">
        {title}
      </h3>
      <p className="text-center font-inter text-[11px] leading-[1.25] tracking-tight text-neutral-grey-600 md:text-sm">
        {description}
      </p>
      <p className="[1.25] text-center font-inter text-[11px] tracking-tight text-neutral-grey-800 md:text-sm">
        {author}
        {treatmentDuration ? (
          <>
            , {treatmentText ?? "après"}{" "}
            <span className="font-bold">{treatmentDuration}</span>
          </>
        ) : (
          ""
        )}
      </p>
      {renderTags()}
    </div>
  );

  return (
    <div className="h-full w-full rounded-lg shadow-[0px_4px_21.9px_0px_#33333340]">
      {renderCardHeader()}
      {renderCardBody()}
    </div>
  );
};

export default TestimonialCarouselCard;
