// components/ProposalCard.jsx
import React from "react";
import { CalendarDaysIcon, UserGroupIcon, TagIcon } from "@heroicons/react/24/outline";

function ProposalCard({ proposal, page = "proposal", onClick }) {
  const statusColor = {
    Menunggu: "badge-warning",
    Disetujui: "badge-success",
    "Disetujui + Laporan": "badge-info",
    Ditolak: "badge-error",
  };

  return (
    <div
      onClick={onClick}
      className="card card-compact bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-base font-semibold line-clamp-1">{proposal.title}</h2>
          {page === "proposal" && <div className={`badge ${statusColor[proposal.status] || "badge-ghost"}`}>
            {proposal.status}
          </div>}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70 mt-2">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4" />
            {proposal.periode}
          </div>
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{proposal.contributors.length} kontributor</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70 mt-2">
          <div className="flex items-center gap-1">
            <TagIcon className="w-4 h-4" />
            <span className="badge badge-neutral badge-sm">{proposal.tag}</span>
          </div>
          {proposal.perluLaporan && <div className="flex items-center gap-1">
            <span className="badge badge-info badge-sm">Wajib laporan</span>
          </div>}
        </div>

        <p className="text-xs text-base-content/60 mt-1">
          Diupload pada {new Date(proposal.date).toLocaleDateString("id-ID")}
        </p>
      </div>
    </div>
  );
}

export default ProposalCard;
