"use client";

import { useState } from "react";
import { ArrowLeftIcon, EditPenIcon } from "@/components/ui/Icons";
import { Avatar } from "@/components/ui/Avatar";
import { mockCurrentUser } from "@/data/mock-data";

interface PersonalInfoViewProps {
  onBack: () => void;
}

export function PersonalInfoView({ onBack }: PersonalInfoViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(mockCurrentUser.name);
  const [email, setEmail] = useState(mockCurrentUser.email);

  const handleToggleEdit = () => {
    if (isEditing) {
      // Handle save logic here
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border mb-6">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-surface-hover rounded-lg transition-colors text-text-primary"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-text-primary">Personal Information</h2>
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-xl shadow-sm border border-border p-6 sm:p-10">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center shrink-0 border border-border rounded-2xl p-8 shadow-sm">
            <div className="relative">
              <Avatar src={mockCurrentUser.avatarUrl} alt={mockCurrentUser.name} size="lg" />
              {isEditing && (
                <button className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 h-8 w-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-sm">
                  <EditPenIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <h3 className="mt-4 text-xl font-bold text-text-primary">{name}</h3>
          </div>

          {/* Inputs Section */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={!isEditing}
                placeholder="Name"
                className={`w-full rounded-xl border px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors ${
                  isEditing 
                    ? "border-border bg-white focus:border-primary focus:ring-1 focus:ring-primary" 
                    : "border-border bg-surface-secondary text-text-secondary"
                }`}
              />
            </div>
            
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditing}
                placeholder="Email"
                className={`w-full rounded-xl border px-4 py-3 text-sm text-text-primary focus:outline-none transition-colors ${
                  isEditing 
                    ? "border-border bg-white focus:border-primary focus:ring-1 focus:ring-primary" 
                    : "border-border bg-surface-secondary text-text-secondary"
                }`}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleToggleEdit}
                className="flex items-center gap-2 rounded-xl bg-[#0A1128] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0A1128]/90"
              >
                {isEditing ? "Save Changes" : (
                  <>
                    Edit Profile
                    <EditPenIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
