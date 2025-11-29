import React, { useState, useEffect } from 'react';
import apiService from './../../utils/services/apiService'; // Sesuaikan path
import { useToast } from './../../context/ToastContext'; // Sesuaikan path
// Asumsi Anda punya komponen ini untuk upload file
import AttachmentInput from './../AttachmentInput'; 

function ProposalUploadModal({ open, onClose, onSuccess }) {
  // --- State untuk Data Form ---
  const [judul, setJudul] = useState("");
  const [jenis_proposal, setJenisProposal] = useState("Penelitian");
  const [periode_id, setPeriodeId] = useState("");
  const [tag_id, setTagId] = useState("");
  const [dana_diajukan, setDanaDiajukan] = useState("");
  const [contributors, setContributors] = useState([]);
  const [berkas_proposal, setBerkasProposal] = useState(null); // Akan berisi File object

  // --- State untuk Opsi Dropdown & Kontributor ---
  const [dosenOptions, setDosenOptions] = useState([]);
  const [periodeOptions, setPeriodeOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedContributorId, setSelectedContributorId] = useState("");

  // --- State untuk UI & Feedback ---
  const [isFetchingOptions, setIsFetchingOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // Efek untuk mengambil data dropdown saat modal dibuka
  useEffect(() => {
    const fetchDropdownData = async () => {
      if (open) {
        setIsFetchingOptions(true);
        try {
          const [dosenRes, periodeRes, tagRes] = await Promise.all([
            apiService.get("/dosen/all"),
            apiService.get("/periode"),
            apiService.get("/tag")
          ]);
          setDosenOptions(dosenRes.data);
          setPeriodeOptions(periodeRes.data);
          setTagOptions(tagRes.data);
        } catch (error) {
          addToast("Gagal memuat data Dosen, Periode, atau Tag.", "error");
        } finally {
          setIsFetchingOptions(false);
        }
      }
    };
    fetchDropdownData();
  }, [open, addToast]);

  const handleAddContributor = () => {
    const selectedDosen = dosenOptions.find(d => String(d.id) === selectedContributorId);
    if (selectedDosen && !contributors.find(c => c.id === selectedDosen.id)) {
      setContributors([...contributors, selectedDosen]);
      setSelectedContributorId(""); // Reset pilihan
    }
  };

  const handleDeleteContributor = (idToDelete) => {
    setContributors(contributors.filter(c => c.id !== idToDelete));
  };
  
  const resetForm = () => {
    setJudul("");
    setJenisProposal("Penelitian");
    setPeriodeId("");
    setTagId("");
    setDanaDiajukan("");
    setContributors([]);
    setBerkasProposal(null);
  };

  const handleSubmit = async () => {
    // Validasi
    if (!judul || !periode_id || !tag_id || !berkas_proposal || !dana_diajukan) {
      addToast("Semua field wajib diisi!", "error");
      return;
    }

    setIsSubmitting(true);

    // Gunakan FormData untuk mengirim file dan data teks
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("jenis_proposal", jenis_proposal);
    formData.append("periode_id", periode_id);
    formData.append("tag_id", tag_id);
    formData.append("dana_diajukan", dana_diajukan);
    formData.append("berkas_proposal", berkas_proposal);
    
    // Kirim ID kontributor sebagai array JSON string
    const contributorIds = contributors.map(c => c.id);
    formData.append("kontributor_ids", JSON.stringify(contributorIds));

    try {
      await apiService.post("/proposal", formData);
      addToast("Proposal berhasil diunggah.", "success");
      onSuccess(); // Panggil callback sukses
      resetForm();
      onClose();   // Tutup modal
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mengunggah proposal.";
      addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-3xl">
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h3 className="font-bold text-lg mb-4">Upload Proposal Baru</h3>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
          {/* Judul */}
          <div className="form-control">
            <label className="label"><span className="label-text">Judul Proposal</span></label>
            <input type="text" className="input input-bordered w-full" value={judul} onChange={(e) => setJudul(e.target.value)} />
          </div>

          {/* Jenis */}
          <div className="form-control">
            <label className="label"><span className="label-text">Jenis Proposal</span></label>
            <select className="select select-bordered w-full" value={jenis_proposal} onChange={(e) => setJenisProposal(e.target.value)}>
              <option>Penelitian</option>
              <option>Pengabdian</option>
            </select>
          </div>

          {/* Periode & Tag */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Periode</span></label>
              <select className="select select-bordered w-full" value={periode_id} onChange={(e) => setPeriodeId(e.target.value)} disabled={isFetchingOptions}>
                <option value="" disabled>{isFetchingOptions ? "Memuat..." : "Pilih Periode"}</option>
                {periodeOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Tag</span></label>
              <select className="select select-bordered w-full" value={tag_id} onChange={(e) => setTagId(e.target.value)} disabled={isFetchingOptions}>
                <option value="" disabled>{isFetchingOptions ? "Memuat..." : "Pilih Tag"}</option>
                {tagOptions.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>

          {/* Dana Diajukan */}
          <div className="form-control">
            <label className="label"><span className="label-text">Dana Diajukan (Rp)</span></label>
            <input type="number" className="input input-bordered w-full" value={dana_diajukan} onChange={(e) => setDanaDiajukan(e.target.value)} />
          </div>

          {/* Kontributor */}
          <div className="form-control">
            <label className="label"><span className="label-text">Anggota Kontributor (Selain Anda sebagai Ketua)</span></label>
            <div className="p-3 bg-base-200 rounded-lg">
              <div className="flex flex-wrap gap-2 mb-3 min-h-[2.5rem]">
                {contributors.map(c => (
                  <div key={c.id} className="badge badge-lg badge-accent gap-2">
                    {c.name}
                    <button onClick={() => handleDeleteContributor(c.id)} className="btn btn-xs btn-circle btn-ghost btn-error">✕</button>
                  </div>
                ))}
              </div>
              <div className="join w-full">
                <select className="select select-bordered join-item w-full" value={selectedContributorId} onChange={(e) => setSelectedContributorId(e.target.value)} disabled={isFetchingOptions}>
                  <option value="" disabled>{isFetchingOptions ? "Memuat..." : "Pilih Dosen"}</option>
                  {dosenOptions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <button className="btn btn-success ml-2 join-item" onClick={handleAddContributor} disabled={!selectedContributorId}>Tambah</button>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="form-control">
            <label className="label"><span className="label-text">Upload Berkas Proposal (PDF)</span></label>
            <input type="file" className="file-input file-input-bordered w-full" accept=".pdf" onChange={(e) => setBerkasProposal(e.target.files[0])} />
          </div>
        </div>

        <div className="modal-action mt-6">
          <button className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Batal</button>
          <button className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`} onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Mengunggah..." : "Unggah Proposal"}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ProposalUploadModal;