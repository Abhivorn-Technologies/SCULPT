"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface AdminPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  itemName?: string;
}

export default function AdminPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  itemName = "items",
}: AdminPaginationProps) {
  if (totalItems <= 0) return null;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startItem = (validCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(validCurrentPage * pageSize, totalItems);

  // Generate smart page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (validCurrentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, validCurrentPage - 1);
      const end = Math.min(totalPages - 1, validCurrentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (validCurrentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="p-4 bg-white border border-[#EFE8E0] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs text-xs text-[#555555]">
      {/* Left: Range text & Page Size Dropdown */}
      <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
        <span>
          Showing <strong className="text-[#151515]">{startItem}</strong> -{" "}
          <strong className="text-[#151515]">{endItem}</strong> of{" "}
          <strong className="text-[#E6663A]">{totalItems}</strong> {itemName}
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#EFE8E0]">
            <span className="text-[11px] text-[#777777]">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="bg-[#F8F6F2] border border-[#EFE8E0] rounded-lg px-2 py-1 text-xs font-semibold text-[#151515] focus:outline-none focus:border-[#E6663A] cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right: Navigation Controls */}
      <div className="flex items-center gap-1.5">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={validCurrentPage === 1}
          className="p-1.5 rounded-xl border border-[#EFE8E0] bg-[#F8F6F2] text-[#555555] hover:text-[#151515] hover:border-[#E6663A] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
          title="First Page"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(validCurrentPage - 1)}
          disabled={validCurrentPage === 1}
          className="p-1.5 rounded-xl border border-[#EFE8E0] bg-[#F8F6F2] text-[#555555] hover:text-[#151515] hover:border-[#E6663A] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
          title="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1.5 text-xs text-[#888888] select-none"
                >
                  ...
                </span>
              );
            }

            const pageNum = item as number;
            const isActive = pageNum === validCurrentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`min-w-8 h-8 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#E6663A] text-white shadow-sm shadow-[#E6663A]/25"
                    : "bg-[#F8F6F2] border border-[#EFE8E0] text-[#555555] hover:text-[#151515] hover:border-[#E6663A]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(validCurrentPage + 1)}
          disabled={validCurrentPage === totalPages}
          className="p-1.5 rounded-xl border border-[#EFE8E0] bg-[#F8F6F2] text-[#555555] hover:text-[#151515] hover:border-[#E6663A] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
          title="Next Page"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={validCurrentPage === totalPages}
          className="p-1.5 rounded-xl border border-[#EFE8E0] bg-[#F8F6F2] text-[#555555] hover:text-[#151515] hover:border-[#E6663A] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
          title="Last Page"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
