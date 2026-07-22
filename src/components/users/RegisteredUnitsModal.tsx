"use client";

// =============================================================================
// RegisteredUnitsModal — Shows registered vehicle/unit cards
// =============================================================================

import { Modal } from "@/components/ui/Modal";
import { mockRegisteredUnits } from "@/data/mock-data";

interface RegisteredUnitsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisteredUnitsModal({
  isOpen,
  onClose,
}: RegisteredUnitsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registered Units">
      <div className="space-y-4">
        {mockRegisteredUnits.map((unit) => (
          <div
            key={unit.id}
            className="rounded-xl border border-border bg-surface-secondary p-4 transition-all hover:border-primary/20 hover:shadow-card"
          >
            {/* Vehicle image placeholder */}
            <div className="mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 h-44 overflow-hidden">
              <div className="text-center">
                <div className="text-5xl mb-2">🏍️</div>
                <p className="text-xs text-text-muted font-medium">
                  {unit.make} {unit.model}
                </p>
              </div>
            </div>

            {/* Vehicle details */}
            <div className="space-y-1.5">
              <DetailRow label="Make" value={unit.make} />
              <DetailRow label="Model" value={unit.model} />
              <DetailRow label="Year" value={String(unit.year)} />
              <DetailRow label="VIN" value={unit.vin} />
              <DetailRow label="Date of Purchase" value={unit.purchaseDate} />
              <DetailRow label="Store of Purchase" value={unit.storeName} />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

/** Helper component for displaying a label-value detail row */
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-text-secondary">
      {label}:{" "}
      <span className="font-semibold text-text-primary">{value}</span>
    </p>
  );
}
