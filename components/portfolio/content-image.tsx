"use client";
import { useState } from "react";
import { usableImageUrl } from "@/lib/presentation";
export function ContentImage({
  src,
  alt,
  className = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const url = usableImageUrl(src);
  if (!url || failed) return null;
  // CMS images can use multiple hosts; omit unavailable previews instead of reserving blank space.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
