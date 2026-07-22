"use client";

import { DocumentCard } from "./DocumentCard";
import { mockDocuments } from "@/data/mock-data";
import { PlusIcon } from "@/components/ui/Icons";

export function DocumentsGrid() {
  return (
    <div className="bg-surface-secondary/50 rounded-xl p-6 min-h-[600px] flex flex-col">
      <h2 className="text-lg font-bold text-primary mb-6">Documents</h2>
      
      {/* Grid of Documents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {mockDocuments.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>

      {/* Upload Button */}
      <div className="mt-auto flex justify-center pb-8">
        <button className="flex items-center gap-2 bg-[#0A1128] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0A1128]/90 transition-colors shadow-md">
          <PlusIcon className="h-5 w-5" />
          <span>Uploaded New</span>
        </button>
      </div>
    </div>
  );
}
