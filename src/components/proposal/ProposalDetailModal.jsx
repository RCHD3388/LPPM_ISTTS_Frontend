// components/ProposalDetailModal.jsx
import React, { useEffect, useState } from "react";
import apiService from "./../../utils/services/apiService"; // Sesuaikan path
import { useToast } from "../../context/ToastContext"; // Sesuaikan path
import ProposalDetailContent from "./ProposalDetailContent";
import AttachmentInput from "../AttachmentInput";
import { isMenunggu, TIPE_PERSETUJUAN } from "../../utils/constants/constant";

function ProposalDetailModal({ open, onClose, proposal, userRole, onSuccess }) { // Tambahkan onSuccess
  const [danaDisetujui, setDanaDisetujui] = useState(0);
  const [lampiranKetua, setLampiranKetua] = useState(null); // Ini akan menampung File object
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // Reset state setiap kali proposal baru dipilih
  useEffect(() => {
    if (proposal) {
      setDanaDisetujui(proposal.dana_diajukan || 0);
      setLampiranKetua(null); // Selalu reset lampiran saat modal dibuka
    }
  }, [proposal]);
  
  if (!proposal) return null;

  const handleSubmitApproval = async (tipePersetujuan) => {
    // Validasi input
    if (danaDisetujui < 0) {
      addToast("Dana yang disetujui tidak boleh negatif.", "error");
      return;
    }

    setIsSubmitting(true);
    
    // Gunakan FormData karena kita mungkin mengirim file
    const formData = new FormData();
    formData.append('dana_disetujui', danaDisetujui);
    formData.append('tipe', tipePersetujuan);

    // Lampirkan file hanya jika ada
    if (lampiranKetua) {
      formData.append('lampiran', lampiranKetua);
    }

    try {
      await apiService.post(`/proposal/${proposal.id}/respond`, formData);
      addToast("Tanggapan proposal berhasil dikirim.", "success");
      onSuccess(); // Panggil callback untuk refresh data di halaman utama
      onClose(); // Tutup modal
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mengirim tanggapan.";
      // addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl">
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <ProposalDetailContent proposal={proposal}/>
        
        {/* Form Tanggapan Ketua */}
        {String(userRole) === '2' && isMenunggu(proposal.status) && (
          <div className="card mt-4 shadow">
            <div className="card-body p-4 space-y-3">
              <h4 className="card-title text-base">Tanggapan Kepala LPPM</h4>

              {/* Input Dana Disetujui */}
              <div className="form-control">
                <label className="label"><span className="label-text">Dana Disetujui (Rp)</span></label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={danaDisetujui}
                  onChange={(e) => setDanaDisetujui(Number(e.target.value))}
                  disabled={isSubmitting}
                />
              </div>

              {/* Upload Lampiran */}
              <div className="form-control">
                <label className="label"><span className="label-text">Lampiran Surat Keputusan (Opsional)</span></label>
                {/* Asumsi AttachmentInput mengembalikan File object ke onChange */}
                <input 
                  type="file" 
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setLampiranKetua(e.target.files[0])}
                  disabled={isSubmitting}
                />
              </div>

              {/* Tombol Aksi */}
              <div className="card-actions justify-end gap-2">
                <button
                  className={`btn btn-error btn-sm ${isSubmitting ? 'loading' : ''}`}
                  onClick={() => handleSubmitApproval(TIPE_PERSETUJUAN.DITOLAK)}
                  disabled={isSubmitting}
                >
                  Tolak
                </button>
                <button
                  className={`btn btn-success btn-sm ${isSubmitting ? 'loading' : ''}`}
                  onClick={() => handleSubmitApproval(TIPE_PERSETUJUAN.DISETUJUI)}
                  disabled={isSubmitting}
                >
                  Setujui
                </button>
                <button
                  className={`btn btn-info btn-sm ${isSubmitting ? 'loading' : ''}`}
                  onClick={() => handleSubmitApproval(TIPE_PERSETUJUAN.DISETUJUI_LAPORAN)}
                  disabled={isSubmitting}
                >
                  Setujui + Laporan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </dialog>
  );
}

export default ProposalDetailModal;