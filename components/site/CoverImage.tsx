import { srcSet, STOCK_LABEL, withWidth } from "@/lib/images";
import { cn } from "@/lib/utils";

export function CoverImage({
  src,
  alt,
  priority,
  sizes = "(max-width: 640px) 100vw, 33vw",
  className,
  width = 1200,
  height = 675,
  showStock = true,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  showStock?: boolean;
}) {
  const set = srcSet(src);
  return (
    <span className="relative block h-full w-full">
      <img
        src={withWidth(src, width)}
        srcSet={set}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={cn("w-full object-cover", className)}
      />
      {showStock && src.includes("unsplash") ? (
        <span className="absolute right-2 bottom-2 rounded border-2 border-ink bg-yellow px-2 py-0.5 text-2xs font-bold uppercase">
          {STOCK_LABEL}
        </span>
      ) : null}
    </span>
  );
}
