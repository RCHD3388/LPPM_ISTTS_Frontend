import React, { useState } from "react";

function LaporanUploadModal({ proposal, onClose }) {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Harap pilih file laporan");
      return;
    }
    console.log({
      proposalId: proposal.id,
      file,
    });
    alert("Laporan berhasil diupload!");
    onClose();
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Upload Laporan - {proposal.title}
        </h3>
        <div className="mt-3">
          <input
            type="file"
            accept="application/pdf"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default LaporanUploadModal;
