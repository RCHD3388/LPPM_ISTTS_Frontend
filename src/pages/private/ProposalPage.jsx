// pages/ProposalPage.jsx
import React, { useState } from "react";
import ProposalCard from "../../components/proposal/ProposalCard";
import ProposalFilterBar from "../../components/proposal/ProposalFilterBar";
import ProposalUploadModal from "../../components/proposal/ProposalUploadModal";
import ProposalDetailModal from "../../components/proposal/ProposalDetailModal";

function ProposalPage({ userRole = "ketua", userName = "Hendrawan Armanto, S.Kom., M.Kom." }) {
  const [proposals, setProposals] = useState([
    // Data Sebelumnya (2 - 9)
    // 1. Proposal oleh Hendrawan Armanto (Menunggu)
    {
      id: 2,
      title: "Implementasi Sistem Informasi Geografis (SIG) untuk Pemetaan Potensi Bencana",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Teknologi",
      contributors: ["Hendrawan Armanto, S.Kom., M.Kom.", "Grace Levina Dewi, S.Kom., M.Kom."],
      danaDiajukan: 35000000,
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      date: new Date(2025, 9, 10), // Oktober
      status: "Menunggu",
      fileUrl: "/proposal_sig_bencana.pdf",
    },
    // 2. Proposal oleh Prof. Gunawan (Disetujui)
    {
      id: 3,
      title: "Pengembangan Model Ekowisata Berbasis Komunitas di Pesisir Utara",
      jenis: "Pengabdian",
      periode: "2024/2025",
      tag: "Lingkungan",
      contributors: ["Prof. Dr. Ir. Gunawan, M.Kom.", "Dr. Ir. Herman Budianto, M.M."],
      danaDiajukan: 45000000,
      danaDisetujui: 38000000,
      perluLaporan: true,
      lampiranKetua: "/sk_ekowisata_pesisir.pdf",
      date: new Date(2025, 8, 25), // September
      status: "Disetujui",
      fileUrl: "/proposal_ekowisata.pdf",
    },
    // 3. Proposal oleh Hendrawan Armanto (Disetujui, Selesai)
    {
      id: 4,
      title: "Kajian Perbandingan Kinerja Algoritma Klasifikasi Data Besar",
      jenis: "Penelitian",
      periode: "2024/2025",
      tag: "Data Science",
      contributors: ["Hendrawan Armanto, S.Kom., M.Kom."],
      danaDiajukan: 20000000,
      danaDisetujui: 20000000,
      perluLaporan: false,
      lampiranKetua: "/sk_riset_klasifikasi_data.pdf",
      date: new Date(2024, 10, 1), // November
      status: "Disetujui",
      fileUrl: "/proposal_klasifikasi.pdf",
    },
    // 4. Proposal oleh Dr. Hartarto (Ditolak)
    {
      id: 5,
      title: "Pemanfaatan Blockchain untuk Sistem Pelacakan Logistik Pangan",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Blockchain",
      contributors: ["Dr. Ir. Hartarto Junaedi, S.Kom., M.Kom., IPM., ASEAN Eng."],
      danaDiajukan: 65000000,
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      date: new Date(2025, 9, 11), // Oktober
      status: "Ditolak",
      fileUrl: "/proposal_blockchain.pdf",
    },
    // 5. Proposal oleh Hendrawan Armanto (Disetujui)
    {
      id: 6,
      title: "Pelatihan Pengembangan Web E-Commerce untuk Kelompok Pemuda Karang Taruna",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Ekonomi Kreatif",
      contributors: ["Hendrawan Armanto, S.Kom., M.Kom.", "Hari Purwo Susilo, S.Pd.K."],
      danaDiajukan: 18000000,
      danaDisetujui: 15000000,
      perluLaporan: true,
      lampiranKetua: "/sk_ecommerce_karangtaruna.pdf",
      date: new Date(2025, 9, 15), // Oktober
      status: "Disetujui",
      fileUrl: "/proposal_karangtaruna.pdf",
    },
    // 6. Proposal oleh Grace Levina (Menunggu)
    {
      id: 7,
      title: "Studi Penerapan *Gamification* dalam Pembelajaran Mata Kuliah Dasar Pemrograman",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Pendidikan",
      contributors: ["Grace Levina Dewi, S.Kom., M.Kom.", "Dr. Ir. Hartarto Junaedi, S.Kom., M.Kom., IPM., ASEAN Eng."],
      danaDiajukan: 28000000,
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      date: new Date(2025, 9, 12), // Oktober
      status: "Menunggu",
      fileUrl: "/proposal_gamifikasi.pdf",
    },
    // 7. Proposal oleh Hendrawan Armanto (Disetujui)
    {
      id: 8,
      title: "Pemberdayaan Guru Sekolah Menengah dalam Literasi Digital dan Keamanan Siber",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Pendidikan",
      contributors: ["Hendrawan Armanto, S.Kom., M.Kom.", "Hari Purwo Susilo, S.Pd.K."],
      danaDiajukan: 12500000,
      danaDisetujui: 12500000,
      perluLaporan: true,
      lampiranKetua: "/sk_literasi_digital_guru.pdf",
      date: new Date(2025, 9, 8), // Oktober
      status: "Disetujui",
      fileUrl: "/proposal_keamanan_siber.pdf",
    },
    // 8. Proposal oleh Dr. Herman Budianto (Ditolak)
    {
      id: 9,
      title: "Analisis Kelayakan Finansial Pembangunan Infrastruktur Hijau di Kawasan Industri",
      jenis: "Penelitian",
      periode: "2024/2025",
      tag: "Bisnis",
      contributors: ["Dr. Ir. Herman Budianto, M.M.", "Prof. Dr. Ir. Gunawan, M.Kom."],
      danaDiajukan: 75000000,
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      date: new Date(2025, 8, 1), // September
      status: "Ditolak",
      fileUrl: "/proposal_infrastruktur_hijau.pdf",
    },
    // Data Baru Tambahan (10 - 15)

    // 9. Proposal oleh Hari Purwo Susilo (Menunggu)
    {
      id: 10,
      title: "Pemanfaatan Media Sosial untuk Kampanye Anti-Narkoba pada Remaja",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Pengabdian Masyarakat",
      contributors: ["Hari Purwo Susilo, S.Pd.K.", "Grace Levina Dewi, S.Kom., M.Kom."],
      danaDiajukan: 10000000,
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      date: new Date(2025, 9, 16), // Oktober
      status: "Menunggu",
      fileUrl: "/proposal_anti_narkoba.pdf",
    },
    // 10. Proposal oleh Dr. Hartarto (Disetujui)
    {
      id: 11,
      title: "Rancangan Arsitektur Sistem Informasi Akademik Terdistribusi",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Teknologi",
      contributors: ["Dr. Ir. Hartarto Junaedi, S.Kom., M.Kom., IPM., ASEAN Eng."],
      danaDiajukan: 55000000,
      danaDisetujui: 50000000,
      perluLaporan: true,
      lampiranKetua: "/sk_riset_arsitektur_si.pdf",
      date: new Date(2025, 9, 5), // Oktober
      status: "Disetujui",
      fileUrl: "/proposal_arsitektur_si.pdf",
    },
    // 11. Proposal oleh Prof. Gunawan (Disetujui, Selesai)
    {
      id: 12,
      title: "Studi Komprehensif Tata Kelola Perguruan Tinggi Berbasis Kualitas",
      jenis: "Penelitian",
      periode: "2023/2024",
      tag: "Manajemen",
      contributors: ["Prof. Dr. Ir. Gunawan, M.Kom."],
      danaDiajukan: 30000000,
      danaDisetujui: 30000000,
      perluLaporan: false,
      lampiranKetua: "/sk_selesai_tatakelola.pdf",
      date: new Date(2024, 5, 20), // Mei
      status: "Disetujui",
      fileUrl: "/proposal_tatakelola.pdf",
    },
    // 12. Proposal oleh Dr. Herman Budianto (Disetujui)
    {
      id: 13,
      title: "Analisis Dampak Pinjaman Online Ilegal terhadap Kesejahteraan Masyarakat",
      jenis: "Pengabdian",
      periode: "2025/2026",
      tag: "Bisnis",
      contributors: ["Dr. Ir. Herman Budianto, M.M."],
      danaDiajukan: 17000000,
      danaDisetujui: 17000000,
      perluLaporan: true,
      lampiranKetua: "/sk_pinjol_ilegal.pdf",
      date: new Date(2025, 9, 10), // Oktober
      status: "Disetujui",
      fileUrl: "/proposal_pinjol.pdf",
    },
    // 13. Proposal oleh Grace Levina (Menunggu)
    {
      id: 14,
      title: "Riset Tren Keamanan Data dalam Lingkungan Cloud Computing di Indonesia",
      jenis: "Penelitian",
      periode: "2025/2026",
      tag: "Teknologi",
      contributors: ["Grace Levina Dewi, S.Kom., M.Kom."],
      danaDiajukan: 40000000,
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      date: new Date(2025, 9, 17), // Oktober
      status: "Menunggu",
      fileUrl: "/proposal_keamanan_cloud.pdf",
    },
    // 14. Proposal oleh Hari Purwo Susilo (Ditolak)
    {
      id: 15,
      title: "Penyusunan Modul Pelatihan Soft Skills untuk Lulusan SMA",
      jenis: "Pengabdian",
      periode: "2024/2025",
      tag: "Pendidikan",
      contributors: ["Hari Purwo Susilo, S.Pd.K."],
      danaDiajukan: 9000000,
      danaDisetujui: 0,
      perluLaporan: false,
      lampiranKetua: null,
      date: new Date(2025, 7, 1), // Agustus
      status: "Ditolak",
      fileUrl: "/proposal_soft_skills.pdf",
    },
  ]);

  const [filters, setFilters] = useState({ search: "", status: "", periode: "", tag: "" });
  const [activeTab, setActiveTab] = useState("mine");
  const [showUpload, setShowUpload] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const filteredProposals = proposals
    .filter((p) => {
      if (userRole === "dosen" && !p.contributors.includes(userName)) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.periode && p.periode !== filters.periode) return false;
      if (filters.tag && p.tag !== filters.tag) return false;
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (userRole === "ketua" && activeTab === "mine" && !p.contributors.includes(userName)) return false;
      if (userRole === "ketua" && activeTab === "others" && p.contributors.includes(userName)) return false;
      return true;
    })
    .sort((a, b) => (a.status === "Menunggu" ? -1 : 1)); // Prioritaskan yg belum direspon

  const handleAddProposal = (newProposal) => {
    setProposals((prev) => [...prev, newProposal]);
    setShowUpload(false);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Daftar Proposal</h1>
        <button className="btn btn-primary" onClick={() => setShowUpload(true)}>
          Upload Proposal Baru
        </button>
      </div>

      {/* Tabs hanya untuk Ketua LPPM */}
      {userRole === "ketua" && (
        <div role="tablist" className="tabs tabs-boxed w-fit">
          <a
            role="tab"
            className={`tab ${activeTab === "mine" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("mine")}
          >
            Proposal Saya
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "others" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("others")}
          >
            Proposal Seluruh Dosen
          </a>
        </div>
      )}

      <ProposalFilterBar filters={filters} setFilters={setFilters} />

      {filteredProposals.length === 0 ? (
        <div className="text-center text-base-content/60 py-10">
          Tidak ada proposal ditemukan.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onClick={() => setSelectedProposal(proposal)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <ProposalUploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onSuccess={handleAddProposal}
      />
      <ProposalDetailModal
        open={!!selectedProposal}
        onClose={() => setSelectedProposal(null)}
        proposal={selectedProposal}
        userRole={userRole}
      />
    </div>
  );
}

export default ProposalPage;
