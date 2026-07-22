"use client";

import { useState } from "react";
import { ArrowLeftIcon, EditPenIcon } from "@/components/ui/Icons";

interface ContentEditorViewProps {
  title: string;
  initialContent: string;
  onBack: () => void;
}

export function ContentEditorView({ title, initialContent, onBack }: ContentEditorViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleToggleEdit = () => {
    if (isEditing) {
      // Save logic would go here
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-surface-hover rounded-lg transition-colors text-text-primary"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-text-primary">
          {isEditing ? `Edit ${title}` : title}
        </h2>
      </div>

      {/* Editor Area */}
      <div className="bg-surface-secondary/30 rounded-2xl border border-border shadow-sm p-6 sm:p-8 min-h-[600px] flex flex-col">
        
        {isEditing && (
          <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg bg-[#1a1d21] p-2 text-text-muted shadow-sm w-fit">
            <select className="bg-transparent border-none text-white text-sm focus:outline-none px-2 cursor-pointer">
              <option value="16">16</option>
              <option value="14">14</option>
              <option value="18">18</option>
            </select>
            <div className="w-px h-4 bg-gray-600 mx-1"></div>
            
            {/* Format Icons (Mocked with text/basic shapes for UI match) */}
            <button className="px-2 py-1 text-white hover:bg-white/10 rounded flex items-center gap-1 font-bold">
              T <div className="w-3 h-3 rounded-full bg-white ml-1"></div>
            </button>
            <div className="w-px h-4 bg-gray-600 mx-1"></div>
            
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded font-bold">B</button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded italic">I</button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded underline">U</button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded line-through">S</button>
            <div className="w-px h-4 bg-gray-600 mx-1"></div>
            
            {/* Align Icons */}
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded flex flex-col gap-0.5 mt-0.5">
              <div className="h-0.5 w-4 bg-current"></div>
              <div className="h-0.5 w-3 bg-current"></div>
              <div className="h-0.5 w-4 bg-current"></div>
            </button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded flex flex-col items-center gap-0.5 mt-0.5">
              <div className="h-0.5 w-4 bg-current"></div>
              <div className="h-0.5 w-3 bg-current"></div>
              <div className="h-0.5 w-4 bg-current"></div>
            </button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded flex flex-col items-end gap-0.5 mt-0.5">
              <div className="h-0.5 w-4 bg-current"></div>
              <div className="h-0.5 w-3 bg-current"></div>
              <div className="h-0.5 w-4 bg-current"></div>
            </button>
            <div className="w-px h-4 bg-gray-600 mx-1"></div>
            
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            </button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </button>
            <button className="px-2 py-1 hover:text-white hover:bg-white/10 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </button>
          </div>
        )}

        <div className="flex-1">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[400px] resize-none bg-transparent text-text-secondary leading-relaxed focus:outline-none"
            />
          ) : (
            <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleToggleEdit}
            className="flex items-center gap-2 rounded-xl bg-[#0A1128] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0A1128]/90"
          >
            {isEditing ? "Update" : (
              <>
                Edit Profile
                <EditPenIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
