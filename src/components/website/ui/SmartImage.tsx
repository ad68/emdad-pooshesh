import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/utils/cn";

interface SmartImageProps {
  src: string;
  alt: string;
  /** Classes for the wrapper (set the aspect ratio / size here). */
  className?: string;
  /** Classes for the image itself (object-fit, hover effects ...). */
  imgClassName?: string;
  eager?: boolean;
}

/** Image with a shimmer loading state and a graceful error fallback. */
export function SmartImage({ src, alt, className, imgClassName, eager = false }: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      {status === "loading" && <div aria-hidden="true" className="skeleton absolute inset-0" />}

      {status === "error" ? (
        <div className="absolute inset-0 grid place-items-center p-4 text-center text-slate-500">
          <div className="flex flex-col items-center gap-2">
            <ImageOff className="size-8" aria-hidden="true" />
            <span className="text-sm">تصویر در دسترس نیست</span>
          </div>
        </div>
      ) : (
        <Image
          ref={(node) => {
            if (node?.complete && node.naturalWidth > 0) setStatus("loaded");
          }}
          src={src}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "size-full transition-opacity duration-500",
            status === "loaded" ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}
    </div>
  );
}
