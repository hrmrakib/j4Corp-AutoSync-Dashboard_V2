"use client";

import { Modal } from "@/components/ui/Modal";
import type { SellRequest } from "@/types";

interface SellRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: SellRequest | null;
}

export function SellRequestDetailsModal({
  isOpen,
  onClose,
  request,
}: SellRequestDetailsModalProps) {
  if (!request) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sell Request Details">
      <div className="space-y-4">
        <DetailRow label="Seller Name" value={request.seller_name} />
        <div className="h-px bg-gray-100 w-full" />
        
        <DetailRow label="Brand" value={request.unit_brand} />
        <div className="h-px bg-gray-100 w-full" />
        
        <DetailRow label="Model" value={request.unit_model} />
        <div className="h-px bg-gray-100 w-full" />
        
        <DetailRow label="Submitted At" value={new Date(request.created_at).toLocaleString()} />
        <div className="h-px bg-gray-100 w-full" />
        
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Additional Details</span>
          <span className="text-base font-medium text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
            {request.additional_details || "No additional details provided."}
          </span>
        </div>
      </div>
    </Modal>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-base font-semibold text-gray-900">{value}</span>
    </div>
  );
}
