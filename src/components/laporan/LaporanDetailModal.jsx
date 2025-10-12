import React, { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function LaporanDetailModal({ laporan, onClose, userRole }) {
  const [pesan, setPesan] = useState("");
  const [lampiran, setLampiran] = useState(null);

  const handleResponse = (status) => {
    console.log({
      laporanId: laporan.id,
      status,
      pesan,
      lampiran,
    });
    alert(`Laporan ${status.toLowerCase()}`);
    onClose();
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-xl mb-2">{laporan.proposal.title}</h3>
        <div className="divider"></div>

        <p><strong>Jenis:</strong> {laporan.proposal.jenis}</p>
        <p><strong>Periode:</strong> {laporan.proposal.periode}</p>
        <p><strong>Status Laporan:</strong> {laporan.status}</p>

        <div className="mt-4">
          <strong>Lampiran Laporan:</strong>
          <button
            className="btn btn-sm btn-outline ml-2"
            onClick={() => window.open(laporan.lampiran, "_blank")}
          >
            <ArrowDownTrayIcon className="w-4 h-4" /> Download
          </button>
        </div>

        {/* Lampiran & pesan dari ketua jika sudah disetujui */}
        {laporan.status === "Disetujui" && laporan.pesan && (
          <div className="mt-3 bg-base-200 p-3 rounded-md">
            <p><strong>Pesan Ketua:</strong> {laporan.pesan}</p>
            {laporan.lampiranKetua && (
              <button
                className="btn btn-sm btn-outline mt-2"
                onClick={() => window.open(laporan.lampiranKetua, "_blank")}
              >
                <ArrowDownTrayIcon className="w-4 h-4" /> Download Lampiran Ketua
              </button>
            )}
          </div>
        )}

        {userRole === "ketua" && laporan.status === "Menunggu Review" && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="label">
                <span className="label-text">Pesan</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Berikan pesan atau catatan..."
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Lampiran (Opsional)</span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setLampiran(e.target.files[0])}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-error btn-sm"
                onClick={() => handleResponse("Ditolak")}
              >
                Tolak
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleResponse("Disetujui")}
              >
                Setujui
              </button>
            </div>
          </div>
        )}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default LaporanDetailModal;
