"use client";

// =============================================================================
// CalendarDatePicker — Simple UI for date picking (mocked as March 2025)
// =============================================================================

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

export function CalendarDatePicker() {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Mock calendar for March 2025
  const calendarDays = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ];

  const toggleDate = (day: number) => {
    setSelectedDates((prev) => 
      prev.includes(day) 
        ? prev.filter((d) => d !== day) 
        : [...prev, day]
    );
  };

  return (
    <div className="w-80 rounded-2xl border border-border bg-surface p-4 shadow-dropdown">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button className="p-1 hover:bg-surface-hover rounded-full transition-colors">
          <ChevronDownIcon className="h-5 w-5 rotate-90 text-text-primary" />
        </button>
        <span className="font-bold text-text-primary">March 2025</span>
        <button className="p-1 hover:bg-surface-hover rounded-full transition-colors">
          <ChevronDownIcon className="h-5 w-5 -rotate-90 text-text-primary" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-primary py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {calendarDays.flat().map((day, idx) => {
          const isSelected = day !== null && selectedDates.includes(day);
          return (
            <div key={idx} className="flex justify-center">
              {day ? (
                <button
                  onClick={() => toggleDate(day)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                    isSelected
                      ? "bg-text-primary text-white font-bold"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                  }`}
                >
                  {day}
                </button>
              ) : (
                <div className="h-8 w-8" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
