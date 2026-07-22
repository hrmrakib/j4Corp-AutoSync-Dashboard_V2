"use client";

import { useState, useMemo } from "react";
import { mockSellRequests } from "@/data/mock-data";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconButton } from "@/components/ui/IconButton";
import { InfoIcon, ChatIcon, CalendarIcon } from "@/components/ui/Icons";
import { useDebounce } from "@/hooks/useDebounce";
import { SellRequestDetailsModal } from "./SellRequestDetailsModal";
import { Popover } from "@/components/ui/Popover";
import { CalendarDatePicker } from "@/components/ui/CalendarDatePicker";
import type { SellRequest } from "@/types";

export function SellRequestTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);
  const [selectedRequest, setSelectedRequest] = useState<SellRequest | null>(null);

  const filteredRequests = useMemo(() => {
    if (!debouncedSearch) return mockSellRequests;

    const query = debouncedSearch.toLowerCase();
    return mockSellRequests.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.make.toLowerCase().includes(query)
    );
  }, [debouncedSearch]);

  return (
    <>
      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-5">
          <h3 className="text-lg font-bold text-text-primary">Sell Request</h3>
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
                  Year
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Color
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-text-muted"
                  >
                    No sell requests found matching &ldquo;{debouncedSearch}&rdquo;
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-t border-border-light transition-colors hover:bg-surface-hover"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-text-primary whitespace-nowrap">{req.name}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-text-secondary whitespace-nowrap">{req.make}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-text-secondary whitespace-nowrap">{req.model}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-text-secondary whitespace-nowrap">{req.year}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-text-secondary whitespace-nowrap">{req.color}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <IconButton
                          label={`View details for ${req.name}`}
                          onClick={() => setSelectedRequest(req)}
                        >
                          <InfoIcon className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          label={`Chat with ${req.name}`}
                          onClick={() => alert(`Start chat with ${req.name}`)}
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

      <SellRequestDetailsModal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
      />
    </>
  );
}
