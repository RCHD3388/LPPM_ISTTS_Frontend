import React, { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import apiService from "../../utils/services/apiService";
import { STATUS_PROPOSAL_LAPORAN_BADGE } from "../../utils/constants/constant"; // Asumsi path ini benar
import LaporanCard from "../../components/laporan/LaporanCard";
import ProposalDetailModal from "../../components/proposal/ProposalDetailModal";
import LocalStorageService from "../../utils/services/LocalStorageService";
import dayjs from "dayjs";
import ProposalDetailContent from "../../components/proposal/ProposalDetailContent";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { onDownloadServerFile } from "../../utils/services/fileApi";

const LaporanRiwayatTabPage = () => {
    const user = LocalStorageService.getItem("app_user");
    const { addToast } = useToast();
    const navigate = useNavigate();

    // State untuk menyimpan daftar laporan dan status loading
    const [laporan, setLaporan] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLaporan, setSelectedLaporan] = useState(null);

    // Fungsi untuk mengambil data riwayat laporan dari backend
    const fetchLaporan = async () => {
        setIsLoading(true);
        try {
            // Panggil endpoint /laporan/history
            const response = await apiService.get("/laporan/history");
            setLaporan(response.data);
        } catch (error) {
            console.error("Error fetching report history:", error);
            const errorMessage = error.response?.data?.message || "Gagal memuat riwayat laporan.";
            addToast(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    // Gunakan useEffect untuk memanggil fetchLaporan saat komponen pertama kali di-load
    useEffect(() => {
        fetchLaporan();
    }, []); // Dependency array kosong memastikan ini hanya berjalan sekali

    // Tampilan saat loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Tampilan utama
    return (
        <div className="mt-4">
            {laporan.length === 0 ? (
                // Tampilan jika tidak ada data
                <div className="text-center bg-base-100 rounded-lg p-10">
                    <p className="text-base-content/60">Belum ada riwayat laporan yang tersedia.</p>
                </div>
            ) : (
                // Tampilan jika ada data (menggunakan tabel)
                <div className="overflow-x-auto grid gap-3 mt-4 py-4">
                    {laporan.map((l) => {
                        return <LaporanCard laporan={l} proposal={l.proposal} onDetail={() => { setSelectedLaporan(l) }} />
                    })}
                </div>
            )}
            {selectedLaporan && (
                <dialog open className="modal">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-2">
                            Detail Laporan Proposal
                        </h3>
                        <p className="text-sm text-base-content/70 mb-1">
                            {dayjs(selectedLaporan.date).format("DD MMM YYYY")}
                        </p>
                        <div className="flex justify-between items-center w-full">

                            <div className="text-sm text-black">
                                <span className="font-semibold">Status Laporan: </span>
                                <span
                                    className={`badge ${STATUS_PROPOSAL_LAPORAN_BADGE[selectedLaporan.status].color}`}
                                >
                                    {STATUS_PROPOSAL_LAPORAN_BADGE[selectedLaporan.status].text}
                                </span>
                            </div>

                            <div
                                onClick={() => { onDownloadServerFile(selectedLaporan.berkas_laporan) }}
                                className="btn btn-sm btn-outline gap-2 mb-3 cursor-pointer"
                            >
                                <PaperClipIcon className="w-4 h-4" />
                                Lihat Laporan Proposal
                            </div>
                        </div>
                        {/* Card Informasi Persetujuan */}
                        <div className="card card-compact bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer 
                                        mb-2 w-full rounded-xl ring-1 ring-gray-200 hover:ring-gray-300 p-4">
                            <div className="flex justify-between items-center w-full">
                                <h3 className="text-md font-semibold mb-3">Informasi Persetujuan</h3>
                                <div
                                    onClick={() => onDownloadServerFile(selectedLaporan.berkas_catatan)}
                                    className="btn btn-sm btn-outline gap-2 cursor-pointer"
                                >
                                    <PaperClipIcon className="w-4 h-4" />
                                    Download Lampiran Ka LPPM
                                </div>
                            </div>

                            <div className="mb-3">
                                <span className="font-medium">Catatan:</span>
                                <p className="text-sm text-gray-700 mt-1">
                                    {selectedLaporan.catatan || "Tidak ada catatan."}
                                </p>
                            </div>


                        </div>


                        <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
                            <input type="checkbox" className="peer" />
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lihat Detail Proposal</div>
                            <div className="collapse-content text-sm">
                                <ProposalDetailContent proposal={selectedLaporan.proposal} />
                            </div>
                        </div>



                        {/* Tombol tutup */}
                        <div className="flex justify-end gap-2 mt-2">
                            <button className="btn btn-outline btn-sm" onClick={() => setSelectedLaporan(null)}>
                                Tutup
                            </button>
                        </div>

                    </div>
                </dialog>
            )}
        </div>
    );
};

export default LaporanRiwayatTabPage;