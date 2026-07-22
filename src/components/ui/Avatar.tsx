// =============================================================================
// Avatar — Circular avatar with image support and fallback initials
// =============================================================================

import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
} as const;

const imageSizes = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;

/**
 * Extracts initials from a name string (up to 2 characters).
 * e.g. "Sharon Lee" → "SL"
 */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
  const sizeClass = sizeClasses[size];
  const imgSize = imageSizes[size];

  if (src) {
    return (
      <div
        className={`relative ${sizeClass} shrink-0 overflow-hidden rounded-full ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={imgSize}
          height={imgSize}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Fallback: Show initials on a gradient background
  return (
    <div
      className={`${sizeClass} shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-700 font-semibold text-white ${className}`}
      aria-label={alt}
    >
      {getInitials(alt)}
    </div>
  );
}
