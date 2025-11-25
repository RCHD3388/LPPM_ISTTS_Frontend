// components/ProposalDetailModal.jsx
import React, { useState } from "react";
import { ArrowDownTrayIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import ProposalDetailContent from "../proposal/ProposalDetailContent";

function ProposalDetailForUploadModal({ open, onClose, proposal, userRole }) {
  const [danaDisetujui, setDanaDisetujui] = useState(proposal?.danaDiajukan || 0);
  const [laporan, setLaporan] = useState(null);

  if (!proposal) return null;


  const handleSubmitApproval = (status) => {
    
  
    onClose();
  };

  const isResponded =
    ["Disetujui", "Disetujui + Laporan", "Ditolak"].includes(proposal.status);

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl">
        <ProposalDetailContent proposal={proposal} />


        <div className="border border-base-200 rounded-lg p-4 space-y-3 bg-base-100 mt-4">
          <h4 className="font-semibold text-base">Upload laporan anda</h4>

          {/* Upload Lampiran */}
          <div>
            <label className="label">
              <span className="label-text">Laporan Anda</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setLaporan(e.target.files[0])}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </dialog>
  );
}

export default ProposalDetailForUploadModal;
