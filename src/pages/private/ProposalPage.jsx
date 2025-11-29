import React, { useState, useEffect, useMemo } from "react";
import apiService from "./../../utils/services/apiService"; // Sesuaikan path
import { useToast } from "../../context/ToastContext"; // Sesuaikan path
import ProposalCard from "../../components/proposal/ProposalCard";
import ProposalFilterBar from "../../components/proposal/ProposalFilterBar";
import ProposalUploadModal from "../../components/proposal/ProposalUploadModal";
import ProposalDetailModal from "../../components/proposal/ProposalDetailModal";
import LocalStorageService from "../../utils/services/LocalStorageService";

function ProposalPage() {
  // --- State Utama ---
  const [proposals, setProposals] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "", periode: "", tag: "" });
  const [activeTab, setActiveTab] = useState("mine"); // Default tab untuk Ka LPPM
  
  // --- State UI & Modal ---
  const [isLoading, setIsLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  // --- Hook & Data Pengguna ---
  const { addToast } = useToast();
  const user = LocalStorageService.getItem("app_user"); // Mendapatkan data user dari localStorage

  // Fungsi untuk mengambil data dari backend
  const fetchProposals = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get("/proposal");
      setProposals(response.data);
      console.log(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal memuat data proposal.";
      addToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProposals();
  }, []); // Dependency array kosong agar hanya berjalan sekali

  // Memoized filtering untuk performa
  const filteredProposals = useMemo(() => {
    let data = proposals;

    // Filter berdasarkan tab untuk Ka LPPM
    if (String(user.role) === '2') {
      if (activeTab === 'mine') {
        data = data.filter(p => 
          p.kontributor.some(k => k.id === user.id && k.status_kontributor === 'Leader')
        );
      }
      // Jika tab 'others', tidak perlu filter, tampilkan semua
    }

    // TODO: Implementasi filter dari ProposalFilterBar di sini
    // if (filters.search) { ... }
    // if (filters.status) { ... }

    return data;
  }, [proposals, activeTab, user.id, user.role, filters]);

  // Handler setelah proposal berhasil ditambahkan
  const handleAddProposal = () => {
    setShowUpload(false);
    fetchProposals(); // Ambil ulang data untuk menampilkan proposal baru
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold">Daftar Proposal</h1>
        <button className="btn btn-primary" onClick={() => setShowUpload(true)}>
          Upload Proposal Baru
        </button>
      </div>

      {/* Tabs hanya untuk Ka LPPM (role '2') */}
      {String(user.role) === '2' && (
        <div role="tablist" className="tabs tabs-boxed w-fit bg-base-200">
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
        <div className="text-center bg-base-100 rounded-lg p-10">
          <p className="text-base-content/60">
            {activeTab === 'mine' && String(user.role) === '2' 
              ? "Anda belum mengajukan proposal sebagai ketua." 
              : "Tidak ada proposal yang ditemukan."
            }
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        userRole={user.role}
      />
    </div>
  );
}

export default ProposalPage;