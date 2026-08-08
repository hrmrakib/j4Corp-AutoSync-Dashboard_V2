"use client";

// =============================================================================
// AppointmentsTable — Full appointments list with search and actions
// =============================================================================

import { useState, useMemo } from "react";
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
  const { data, isLoading, isError } = useGetAppointmentsQuery(undefined);
  
  const appointments: Appointment[] = data?.data?.results || [];

  const filteredAppointments = useMemo(() => {
    if (!debouncedSearch) return appointments;

    const query = debouncedSearch.toLowerCase();
    return appointments.filter(
      (a) =>
        a.full_name.toLowerCase().includes(query) ||
        a.model_name.toLowerCase().includes(query) ||
        a.email.toLowerCase().includes(query)
    );
  }, [debouncedSearch, appointments]);

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
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center py-20 text-red-500">
              Failed to load appointments. Please try again.
            </div>
          ) : (
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-surface-hover/50">
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Vehicle Model
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-sm text-text-muted bg-surface/50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <InfoIcon className="h-8 w-8 opacity-20" />
                        <p>No appointments found {debouncedSearch ? `matching "${debouncedSearch}"` : ''}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app) => (
                    <tr
                      key={app.id}
                      className="transition-colors hover:bg-surface-hover/80 group"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                            {app.full_name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-text-primary whitespace-nowrap group-hover:text-primary transition-colors">{app.full_name}</span>
                            <span className="text-xs text-text-muted whitespace-nowrap">{app.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-col">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-surface-hover text-text-secondary w-fit border border-border/50">
                            {app.model_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-medium text-text-secondary whitespace-nowrap">{app.location}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <CalendarIcon className="h-4 w-4 opacity-70" />
                          <span className="text-sm font-medium whitespace-nowrap">
                            {new Date(app.appointment_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${app.has_serviced_before ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                          {app.has_serviced_before ? 'Returning' : 'New Customer'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <IconButton
                            label={`View details for ${app.full_name}`}
                            onClick={() => setSelectedAppointment(app)}
                          >
                            <InfoIcon className="h-4 w-4" />
                          </IconButton>
                          <IconButton
                            label={`Message ${app.full_name}`}
                            onClick={() => alert(`Start chat with ${app.full_name}`)}
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
          )}
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
