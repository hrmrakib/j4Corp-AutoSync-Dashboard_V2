"use client";

// =============================================================================
// RegisteredUnitsModal — Shows registered vehicle/unit cards
// =============================================================================

import { Modal } from "@/components/ui/Modal";

interface RegisteredUnitsModalProps {
  user: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RegisteredUnitsModal({
  user,
  isOpen,
  onClose,
}: RegisteredUnitsModalProps) {
  // Get units from either 'units', 'registered_units', or 'vehicles' array
  const units = user?.units || user?.registered_units || user?.vehicles || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Registered Units ${user ? `(${user.full_name || user.first_name})` : ''}`}>
      <div className="space-y-4">
        {units.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm text-text-muted">No registered units found for this user.</p>
          </div>
        ) : (
          units.map((unit: any, index: number) => (
          <div
            key={unit.id || index}
            className="rounded-xl border border-border bg-surface-secondary p-4 transition-all hover:border-primary/20 hover:shadow-card"
          >
            {/* Vehicle image placeholder */}
            <div className="mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 h-44 overflow-hidden">
              <div className="text-center">
                <div className="text-5xl mb-2">🏍️</div>
                <p className="text-xs text-text-muted font-medium">
                  {unit.make || unit.brand || unit.unit_brand || "Unknown Make"} {unit.model || unit.unit_model || ""}
                </p>
              </div>
            </div>

            {/* Vehicle details */}
            <div className="space-y-1.5">
              <DetailRow label="Make" value={unit.make || unit.brand || unit.unit_brand || "-"} />
              <DetailRow label="Model" value={unit.model || unit.unit_model || "-"} />
              <DetailRow label="Year" value={unit.year ? String(unit.year) : "-"} />
              <DetailRow label="VIN" value={unit.vin || "-"} />
              <DetailRow label="Date of Purchase" value={unit.purchaseDate || unit.purchase_date || "-"} />
              <DetailRow label="Store of Purchase" value={unit.storeName || unit.store_name || "-"} />
            </div>
          </div>
          ))
        )}
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
