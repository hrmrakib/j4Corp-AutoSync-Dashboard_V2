"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  align?: "left" | "right" | "center";
}

export function Popover({ trigger, content, align = "right" }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => setIsOpen(false));

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const alignClass =
    align === "left"
      ? "left-0"
      : align === "right"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 ${alignClass} animate-fade-in`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
