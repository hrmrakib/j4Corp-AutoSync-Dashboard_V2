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
        <DetailRow label="Name" value={appointment.name} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Email" value={appointment.email} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="ZIP Code" value={appointment.zipCode} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Make" value={appointment.make} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Model" value={appointment.model} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Year" value={String(appointment.year)} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Service" value={appointment.service} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Location" value={appointment.location} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Date" value={appointment.date} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Have we serviced your vehicle before?" value={appointment.servicedBefore} />
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
