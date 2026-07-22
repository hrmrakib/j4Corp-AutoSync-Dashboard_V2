"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface DropdownProps {
  trigger: ReactNode;
  content: ReactNode;
  align?: "left" | "right" | "center";
}

export function Dropdown({ trigger, content, align = "right" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

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
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 mt-1 ${alignClass} animate-fade-in bg-black text-white rounded-md shadow-md py-1 px-3 text-xs`}
          onClick={() => setIsOpen(false)}
        >
          {content}
        </div>
      )}
    </div>
  );
}
