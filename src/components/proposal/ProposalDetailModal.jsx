// components/ProposalDetailModal.jsx
import React, { useState } from "react";
import { ArrowDownTrayIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import ProposalDetailContent from "./ProposalDetailContent";
import AttachmentInput from "../AttachmentInput";

function ProposalDetailModal({ open, onClose, proposal, userRole }) {
  const [danaDisetujui, setDanaDisetujui] = useState(proposal?.danaDiajukan || 0);
  const [lampiranKetua, setLampiranKetua] = useState(null);

  if (!proposal) return null;

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
        <ProposalDetailContent proposal={proposal}/>

        {/* Form Tanggapan Ketua */}
        {userRole === "ketua" && !isResponded && (
          <div className="border border-base-200 rounded-lg p-4 space-y-3 bg-base-100 mt-4">
            <h4 className="font-semibold text-base">Tanggapan Kepala LPPM</h4>

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
              <AttachmentInput value={lampiranKetua} value_type={"file"} onChange={setLampiranKetua} />
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
