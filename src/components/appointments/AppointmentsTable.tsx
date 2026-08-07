"use client";

// =============================================================================
// AppointmentsTable — Full appointments list with search and actions
// =============================================================================

import { useState, useMemo } from "react";
import { mockAppointments } from "@/data/mock-data";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconButton } from "@/components/ui/IconButton";
import { InfoIcon, ChatIcon, CalendarIcon } from "@/components/ui/Icons";
import { useDebounce } from "@/hooks/useDebounce";
import { AppointmentDetailsModal } from "./AppointmentDetailsModal";
import { Popover } from "@/components/ui/Popover";
import { CalendarDatePicker } from "@/components/ui/CalendarDatePicker";
import type { Appointment } from "@/types";
import { useGetAppointmentsQuery } from "@/redux/features/appointment/appointmentAPI";

export function AppointmentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const {data} = useGetAppointmentsQuery(undefined)
  console.log(data)

  const filteredAppointments = useMemo(() => {
    if (!debouncedSearch) return mockAppointments;

    const query = debouncedSearch.toLowerCase();
    return mockAppointments.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.make.toLowerCase().includes(query) ||
        a.email.toLowerCase().includes(query)
    );
  }, [debouncedSearch]);

  return (
    <>
      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-5">
          <h3 className="text-lg font-bold text-text-primary">Appointments</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
              className="w-full sm:w-64"
            />
            
            <Popover 
              trigger={
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
                  <CalendarIcon className="h-5 w-5" />
                </button>
              }
              content={<CalendarDatePicker />}
              align="right"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-t border-border">
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Make
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Model
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-text-muted"
                  >
                    No appointments found matching &ldquo;{debouncedSearch}&rdquo;
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t border-border-light transition-colors hover:bg-surface-hover"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary whitespace-nowrap">{app.name}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-text-secondary whitespace-nowrap">{app.make}</span>
                        <span className="text-xs text-text-muted whitespace-nowrap">{app.email}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-text-secondary whitespace-nowrap">{app.model}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-text-secondary whitespace-nowrap">{app.location}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-text-secondary whitespace-nowrap">{app.date}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <IconButton
                          label={`View details for ${app.name}`}
                          onClick={() => setSelectedAppointment(app)}
                        >
                          <InfoIcon className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          label={`Message ${app.name}`}
                          onClick={() => alert(`Start chat with ${app.name}`)}
                        >
                          <ChatIcon className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AppointmentDetailsModal
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
      />
    </>
  );
}
