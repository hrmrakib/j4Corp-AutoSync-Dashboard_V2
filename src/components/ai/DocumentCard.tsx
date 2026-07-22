"use client";

import { ThreeDotsIcon, PDFIcon } from "@/components/ui/Icons";
import { Dropdown } from "@/components/ui/Dropdown";
import type { Document } from "@/types";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-border transition-all hover:shadow-card">
      {/* 3-dot menu dropdown */}
      <div className="absolute top-2 right-2">
        <Dropdown
          trigger={
            <button className="p-1 text-text-muted hover:text-text-primary transition-colors">
              <ThreeDotsIcon className="h-5 w-5" />
            </button>
          }
          content={
            <button className="hover:text-red-400 transition-colors">Delete</button>
          }
        />
      </div>

      {/* Blue Circle Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white mb-4 shadow-sm">
        <PDFIcon className="h-12 w-12" />
      </div>

      {/* Document Name */}
      <p className="text-sm font-medium text-text-primary">{document.name}</p>
    </div>
  );
}
