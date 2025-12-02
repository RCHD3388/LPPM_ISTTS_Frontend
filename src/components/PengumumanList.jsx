import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import apiService from '../utils/services/apiService';
import { fileApi } from '../utils/services/fileApi';
import PublicPengumumanDetailModal from './PublicPengumumanDetailModal';

// URL base dari backend untuk membangun link unduhan file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PengumumanList() {
  const [announcements, setAnnouncements] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // State baru untuk modal
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Ambil data pengumuman dan file penting secara paralel
        const [announcementsResponse, filesResponse] = await Promise.all([
          apiService.get('/pengumuman'), // Asumsi endpoint untuk pengumuman
          apiService.get('/filepenting') // Asumsi endpoint untuk file penting
        ]);

        setAnnouncements(announcementsResponse.data);
        setFiles(filesResponse.data);

        console.log(announcementsResponse.data);

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Gagal memuat data dari server.";
        addToast(errorMessage, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [addToast]);

  // Tampilan saat data sedang dimuat
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const accessOnClick = async (file) => {
    console.log(file)
    if (file.jenis_lampiran === "link") {
      window.open(file.value, '_blank', 'noopener,noreferrer');
    } else if (file.jenis_lampiran === "file") {
      try {
        // ✅ Pakai fileApi, BUKAN apiService
        const response = await fileApi.get(`/download`, {
          params: { id: file.value },
          responseType: 'blob'
        });

        const url = window.URL.createObjectURL(response.data);
        window.open(url, '_blank', 'noopener,noreferrer');

      } catch (error) {
        console.error("Error downloading file:", error);
        alert("Gagal mengakses file. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="content flex flex-col lg:flex-row lg:items-start gap-6 mt-6">
      {/* Kolom kiri: Pengumuman */}
      <div className="w-full lg:w-[75%]">
        <div className="text-4xl text-center text-primary font-bold mb-6">
          📢 Pengumuman Terbaru
        </div>

        {announcements.length > 0 ? (
          <div className="grid gap-4 overflow-y-auto max-h-[40vh] pr-2">
            {announcements.map((item) => (
              <div
                key={item.id}
                onClick={() => { setSelectedAnnouncement(item) }}
                className="card bg-base-100 shadow-md hover:shadow-lg transition p-6"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.judul}
                </h3>
                <p className="text-base-content mb-3 leading-relaxed">{item.isi}</p>

                <div className="flex items-center justify-between text-sm text-base-content/70">
                  {/* Asumsi backend mengembalikan jumlah lampiran */}
                  <span>📎 Lampiran: {item.jumlah_lampiran || 0}</span>
                  {/* Asumsi backend mengembalikan objek tag */}
                  <span className="badge badge-outline badge-primary">
                    Tag: {item.tag || 'Umum'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-base-content/60 py-10">
            Belum ada pengumuman.
          </div>
        )}
      </div>

      {/* Kolom kanan: File penting */}
      <div className="w-full lg:w-[25%] flex flex-col bg-primary/10 p-6 rounded-lg shadow-md me-2 h-fit max-h-[50vh]">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">
          📂 File Penting
        </h2>
        {files.length > 0 ? (
          <ul className="flex flex-col gap-3 overflow-y-auto">
            {files.map((file) => (
              <li
                key={file.id}
                className="card bg-base-100 shadow-sm p-3 flex justify-between items-center hover:shadow-md transition"
              >
                {/* Asumsi backend mengembalikan `name_lampiran` */}
                <span className="truncate text-sm font-medium mr-2">{file.judul}</span>
                <div
                  // Bangun URL lengkap untuk file
                  onClick={() => { accessOnClick(file) }}
                  className="btn btn-xs btn-outline btn-primary flex-shrink-0"
                >
                  Unduh / Akses
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-sm text-base-content/60 py-5">
            Belum ada file penting.
          </div>
        )}
      </div>

      <PublicPengumumanDetailModal
        open={!!selectedAnnouncement}
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}