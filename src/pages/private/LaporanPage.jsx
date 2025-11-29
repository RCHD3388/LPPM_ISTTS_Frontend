import { useEffect, useState } from "react";
import { PlusIcon, CheckIcon, XMarkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import ProposalCard from "../../components/proposal/ProposalCard";
import ProposalDetailModal from "../../components/proposal/ProposalDetailModal";
import ProposalDetailForUploadModal from "../../components/laporan/ProposalDetailForUploadModal";
import ProposalDetailContent from "../../components/proposal/ProposalDetailContent";
import LaporanCard from "../../components/laporan/LaporanCard";
import LocalStorageService from "../../utils/services/LocalStorageService";
import { useToast } from "../../context/ToastContext";
import apiService from "../../utils/services/apiService";
import { onDownloadServerFile } from "../../utils/services/fileApi";
import { isMenunggu, TIPE_PERSETUJUAN,  STATUS_PROPOSAL_LAPORAN_BADGE } from "../../utils/constants/constant";
import LaporanRiwayatTabPage from "./LaporanRiwayatTabPage";
 

function LaporanPage() {
  const { addToast } = useToast();
  const user = LocalStorageService.getItem("app_user");

  const [activeTab, setActiveTab] = useState("upload");
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [proposals, setProposals] = useState([]);
  const [laporans, setLaporans] = useState([]);
  const [selectedLaporanProposal, setSelectedLaporanProposal] = useState(null);

  // Fungsi untuk mengambil data dari backend
  const fetchProposals = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get("/laporan/required");
      setProposals(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.message || "Gagal memuat data proposal.";
      addToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectedLaporanFromProposal = (proposal) => {
    let latestLaporan = proposal.laporan.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    setSelectedLaporan(latestLaporan);
    setSelectedLaporanProposal(proposal);
  };

  const [catatanTanggapan, setCatatanTanggapan] = useState("");
  const [lampiranTanggapan, setLampiranTanggapan] = useState(null); // Untuk menampung File object
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tambahkan useEffect ini untuk mereset form setiap kali modal dibuka
  useEffect(() => {
    if (selectedLaporan) {
      setCatatanTanggapan("");
      setLampiranTanggapan(null);
    }
  }, [selectedLaporan]);

  const handleTanggapan = async (status) => {
    // Guard clause untuk memastikan ada laporan yang dipilih
    if (!selectedLaporan) {
      addToast("Tidak ada laporan yang dipilih.", "error");
      return;
    }

    setIsSubmitting(true);

    // Gunakan FormData karena kita mengirim file
    const formData = new FormData();
    formData.append('status', status);
    formData.append('catatan', catatanTanggapan);

    // Lampirkan file hanya jika ada
    if (lampiranTanggapan) {
      formData.append('lampiran', lampiranTanggapan);
    }

    try {
      // Panggil endpoint backend
      await apiService.post(`/laporan/${selectedLaporan.id}/respond`, formData);

      addToast("Tanggapan untuk laporan berhasil dikirim.", "success");
      fetchProposals(); // Refresh data di halaman
      setSelectedLaporan(null); // Tutup modal
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mengirim tanggapan.";
      addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProposals();
  }, []); // Dependency array kosong agar hanya berjalan sekali

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Laporan Penelitian & Pengabdian</h1>
      <p className="text-sm text-base-content/70 mb-4">
        Kelola laporan hasil penelitian atau pengabdian berdasarkan proposal.
      </p>

      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed">
        <button
          className={`tab ${activeTab === "upload" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Laporan
        </button>
        <button
          className={`tab ${activeTab === "riwayat" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("riwayat")}
        >
          Riwayat Laporan
        </button>
      </div>

      {/* Tab: Upload laporan (Dosen + Ketua) */}
      {activeTab === "upload" && (
        <div className="grid gap-3 mt-4">
          {proposals.length > 0 && <p className="text-sm text-base-content/70">Berikut merupakan proposal yang perlu laporan dan belum diupload:</p>}
          {proposals.length === 0 && (
            <p className="text-sm text-base-content/70">Tidak ada laporan yang perlu diupload.</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {proposals.map((p) => (
              <ProposalCard
                key={p.id}
                proposal={p}
                page={"laporan"}
                onClick={() => setSelectedProposal(p)}
                onReview={() => setSelectedLaporanFromProposal(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab: Riwayat laporan (semua role) */}
      {activeTab === "riwayat" && (
        <div className="">
          <LaporanRiwayatTabPage/>
        </div>
      )}

      {/* Modal Detail untuk Ketua */}
      {selectedLaporan && (
        <dialog open className="modal">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-lg mb-2">
              Detail Laporan Proposal
            </h3>
            <p className="text-sm text-base-content/70 mb-1">
              {dayjs(selectedLaporan.date).format("DD MMM YYYY")}
            </p>
            <p className="text-sm text-black mb-3">
              <span className="font-semibold">Status Laporan: </span>
              <span
                className={`badge ${STATUS_PROPOSAL_LAPORAN_BADGE[selectedLaporan.status].color}`}
              >
                {STATUS_PROPOSAL_LAPORAN_BADGE[selectedLaporan.status].text}
              </span>
            </p>

            <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lihat Detail Proposal</div>
              <div className="collapse-content text-sm">
                <ProposalDetailContent proposal={selectedLaporanProposal} />
              </div>
            </div>

            <div
              onClick={() => { onDownloadServerFile(selectedLaporan.berkas_laporan) }}
              target="_blank"
              className="btn btn-sm btn-outline gap-2 my-3"
            >
              <PaperClipIcon className="w-4 h-4" />
              Lihat Laporan Proposal
            </div>

            {user.role_id == 2 && isMenunggu(selectedLaporan.status) && <div>
              <textarea
                placeholder="Tambahkan pesan untuk dosen..."
                className="textarea textarea-bordered w-full mb-3"
                onChange={(e) => setCatatanTanggapan(e.target.value)}
                disabled={isSubmitting}
              ></textarea>

              <input
                type="file"
                accept="application/pdf"
                className="file-input file-input-bordered w-full mb-4"
                onChange={(e) => setLampiranTanggapan(e.target.files[0])}
                disabled={isSubmitting}
              />

              <div className="flex justify-end gap-2">
                <button
                  className={`btn btn-error btn-sm ${isSubmitting ? 'loading' : ''}`}
                  onClick={() => handleTanggapan(TIPE_PERSETUJUAN.DITOLAK)} // Menggunakan konstanta status
                  disabled={isSubmitting}
                >
                  <XMarkIcon className="w-4 h-4" />
                  Tolak
                </button>
                <button
                  className={`btn btn-success btn-sm ${isSubmitting ? 'loading' : ''}`}
                  onClick={() => handleTanggapan(TIPE_PERSETUJUAN.DISETUJUI)} // Menggunakan konstanta status
                  disabled={isSubmitting}
                >
                  <CheckIcon className="w-4 h-4" />
                  Setujui
                </button>
              </div>
            </div>}

            {/* Tombol tutup */}
            <div className="flex justify-end gap-2 mt-2">
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedLaporan(null)}>
                Tutup
              </button>
            </div>

          </div>
        </dialog>
      )}

      <ProposalDetailForUploadModal
        open={!!selectedProposal}
        onSuccess={() => fetchProposals()}
        onClose={() => setSelectedProposal(null)}
        proposal={selectedProposal}
        userRole={user.role_id}
      />
    </div>
  );
}

export default LaporanPage;
