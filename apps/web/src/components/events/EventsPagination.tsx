import type React from "react";

export interface EventsPaginationProps {
  page: number;
  totalPages: number;
  totalCount: number;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (p: number) => void;
  changeLimit: (n: number) => void;
  limit: number;
  loadingPage: boolean;
}

export const EventsPagination: React.FC<EventsPaginationProps> = ({
  page,
  totalPages,
  totalCount,
  prevPage,
  nextPage,
  goToPage,
  changeLimit,
  limit,
  loadingPage,
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers (show up to 5 pages, with ellipsis if needed)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={prevPage}
          disabled={page === 1 || loadingPage}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Anterior
        </button>
        {getPageNumbers().map((p, idx) =>
          p === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(Number(p))}
              disabled={p === page || loadingPage}
              className={`rounded border px-3 py-1 ${p === page ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"} disabled:opacity-50`}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={nextPage}
          disabled={page === totalPages || loadingPage}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">
          Total: {totalCount} eventos
        </span>
        <label className="ml-4 text-gray-600 text-sm">Por página:</label>
        <select
          value={limit}
          onChange={(e) => changeLimit(Number(e.target.value))}
          disabled={loadingPage}
          className="rounded border border-gray-300 p-1 text-sm"
        >
          {[5, 10, 20, 50].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
