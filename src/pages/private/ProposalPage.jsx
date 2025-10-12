// pages/ProposalPage.jsx
import React, { useState } from "react";
import ProposalCard from "../../components/proposal/ProposalCard";
import ProposalFilterBar from "../../components/proposal/ProposalFilterBar";
import ProposalUploadModal from "../../components/proposal/ProposalUploadModal";
import ProposalDetailModal from "../../components/proposal/ProposalDetailModal";

function ProposalPage({ userRole = "ketua", userName = "Dr. Dosen A" }) {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Riset AI untuk Pembelajaran Adaptif",
      periode: "2025/2026",
      tag: "Teknologi",
      contributors: ["Dr. Dosen A"],
      date: new Date(),
      status: "Menunggu",
      fileUrl: "/proposal1.pdf",
    },
    {
      id: 2,
      title: "Inovasi Pengajaran Berbasis IoT",
      periode: "2025/2026",
      tag: "Pendidikan",
      contributors: ["Dr. Dosen B", "Dr. Dosen A"],
      date: new Date(),
      status: "Disetujui",
      fileUrl: "/proposal2.pdf",
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
            Proposal Dosen Lain
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
