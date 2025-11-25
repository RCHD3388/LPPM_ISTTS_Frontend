import { useState } from "react";
import { PlusIcon, CheckIcon, XMarkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import ProposalCard from "../../components/proposal/ProposalCard";
import ProposalDetailModal from "../../components/proposal/ProposalDetailModal";
import ProposalDetailForUploadModal from "../../components/laporan/ProposalDetailForUploadModal";
import ProposalDetailContent from "../../components/proposal/ProposalDetailContent";
import LaporanCard from "../../components/laporan/LaporanCard";

function LaporanPage({ userRole = "ketua" }) {
  const [activeTab, setActiveTab] = useState(userRole === "ketua" ? "semua" : "upload");
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);

  // contoh data proposal
  const [proposals] = useState([
    {
      id: 1,
      title: "Sistem Monitoring Air Otomatis Berbasis Sensor",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Teknologi",
      contributors: ["Grace Levina Dewi, S.Kom., M.Kom."],
      danaDiajukan: 30000000,
      danaDisetujui: 28000000,
      perluLaporan: true,
      lampiranKetua: "/sk_monitoring_air.pdf",
      date: new Date("2025-08-15"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_monitoring.pdf",
    },
    {
      id: 2,
      title: "Pelatihan Literasi Keuangan untuk Ibu Rumah Tangga",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Ekonomi",
      contributors: ["Dr. Ir. Hartarto Junaedi, S.Kom., M.Kom., IPM., ASEAN Eng."],
      danaDiajukan: 15000000,
      danaDisetujui: 15000000,
      perluLaporan: true,
      lampiranKetua: "/sk_literasi_keuangan.pdf",
      date: new Date("2025-08-20"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_literasi.pdf",
    },
    {
      id: 3,
      title: "Pengembangan Model Prediksi Mutu Kopi Berbasis Citra Digital",
      jenis: "Penelitian",
      periode: "2024/2025",
      tag: "Pertanian",
      contributors: ["Grace Levina Dewi, S.Kom., M.Kom.", "Dr. Ir. Hartarto Junaedi, S.Kom., M.Kom., IPM., ASEAN Eng."],
      danaDiajukan: 50000000,
      danaDisetujui: 45000000,
      perluLaporan: true,
      lampiranKetua: "/sk_mutu_kopi.pdf",
      date: new Date("2025-09-01"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_kopi.pdf",
    },
    {
      id: 4,
      title: "Sosialisasi Bahaya Stunting dan Gizi Seimbang di Desa Binaan",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Kesehatan",
      contributors: ["Grace Levina Dewi, S.Kom., M.Kom."],
      danaDiajukan: 10000000,
      danaDisetujui: 9500000,
      perluLaporan: true,
      lampiranKetua: "/sk_sosialisasi_gizi.pdf",
      date: new Date("2025-09-05"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_stunting.pdf",
    },
    {
      id: 5,
      title: "Analisis Sentimen Media Sosial Terhadap Kebijakan Publik",
      jenis: "Penelitian",
      periode: "2024/2025",
      tag: "Data Science",
      contributors: ["Dr. Ir. Hartarto Junaedi, S.Kom., M.Kom., IPM., ASEAN Eng."],
      danaDiajukan: 35000000,
      danaDisetujui: 35000000,
      perluLaporan: true,
      lampiranKetua: "/sk_sentimen_media.pdf",
      date: new Date("2025-09-10"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_sentimen.pdf",
    },
  ]);

  // contoh data laporan
  const [laporans, setLaporans] = useState([
    // 5 Laporan pertama (masing-masing 1 proposal)
    {
      id: 1,
      lampiran: "/laporan-air-v1.pdf",
      pesan: "Laporan kemajuan tahap 1 telah diajukan. Menunggu review dari tim monev.",
      proposalId: 1, // Referensi ke Proposal 1 (Sistem Monitoring Air)
      status: "Menunggu", // Kondisi 1/2: Menunggu
      tanggal: new Date("2025-10-01"),
    },
    {
      id: 2,
      lampiran: "/laporan-keuangan-akhir.pdf",
      pesan: "Laporan akhir dan SPJ sudah lengkap dan disetujui tanpa revisi.",
      proposalId: 2, // Referensi ke Proposal 2 (Literasi Keuangan)
      status: "Disetujui", // Kondisi 1/1: Disetujui
      tanggal: new Date("2025-10-05"),
    },
    {
      id: 3,
      lampiran: "/laporan-mutukopi-v1.pdf",
      pesan: "Data yang digunakan tidak sesuai dengan metodologi di proposal. Mohon direvisi total.",
      proposalId: 3, // Referensi ke Proposal 3 (Mutu Kopi)
      status: "Ditolak", // Kondisi 1/2: Ditolak
      tanggal: new Date("2025-10-07"),
    },
    {
      id: 4,
      lampiran: "/laporan-gizi-v1.pdf",
      pesan: "Laporan kemajuan pengabdian telah disubmit. Menunggu verifikasi dokumen.",
      proposalId: 4, // Referensi ke Proposal 4 (Sosialisasi Gizi)
      status: "Menunggu", // Kondisi 2/2: Menunggu
      tanggal: new Date("2025-10-08"),
    },
    {
      id: 5,
      lampiran: "/laporan-sentimen-v1.pdf",
      pesan: "Hasil uji coba sistem sentimen tidak valid. Perlu perbaikan pada bab 4 dan 5.",
      proposalId: 5, // Referensi ke Proposal 5 (Analisis Sentimen)
      status: "Ditolak", // Kondisi 2/2: Ditolak
      tanggal: new Date("2025-10-09"),
    },

    // 3 Laporan sisanya (Disetujui semua, merujuk ke proposal yang sudah ada)
    {
      id: 6,
      lampiran: "/laporan-air-v2-revisi.pdf",
      pesan: "Revisi laporan kemajuan telah disetujui. Silakan lanjutkan ke tahap berikutnya.",
      proposalId: 1, // Laporan ke-2 untuk Proposal 1
      status: "Disetujui", // Kondisi 2/3: Disetujui
      tanggal: new Date("2025-10-10"),
    },
    {
      id: 7,
      lampiran: "/laporan-mutukopi-v2.pdf",
      pesan: "Revisi proposal disetujui, sesuai dengan target luaran.",
      proposalId: 3, // Laporan ke-2 untuk Proposal 3
      status: "Disetujui", // Kondisi 3/3: Disetujui
      tanggal: new Date("2025-10-12"),
    },
    {
      id: 8,
      lampiran: "/laporan-gizi-v2.pdf",
      pesan: "Verifikasi dokumen pengabdian disetujui. Laporan akhir diterima.",
      proposalId: 4, // Laporan ke-2 untuk Proposal 4
      status: "Disetujui", // Kondisi 4/3: Disetujui (total 4 Disetujui)
      tanggal: new Date("2025-10-13"),
    },
  ]);

  // fungsi untuk simpan laporan baru
  const handleUploadLaporan = (proposalId, file) => {
    const newLaporan = {
      id: laporans.length + 1,
      lampiran: URL.createObjectURL(file),
      pesan: "-",
      proposalId,
      status: "Menunggu",
      tanggal: new Date(),
    };
    setLaporans([...laporans, newLaporan]);
    alert("Laporan berhasil diupload!");
  };

  const handleTanggapan = (status, pesan, lampiran) => {
    if (!selectedLaporan) return;
    const updated = laporans.map((lap) =>
      lap.id === selectedLaporan.id
        ? { ...lap, status, pesan, lampiran: lampiran ? URL.createObjectURL(lampiran) : lap.lampiran }
        : lap
    );
    setLaporans(updated);
    alert(`Laporan ${status.toLowerCase()}`);
    setSelectedLaporan(null);
  };

  // filter laporan dosen
  const laporanDosen = laporans.filter((l) =>
    proposals.some(
      (p) =>
        p.id === l.proposalId &&
        p.contributors.includes("Dr. Dosen A") // ganti sesuai user login
    )
  );

  // filter proposal yang perlu laporan tapi belum upload atau ditolak
  const perluLaporan = proposals.filter((p) => {
    if (!p.perluLaporan) return false;
    const laporan = laporans.find((l) => l.proposalId === p.id);
    return !laporan || laporan.status === "Ditolak";
  });

  const getProposalById = (id) => proposals.find((p) => p.id === id);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Laporan Penelitian & Pengabdian</h1>
      <p className="text-sm text-base-content/70 mb-4">
        Kelola laporan hasil penelitian atau pengabdian berdasarkan proposal.
      </p>

      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed">
        {userRole === "ketua" && (
          <button
            className={`tab ${activeTab === "semua" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("semua")}
          >
            Semua Laporan
          </button>
        )}
        <button
          className={`tab ${activeTab === "upload" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          Upload Laporan
        </button>
        <button
          className={`tab ${activeTab === "riwayat" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("riwayat")}
        >
          Riwayat Laporan
        </button>
      </div>

      {/* Tab: Semua laporan (Ketua) */}
      {userRole === "ketua" && activeTab === "semua" && (
        <div className="grid gap-3 mt-4">
          {laporans
            .sort((a, b) => (a.status === "Menunggu" ? -1 : 1))
            .map((lap) => {
              const proposal = proposals.find((p) => p.id === lap.proposalId);
              return (
                <LaporanCard laporan={lap} proposal={proposal} key={lap.id} onClick={() => setSelectedLaporan(lap)} />
              );
            })}
        </div>
      )}

      {/* Tab: Upload laporan (Dosen + Ketua) */}
      {activeTab === "upload" && (
        <div className="grid gap-3 mt-4">
          {perluLaporan.length > 0 && <p className="text-sm text-base-content/70">Berikut merupakan proposal yang perlu laporan dan belum diupload:</p>}
          {perluLaporan.length === 0 && (
            <p className="text-sm text-base-content/70">Tidak ada laporan yang perlu diupload.</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perluLaporan.map((p) => (
              <ProposalCard
                key={p.id}
                proposal={p}
                page={"laporan"}
                onClick={() => setSelectedProposal(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab: Riwayat laporan (semua role) */}
      {activeTab === "riwayat" && (
        <div className="grid gap-3 mt-4">
          {laporanDosen.length === 0 && (
            <p className="text-sm text-base-content/70">Belum ada laporan yang diupload.</p>
          )}
          {laporanDosen.map((lap) => {
            const proposal = proposals.find((p) => p.id === lap.proposalId);
            return (
              <LaporanCard laporan={lap} proposal={proposal} key={lap.id} onClick={() => setSelectedLaporan(lap)} />
            );
          })}
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
              {dayjs(selectedLaporan.tanggal).format("DD MMM YYYY")}
            </p>
            <p className="text-sm text-black mb-3">
              <span className="font-semibold">Status Laporan: </span>
              <span
                className={`badge ${selectedLaporan.status === "Menunggu"
                  ? "badge-warning"
                  : selectedLaporan.status === "Ditolak"
                    ? "badge-error"
                    : "badge-success"
                  }`}
              >
                {selectedLaporan.status}
              </span>
            </p>

            <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lihat Detail Proposal</div>
              <div className="collapse-content text-sm">
                <ProposalDetailContent proposal={getProposalById(selectedLaporan.proposalId)} />
              </div>
            </div>

            <a
              href={selectedLaporan.lampiran}
              target="_blank"
              className="btn btn-sm btn-outline gap-2 my-3"
            >
              <PaperClipIcon className="w-4 h-4" />
              Lihat Laporan Proposal
            </a>

            {userRole === "ketua" && selectedLaporan.status === "Menunggu" && <div>
              <textarea
                placeholder="Tambahkan pesan untuk dosen..."
                className="textarea textarea-bordered w-full mb-3"
                onChange={(e) => (selectedLaporan.pesan = e.target.value)}
              ></textarea>

              <input
                type="file"
                accept="application/pdf"
                className="file-input file-input-bordered w-full mb-4"
                onChange={(e) => (selectedLaporan.lampiran = e.target.files[0])}
              />

              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleTanggapan("Ditolak", selectedLaporan.pesan, selectedLaporan.lampiran)}
                >
                  <XMarkIcon className="w-4 h-4" />
                  Tolak
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleTanggapan("Disetujui", selectedLaporan.pesan, selectedLaporan.lampiran)}
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
        onClose={() => setSelectedProposal(null)}
        proposal={selectedProposal}
        userRole={userRole}
      />
    </div>
  );
}

export default LaporanPage;
