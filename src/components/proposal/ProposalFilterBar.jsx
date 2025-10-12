// components/ProposalFilterBar.jsx
import React from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

function ProposalFilterBar({ filters, setFilters }) {
  const statuses = ["", "Menunggu", "Disetujui", "Disetujui + Laporan", "Ditolak"];
  const periodes = ["", "2024/2025", "2025/2026", "2026/2027"];
  const tags = ["", "Teknologi", "Pendidikan", "Kesehatan"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-base-100 p-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <FunnelIcon className="w-5 h-5 text-base-content/60" />
        <span className="text-sm font-medium">Filter:</span>
      </div>

      <select
        className="select select-bordered select-sm"
        value={filters.status}
        onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
      >
        {statuses.map((s, i) => (
          <option key={i} value={s}>
            {s || "Semua Status"}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered select-sm"
        value={filters.periode}
        onChange={(e) => setFilters((prev) => ({ ...prev, periode: e.target.value }))}
      >
        {periodes.map((p, i) => (
          <option key={i} value={p}>
            {p || "Semua Periode"}
          </option>
        ))}
      </select>

      <select
        className="select select-bordered select-sm"
        value={filters.tag}
        onChange={(e) => setFilters((prev) => ({ ...prev, tag: e.target.value }))}
      >
        {tags.map((t, i) => (
          <option key={i} value={t}>
            {t || "Semua Tag"}
          </option>
        ))}
      </select>

      <div className="join ml-auto">
        <div className="join-item">
          <MagnifyingGlassIcon className="w-5 h-5 absolute mt-2 ml-2 text-base-content/60" />
        </div>
        <input
          type="text"
          placeholder="Cari judul proposal..."
          className="input input-bordered input-sm join-item pl-8"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>
    </div>
  );
}

export default ProposalFilterBar;
