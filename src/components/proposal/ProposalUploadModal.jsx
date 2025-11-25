// components/ProposalUploadModal.jsx
import React, { useState } from "react";
import AttachmentInput from "../AttachmentInput";

function ProposalUploadModal({ open, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [jenis, setJenis] = useState("Penelitian");
  
  const [danaDiajukan, setDanaDiajukan] = useState("");
  const [contributors, setContributors] = useState([{ id: 3, name: "Hendrawan Armanto, S.Kom., M.Kom." }]); // default user
  const [attachment, setAttachment] = useState(null);

  const [newContributor, setNewContributor] = useState(null);

  const [periode, setPeriode] = useState("");
  const [tag, setTag] = useState("");
  const [tagOptions, setTagOptions] = useState([{ id: 1, name: "Computer Science" }, { id: 2, name: "Tag 2" }]);
  const [tagList, setTagList] = useState([]);
  const [dosenList, setDosenList] = useState([{ id: 1, name: "Grace Levina Dewi, S.Kom., M.Kom." }, { id: 2, name: "Prof. Dr. Ir Gunawan, M.Kom." }]);

  const handleAddContributor = () => {
    let new_con = dosenList.find((d) => d.id.toString() === newContributor);

    if (new_con && !contributors.find((c) => c.id === new_con.id)) {
      setContributors([...contributors, new_con]);
      setNewContributor(null);
    }
  };

  const handleDeleteContributor = (id) => {
    setContributors(contributors.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (!title || !periode || !tag || !attachment || !danaDiajukan || contributors.length === 0) {
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
      fileUrl: URL.createObjectURL(attachment.file),
      date: new Date(),
      status: "Menunggu",
    };

    onSuccess(newProposal);
    onClose();
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
                <option value="2024/2025">2024/2025 Gasal</option>
                <option value="2025/2026">2025/2026</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Tag</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="">Pilih Tag</option>
                {tagOptions && tagOptions.map((tagOption, idx) => (
                  <option key={idx} value={tagOption.id}>{tagOption.name}</option>
                ))}
              </select>
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

              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {contributors.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      {/* Badge untuk nama kontributor */}
                      <span className="badge badge-neutral">{c.name}</span>

                      <button
                        className="btn btn-xs btn-primary text-error"
                        onClick={() => handleDeleteContributor(c.id)} // Ganti c.id dengan properti yang sesuai
                        aria-label={`Hapus kontributor ${c.name}`}
                      >
                        {/* Ikon untuk tombol delete (misalnya, ikon 'x' atau tempat sampah) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select
                    className="select select-bordered w-full"
                    value={dosenList.find((d) => d.id === newContributor) || null}
                    onChange={(e) => { console.log(e.target.value); setNewContributor(e.target.value) }}
                  >
                    <option value={""}>Dosen</option>
                    {dosenList.map((d, idx) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-md" onClick={handleAddContributor}>
                    Tambah
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="label">
              <span className="label-text">Upload Proposal (PDF)</span>
            </label>
            <AttachmentInput value={attachment} value_type={"file"} onChange={setAttachment} />
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
