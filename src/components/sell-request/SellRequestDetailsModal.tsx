"use client";

import { Modal } from "@/components/ui/Modal";
import type { SellRequest } from "@/types";
import Image from "next/image";

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
    <Modal isOpen={isOpen} onClose={onClose} title="Sell Request">
      <div className="space-y-4">
        <DetailRow label="Name" value={request.name} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Email" value={request.email} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Make" value={request.make} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Model" value={request.model} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Year" value={String(request.year)} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Vin" value={request.vin} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Color" value={request.color} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Miles" value={request.miles} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Loan/Lineholder" value={request.loanLineholder} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Payoff Balance" value={request.payoffBalance} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Overall Condition" value={request.overallCondition} />
        <div className="h-px bg-border-light w-full" />
        
        <DetailRow label="Additional Parts & Accessories" value={request.additionalParts} />
        <div className="h-px bg-border-light w-full" />
        
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-text-muted">Details including scratches, dents, paint, mechanical needs, etc.</span>
          <span className="text-base font-semibold text-text-primary">{request.details}</span>
        </div>
        
        <div className="mt-4 overflow-hidden rounded-xl">
          <Image
            src={request.imageUrl}
            alt="Motorcycle"
            width={400}
            height={250}
            className="w-full object-cover"
          />
        </div>
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
