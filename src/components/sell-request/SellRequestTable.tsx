"use client";

import { useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { InfoIcon, ChatIcon, CalendarIcon } from "@/components/ui/Icons";
import { useDebounce } from "@/hooks/useDebounce";
import { SellRequestDetailsModal } from "./SellRequestDetailsModal";
import { Popover } from "@/components/ui/Popover";
import { CalendarDatePicker } from "@/components/ui/CalendarDatePicker";
import type { SellRequest } from "@/types";
import { useGetSellRequestsQuery } from "@/redux/features/sellRequest/sellRequestAPI";

export function SellRequestTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery);
  const [selectedRequest, setSelectedRequest] = useState<SellRequest | null>(null);

  const { data, isLoading, isError } = useGetSellRequestsQuery(debouncedSearch);
  const sellRequests: SellRequest[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-red-500">
        Failed to load sell requests.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-5 bg-white border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Sell Requests</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search seller or brand..."
              className="w-full sm:w-64"
            />
            
            <Popover 
              trigger={
                <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
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
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Details snippet
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sellRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No sell requests found.
                  </td>
                </tr>
              ) : (
                sellRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="transition-colors hover:bg-gray-50/80 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold mr-3">
                          {req.seller_name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{req.seller_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{req.unit_brand}</span>
                        <span className="text-xs text-gray-500">{req.unit_model}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(req.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 truncate max-w-[200px] inline-block">
                        {req.additional_details}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="View Details"
                        >
                          <InfoIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => alert(`Start chat with ${req.seller_name}`)}
                          className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                          title="Chat"
                        >
                          <ChatIcon className="h-4 w-4" />
                        </button>
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
