// components/ProposalDetailModal.jsx
import React, { useState } from "react";
import { ArrowDownTrayIcon, PaperClipIcon } from "@heroicons/react/24/outline";

function ProposalDetailContent({ proposal}) {

  if (!proposal) return null;

  const handleDownload = (url) => {
    if (!url) return alert("File belum tersedia");
    window.open(url, "_blank");
  };

  const isResponded =
    ["Disetujui", "Disetujui + Laporan", "Ditolak"].includes(proposal.status);

  return (
    <div>
      {/* Judul */}
      <h3 className="font-bold text-xl mb-2">{proposal.title}</h3>
      <div className="divider"></div>

      {/* Informasi Proposal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <p><strong>Jenis:</strong> {proposal.jenis}</p>
        <p><strong>Periode:</strong> {proposal.periode}</p>
        <p><strong>Tag:</strong> {proposal.tag}</p>
        <p><strong>Status:</strong> {proposal.status}</p>
        <p><strong>Dana Diajukan:</strong> Rp {proposal.danaDiajukan.toLocaleString()}</p>

        {proposal.danaDisetujui > 0 && (
          <p><strong>Dana Disetujui:</strong> Rp {proposal.danaDisetujui.toLocaleString()}</p>
        )}
      </div>

      {/* Kontributor */}
      <div className="mt-3">
        <strong>Kontributor:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {proposal.contributors.map((c, i) => (
            <span key={i} className="badge badge-neutral">{c}</span>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      {/* Tombol Download Proposal */}
      <div className="flex justify-between items-center mb-3">
        <button
          className="btn btn-outline btn-sm gap-2"
          onClick={() => handleDownload(proposal.fileUrl)}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Download Proposal
        </button>
      </div>

      {/* Informasi Setelah Disetujui */}
      {isResponded && (
        <div className="mt-4 border border-base-200 rounded-lg bg-base-100 p-4 space-y-2 text-sm">
          <h4 className="font-semibold text-base">Informasi Persetujuan</h4>
          <p>
            <strong>Status:</strong>{" "}
            <span className="badge badge-info">{proposal.status}</span>
          </p>
          <p>
            <strong>Dana Disetujui:</strong> Rp{" "}
            {proposal.danaDisetujui
              ? proposal.danaDisetujui.toLocaleString()
              : proposal.danaDiajukan.toLocaleString()}
          </p>

          {proposal.status === "Disetujui + Laporan" && (
            <p>
              <strong>Laporan:</strong> Diperlukan
            </p>
          )}

          {proposal.lampiranKetua && (
            <div>
              <strong>Lampiran Ketua:</strong>{" "}
              <button
                className="btn btn-outline btn-xs ml-2"
                onClick={() => handleDownload(proposal.lampiranKetua)}
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download Lampiran
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProposalDetailContent;
