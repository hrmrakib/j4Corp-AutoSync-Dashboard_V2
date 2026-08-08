"use client";

// =============================================================================
// AppointmentDetailsModal — Shows detailed appointment info
// =============================================================================

import { Modal } from "@/components/ui/Modal";
import type { Appointment } from "@/types";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

export function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
}: AppointmentDetailsModalProps) {
  if (!appointment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Appointments Details">
      <div className="space-y-4">
        <DetailRow label="Name" value={appointment.full_name} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Email" value={appointment.email} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Model" value={appointment.model_name} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Location" value={appointment.location} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Date" value={new Date(appointment.appointment_date).toLocaleDateString()} />
        <div className="h-px bg-border-light w-full" />

        <DetailRow label="Details" value={appointment.details || "N/A"} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Have we serviced your vehicle before?" value={appointment.has_serviced_before ? "Yes" : "No"} />
      </div>
    </Modal>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-text-muted">{label}</span>
      <span className="text-base font-semibold text-text-primary">{value}</span>
    </div>
  );
}
