// components/ProposalDetailModal.jsx
import React, { useState } from "react";
import { ArrowDownTrayIcon, PaperClipIcon } from "@heroicons/react/24/outline";

function ProposalDetailModal({ open, onClose, proposal, userRole }) {
  const [danaDisetujui, setDanaDisetujui] = useState(proposal?.danaDiajukan || 0);
  const [lampiranKetua, setLampiranKetua] = useState(null);

  if (!proposal) return null;

  const handleDownload = (url) => {
    if (!url) return alert("File belum tersedia");
    window.open(url, "_blank");
  };

  const handleSubmitApproval = (status) => {
    console.log({
      status,
      danaDisetujui,
      lampiranKetua,
    });
    alert(`Proposal ${status.toLowerCase()}`);
    onClose();
  };

  const isResponded =
    ["Disetujui", "Disetujui + Laporan", "Ditolak"].includes(proposal.status);

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl">
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

          {proposal.lampiranKetua && (
            <button
              className="btn btn-outline btn-sm gap-2"
              onClick={() => handleDownload(proposal.lampiranKetua)}
            >
              <PaperClipIcon className="w-4 h-4" />
              Lampiran Ketua
            </button>
          )}
        </div>

        {/* Informasi Setelah Disetujui */}
        {isResponded && (
          <div className="mt-4 border border-base-200 rounded-lg bg-base-100 p-4 space-y-2">
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

        {/* Form Tanggapan Ketua */}
        {userRole === "ketua" && !isResponded && (
          <div className="border border-base-200 rounded-lg p-4 space-y-3 bg-base-100 mt-4">
            <h4 className="font-semibold text-base">Tanggapan Ketua LPPM</h4>

            {/* Input Dana Disetujui */}
            <div>
              <label className="label">
                <span className="label-text">Dana Disetujui</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={danaDisetujui}
                onChange={(e) => setDanaDisetujui(Number(e.target.value))}
              />
            </div>

            {/* Upload Lampiran */}
            <div>
              <label className="label">
                <span className="label-text">Lampiran (Opsional)</span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setLampiranKetua(e.target.files[0])}
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleSubmitApproval("Ditolak")}
              >
                Tolak
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleSubmitApproval("Disetujui")}
              >
                Setujui
              </button>
              <button
                className="btn btn-info btn-sm"
                onClick={() => handleSubmitApproval("Disetujui + Laporan")}
              >
                Setujui + Laporan
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </dialog>
  );
}

export default ProposalDetailModal;
