// components/ProposalUploadModal.jsx
import React, { useState } from "react";

function ProposalUploadModal({ open, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [jenis, setJenis] = useState("Penelitian");
  const [periode, setPeriode] = useState("");
  const [tag, setTag] = useState("");
  const [danaDiajukan, setDanaDiajukan] = useState("");
  const [contributors, setContributors] = useState(["Dr. Dosen A"]); // default user
  const [file, setFile] = useState(null);

  const allDosen = ["Dr. Dosen A", "Dr. Dosen B", "Dr. Dosen C", "Dr. Dosen D"]; // contoh

  const handleSave = () => {
    if (!title || !periode || !tag || !file || !danaDiajukan) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newProposal = {
      id: Date.now(),
      title,
      jenis,
      periode,
      tag,
      contributors,
      danaDiajukan: Number(danaDiajukan),
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      fileUrl: URL.createObjectURL(file),
      date: new Date(),
      status: "Menunggu",
    };

    onSuccess(newProposal);
    onClose();
  };

  const handleContributorToggle = (dosen) => {
    setContributors((prev) =>
      prev.includes(dosen)
        ? prev.filter((d) => d !== dosen)
        : [...prev, dosen]
    );
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg mb-3">Upload Proposal Baru</h3>

        <div className="space-y-3">
          {/* Judul */}
          <div>
            <label className="label">
              <span className="label-text">Judul Proposal</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Contoh: Pengembangan AI untuk Pendidikan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Jenis */}
          <div>
            <label className="label">
              <span className="label-text">Jenis Proposal</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
            >
              <option>Penelitian</option>
              <option>Pengabdian</option>
            </select>
          </div>

          {/* Periode & Tag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
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
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Tag</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Contoh: Teknologi"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
          </div>

          {/* Dana Diajukan */}
          <div>
            <label className="label">
              <span className="label-text">Dana Diajukan (Rp)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={danaDiajukan}
              onChange={(e) => setDanaDiajukan(e.target.value)}
            />
          </div>

          {/* Kontributor */}
          <div>
            <label className="label">
              <span className="label-text">Kontributor</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {allDosen.map((d) => (
                <label key={d} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={contributors.includes(d)}
                    onChange={() => handleContributorToggle(d)}
                  />
                  <span className="text-sm">{d}</span>
                </label>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="label">
              <span className="label-text">Upload Proposal (PDF)</span>
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Batal</button>
          <button className="btn btn-primary" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ProposalUploadModal;
