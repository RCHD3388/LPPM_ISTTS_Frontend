// components/ProposalUploadModal.jsx
import React, { useState } from "react";

function ProposalUploadModal({ open, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [periode, setPeriode] = useState("");
  const [tag, setTag] = useState("");
  const [contributors, setContributors] = useState(["Anda"]);
  const [newContributor, setNewContributor] = useState("");
  const [file, setFile] = useState(null);

  const handleAddContributor = () => {
    if (newContributor && !contributors.includes(newContributor)) {
      setContributors([...contributors, newContributor]);
      setNewContributor("");
    }
  };

  const handleSubmit = () => {
    if (!title || !periode || !tag || !file) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newProposal = {
      id: Date.now(),
      title,
      periode,
      tag,
      contributors,
      date: new Date(),
      status: "Menunggu",
      file,
    };

    onSuccess(newProposal);
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-lg mb-3">Upload Proposal Baru</h3>

        <div className="space-y-3">
          <div>
            <label className="label">
              <span className="label-text">Judul Proposal</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Riset IoT di Kampus"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="label">
                <span className="label-text">Periode</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
              >
                <option value="">Pilih Periode</option>
                <option value="2024/2025">2024/2025</option>
                <option value="2025/2026">2025/2026</option>
                <option value="2026/2027">2026/2027</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="label">
                <span className="label-text">Tag</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="">Pilih Tag</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Kesehatan">Kesehatan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Kontributor</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {contributors.map((c, idx) => (
                <span key={idx} className="badge badge-neutral">{c}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="input input-bordered input-sm flex-1"
                placeholder="Tambah dosen lain"
                value={newContributor}
                onChange={(e) => setNewContributor(e.target.value)}
              />
              <button className="btn btn-sm" onClick={handleAddContributor}>
                Tambah
              </button>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Upload File Proposal (PDF)</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Upload</button>
        </div>
      </div>
    </dialog>
  );
}

export default ProposalUploadModal;
