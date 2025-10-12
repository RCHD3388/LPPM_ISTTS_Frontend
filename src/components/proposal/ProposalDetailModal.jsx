// components/ProposalDetailModal.jsx
import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function ProposalDetailModal({ open, onClose, proposal, userRole }) {
  if (!proposal) return null;

  const handleAction = (action) => {
    alert(`Proposal "${proposal.title}" di${action.toLowerCase()}.`);
    onClose();
  };

  const handleDownload = () => {
    if (proposal.fileUrl) {
      window.open(proposal.fileUrl, "_blank");
    } else {
      alert("File belum tersedia.");
    }
  };

  const isResponded =
    proposal.status === "Disetujui" ||
    proposal.status === "Disetujui + Laporan" ||
    proposal.status === "Ditolak";

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl bg-base-100">
        <h3 className="font-bold text-xl mb-3">{proposal.title}</h3>
        <div className="divider"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p><strong>Periode:</strong> {proposal.periode}</p>
          <p><strong>Tag:</strong> <span className="badge badge-neutral">{proposal.tag}</span></p>
          <p><strong>Tanggal Upload:</strong> {new Date(proposal.date).toLocaleDateString("id-ID")}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                proposal.status === "Disetujui"
                  ? "badge-success"
                  : proposal.status === "Disetujui + Laporan"
                  ? "badge-info"
                  : proposal.status === "Ditolak"
                  ? "badge-error"
                  : "badge-warning"
              }`}
            >
              {proposal.status}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <strong>Kontributor:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {proposal.contributors.map((c, i) => (
              <span key={i} className="badge badge-neutral">{c}</span>
            ))}
          </div>
        </div>

        <div className="divider"></div>

        <div className="flex justify-between items-center">
          <button className="btn btn-outline btn-sm gap-2" onClick={handleDownload}>
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download Proposal
          </button>

          {userRole === "ketua" && (
            <div className="flex gap-2">
              {isResponded ? (
                <div className="badge badge-outline badge-info px-4 py-3 font-semibold">
                  Sudah direspon
                </div>
              ) : (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAction("Setujui")}
                  >
                    Setujui
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleAction("Setujui + Laporan")}
                  >
                    Setujui + Laporan
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleAction("Tolak")}
                  >
                    Tolak
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </dialog>
  );
}

export default ProposalDetailModal;
