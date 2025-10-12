import React, { useState } from "react";
import LaporanList from "../../components/laporan/LaporanList";
import LaporanDetailModal from "../../components/laporan/LaporanDetailModal";
import LaporanUploadModal from "../../components/laporan/LaporanUploadModal";

function LaporanPage({ userRole = "ketua" }) {
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Contoh data proposal
  // 📁 dataProposalLaporan.js

  const proposals = [
    {
      id: 1,
      title: "Riset AI untuk Pembelajaran Adaptif",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Teknologi",
      contributors: ["Dr. Dosen A", "Dr. Dosen B"],
      danaDiajukan: 25000000,
      danaDisetujui: 20000000,
      perluLaporan: true,
      lampiranKetua: "/lampiran_ketua_ai.pdf",
      date: new Date("2025-05-10"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_ai.pdf",
    },
    {
      id: 2,
      title: "Penerapan IoT untuk Efisiensi Energi Rumah Pintar",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Inovasi",
      contributors: ["Dr. Dosen A", "Dr. Dosen C"],
      danaDiajukan: 18000000,
      danaDisetujui: 15000000,
      perluLaporan: true,
      lampiranKetua: "/lampiran_ketua_iot.pdf",
      date: new Date("2025-05-20"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_iot.pdf",
    },
    {
      id: 3,
      title: "Pelatihan Literasi Digital untuk UMKM",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Sosial",
      contributors: ["Dr. Dosen D", "Dr. Dosen E"],
      danaDiajukan: 10000000,
      danaDisetujui: 0,
      perluLaporan: true,
      lampiranKetua: null,
      date: new Date("2025-06-01"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_umkm.pdf",
    },
    {
      id: 4,
      title: "Analisis Kestabilan Struktur Jembatan Beton",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Teknik Sipil",
      contributors: ["Dr. Dosen F"],
      danaDiajukan: 30000000,
      danaDisetujui: 0,
      perluLaporan: true,
      lampiranKetua: null,
      date: new Date("2025-06-15"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_jembatan.pdf",
    },
    {
      id: 5,
      title: "Pengembangan Modul Pembelajaran Interaktif Matematika",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Pendidikan",
      contributors: ["Dr. Dosen G", "Dr. Dosen H"],
      danaDiajukan: 12000000,
      danaDisetujui: 0,
      perluLaporan: true,
      lampiranKetua: null,
      date: new Date("2025-07-01"),
      status: "Disetujui + Laporan",
      fileUrl: "/proposal_math.pdf",
    },
  ];


  // 📘 Contoh data laporan
  const laporanList = [
    // ✅ Proposal 1 → Laporan sudah disetujui
    {
      id: 101,
      status: "Disetujui",
      proposal: proposals[0],
      lampiran: "/laporan_ai.pdf",
      pesan: "Laporan sangat baik, disetujui tanpa revisi.",
    },

    // ❌ Proposal 2 → Laporan ditolak
    {
      id: 102,
      status: "Ditolak",
      proposal: proposals[1],
      lampiran: "/laporan_iot.pdf",
      pesan: "Perlu perbaikan pada bagian analisis data IoT.",
    },

    // 🕓 Proposal 3 → Belum upload laporan (perlu upload)
    // (tidak ada laporan karena belum diupload, jadi hanya informasi dari proposal saja)
    // Bisa ditangani di UI dengan mengecek proposal.perluLaporan === true dan
    // laporanList tidak punya entry dengan proposal.id tersebut

    // ⏳ Proposal 4 → Laporan menunggu review
    {
      id: 103,
      status: "Menunggu Review",
      proposal: proposals[3],
      lampiran: "/laporan_jembatan.pdf",
      pesan: "",
    },

    // ✅ Proposal 5 → Laporan disetujui
    {
      id: 104,
      status: "Disetujui",
      proposal: proposals[4],
      lampiran: "/laporan_math.pdf",
      pesan: "Kegiatan pengabdian berjalan baik dan terdokumentasi lengkap.",
    },
  ];

  // Filter sesuai role
  const laporanUntukDosen = laporanList.filter(
    (l) => l.proposal.contributors.includes("Dr. Dosen A")
  );
  const laporanUntukKetua = laporanList.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Laporan</h1>
          <p className="text-sm text-base-content/70">
            Kelola laporan penelitian dan pengabdian.
          </p>
        </div>
      </div>

      {/* Tab Navigation (Hanya untuk Ketua) */}
      {userRole === "ketua" ? (
        <div role="tablist" className="tabs tabs-bordered mb-4">
          <input
            type="radio"
            name="laporan_tabs"
            role="tab"
            className="tab"
            aria-label="Laporan Dosen Lain"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-4">
            <LaporanList
              userRole={userRole}
              laporanList={laporanUntukKetua}
              onSelectLaporan={setSelectedLaporan}
            />
          </div>

          <input
            type="radio"
            name="laporan_tabs"
            role="tab"
            className="tab"
            aria-label="Laporan Saya"
          />
          <div role="tabpanel" className="tab-content p-4">
            <LaporanList
              userRole="dosen"
              laporanList={laporanUntukDosen}
              onSelectLaporan={setSelectedLaporan}
              onUploadLaporan={(proposal) => {
                setSelectedProposal(proposal);
                setUploadModalOpen(true);
              }}
            />
          </div>
        </div>
      ) : (
        // Untuk Dosen
        <LaporanList
          userRole={userRole}
          laporanList={laporanUntukDosen}
          onSelectLaporan={setSelectedLaporan}
          onUploadLaporan={(proposal) => {
            setSelectedProposal(proposal);
            setUploadModalOpen(true);
          }}
        />
      )}

      {/* Modal Detail */}
      {selectedLaporan && (
        <LaporanDetailModal
          laporan={selectedLaporan}
          onClose={() => setSelectedLaporan(null)}
          userRole={userRole}
        />
      )}

      {/* Modal Upload */}
      {uploadModalOpen && (
        <LaporanUploadModal
          proposal={selectedProposal}
          onClose={() => setUploadModalOpen(false)}
        />
      )}
    </div>
  );
}

export default LaporanPage;
