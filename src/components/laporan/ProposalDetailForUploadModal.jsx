// components/ProposalDetailModal.jsx
import React, { useEffect, useState } from "react";
import ProposalDetailContent from "../proposal/ProposalDetailContent";
import { useToast } from "../../context/ToastContext";
import apiService from "../../utils/services/apiService";
import { isMenunggu } from "../../utils/constants/constant";
import LocalStorageService from "../../utils/services/LocalStorageService";

function ProposalDetailForUploadModal({ open, onClose, proposal, onSuccess }) { // Tambahkan onSuccess

  const user = LocalStorageService.getItem("app_user");

  const [laporanFile, setLaporanFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // Efek untuk mereset state file setiap kali modal dibuka
  useEffect(() => {
    if (open) {
      setLaporanFile(null);
    }
  }, [open]);

  if (!proposal) return null;

  const getLatestLaporan = () => {
    return proposal.laporan.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }
  const getLaporanStatus = () => {
    if (proposal.laporan.length == 0) {
      return true
    } else if (isMenunggu(getLatestLaporan().status)) {
      return false
    } else {
      return true
    }
  }

  const isContributor = () =>{
    return  proposal?.kontributor?.some((k) => k.id == user.id)
  }

  const handleUpload = async () => {
    // 1. Validasi: Pastikan file sudah dipilih
    if (!laporanFile) {
      addToast("Silakan pilih berkas laporan terlebih dahulu.", "error");
      return;
    }

    setIsSubmitting(true);

    // 2. Siapkan FormData untuk mengirim file
    const formData = new FormData();
    formData.append('berkas_laporan', laporanFile); // 'berkas_laporan' harus cocok dengan nama di backend

    try {
      // 3. Panggil endpoint API
      await apiService.post(`/proposal/${proposal.id}/laporan`, formData);

      addToast("Laporan berhasil diunggah.", "success");
      onSuccess(); // Panggil callback untuk me-refresh data di halaman induk
      onClose(); // Tutup modal
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mengunggah laporan.";
      console.log(errorMessage)
      // addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl">
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <ProposalDetailContent proposal={proposal} />


        {getLaporanStatus() && isContributor() && (

          <div className="card  mt-4 shadow">
            <div className="card-body p-4 space-y-3">
              <h4 className="card-title text-base">Upload Laporan Anda</h4>

              {/* Upload Lampiran */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pilih Berkas Laporan (PDF)</span>
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input file-input-bordered w-full"
                  onChange={(e) => setLaporanFile(e.target.files[0])}
                  disabled={isSubmitting}
                />
              </div>

              <div className="card-actions">
                <button
                  className={`btn btn-success btn-sm w-full btn-outline ${isSubmitting ? 'loading' : ''}`}
                  onClick={handleUpload}
                  disabled={!laporanFile || isSubmitting}
                >
                  {isSubmitting ? 'Mengunggah...' : 'Upload Laporan'}
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

export default ProposalDetailForUploadModal;