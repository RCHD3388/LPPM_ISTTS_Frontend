import React from "react";

const PaginationController = ({
  page,
  totalPages,
  limit,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onLimitChange,
}) => {
  // Hitung range halaman
  const getPageNumbers = () => {
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, page + 1);

    // Pastikan selalu 3 angka kalau totalPages >= 3
    if (page === 1) {
      end = Math.min(totalPages, 3);
    } else if (page === totalPages) {
      start = Math.max(1, totalPages - 2);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      {/* Limit Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Show</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="select select-bordered select-sm"
        >
          {[5, 10, 20, 50].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <div className="join">
        <button
          className="join-item btn btn-sm"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            className={`join-item btn btn-sm ${
              num === page ? "btn-primary" : ""
            }`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}

        <button
          className="join-item btn btn-sm"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationController;
