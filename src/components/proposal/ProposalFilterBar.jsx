// components/ProposalFilterBar.jsx
import React from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { STATUS_PROPOSAL_LAPORAN_BADGE } from "./../../utils/constants/constant";

// Terima props baru: periodeOptions dan tagOptions
function ProposalFilterBar({ filters, setFilters, periodeOptions, tagOptions }) {

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-base-100 p-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <FunnelIcon className="w-5 h-5 text-base-content/60" />
        <span className="text-sm font-medium">Filter:</span>
      </div>

      {/* Filter Status (Tidak berubah) */}
      <select
        className="select select-bordered select-sm"
        value={filters.status}
        onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
      >
        <option key={4} value={-1}>
          {"Semua Status"}
        </option>
        {Object.entries(STATUS_PROPOSAL_LAPORAN_BADGE).map(([key, value]) => (
          <option key={key} value={key}>
            {value.text || "Semua Status"}
          </option>
        ))}
      </select>

      {/* Filter Periode (DINAMIS) */}
      <select
        className="select select-bordered select-sm"
        value={filters.periode}
        onChange={(e) => setFilters((prev) => ({ ...prev, periode: e.target.value }))}
      >
        <option value="">Semua Periode</option>
        {/* Gunakan prop 'periodeOptions' */}
        {periodeOptions.map((periode) => (
          <option key={periode.id} value={periode.id}>
            {periode.name}
          </option>
        ))}
      </select>

      {/* Filter Tag (DINAMIS) */}
      <select
        className="select select-bordered select-sm"
        value={filters.tag}
        onChange={(e) => setFilters((prev) => ({ ...prev, tag: e.target.value }))}
      >
        <option value="">Semua Tag</option>
        {/* Gunakan prop 'tagOptions' */}
        {tagOptions.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      {/* Pencarian (Tidak berubah) */}
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