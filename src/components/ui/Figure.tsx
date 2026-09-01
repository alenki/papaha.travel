import Image from "next/image";
import type { Figure as FigureData } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MEDIA } from "@/content/media";
import { Plate } from "./Plate";

/**
 * The single image slot used everywhere on the site.
 *
 * If `figure.src` is set it renders an optimised next/image. If it is not, it
 * renders a drawn survey plate at the identical aspect ratio and tone, so a
 * slot with no photograph yet still looks authored rather than broken.
 * Swapping in real photography is one property per figure, and no layout moves.
 */
export function Figure({
  figure,
  locale,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw",
  preload = false,
  /** Fill the parent instead of establishing its own aspect ratio. */
  fill = false,
  plateLabel,
}: {
  figure: FigureData;
  locale: Locale;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  /** Hoist this image into a <head> preload. For the LCP image only. */
  preload?: boolean;
  fill?: boolean;
  plateLabel?: string;
}) {
  const alt = pick(figure.alt, locale);
  const seed = figure.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), figure.id.length);

  // The photograph, if one has been sourced for this slot. An explicit `src` on
  // the figure itself wins, so a one-off can always be pinned in the content.
  const shot = MEDIA[figure.id];
  const src = figure.src ?? shot?.src;
  const blur = figure.blur ?? shot?.blur;

  const objectPosition = figure.focus
    ? `${figure.focus.x}% ${figure.focus.y}%`
    : undefined;

  return (
    <div
      className={cn("relative overflow-hidden bg-basalt-2", className)}
      style={fill ? undefined : { aspectRatio: String(figure.ratio) }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
          className={cn("object-cover", imageClassName)}
          style={{ objectPosition }}
        />
      ) : (
        <>
          <Plate
            seed={seed}
            ratio={figure.ratio}
            tone={figure.tone}
            label={plateLabel ?? figure.id}
            className={cn("absolute inset-0 h-full w-full", imageClassName)}
          />
          {/* Real alt text, even for the placeholder: the content is authored,
              only the photograph is missing. */}
          <span className="u-sr">{alt}</span>
        </>
      )}
    </div>
  );
}

/**
 * Figure plus its editorial caption, ruled off in the margin.
 *
 * `fill` needs care here. `Figure` in fill mode declares no aspect ratio, so it
 * takes its height from its parent — but the parent is this `<figure>`, whose
 * own height is auto, so the pair collapses to nothing and the photograph never
 * appears. Every full-bleed hero on the site sits in a fixed-height
 * `ParallaxFrame`, so in fill mode the figure claims that height and becomes a
 * column: the image takes whatever is left after the caption, and the caption
 * keeps its intrinsic height instead of being pushed out of the frame.
 */
export function FigureWithCaption({
  figure,
  locale,
  className,
  ...rest
}: Parameters<typeof Figure>[0]) {
  const caption = figure.caption ? pick(figure.caption, locale) : null;
  const { fill } = rest;

  return (
    <figure className={cn(fill && "flex h-full w-full flex-col", className)}>
      <Figure
        figure={figure}
        locale={locale}
        {...rest}
        className={fill ? "min-h-0 w-full flex-1" : undefined}
      />
      {caption && (
        <figcaption
          className={cn(
            "mt-3 flex gap-3 border-t border-[var(--rule)] pt-3",
            fill && "shrink-0",
          )}
        >
          <span className="u-label shrink-0 pt-[0.2em]">
            {figure.id.slice(-2)}
          </span>
          <span className="text-xs leading-relaxed text-[var(--fg-3)]">
            {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
