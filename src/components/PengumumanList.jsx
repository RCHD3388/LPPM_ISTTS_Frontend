import { useState, useEffect } from "react";

// Dummy data pengumuman
const dummyAnnouncements = [
  {
    id: 1,
    judul: "Pengumuman Ujian Akhir Semester Ganjil 2025",
    isi: "Pelaksanaan UAS Ganjil akan dimulai pada tanggal 6 Januari 2025. Mohon semua mahasiswa memperhatikan jadwal masing-masing.",
    jumlah_lampiran: 2,
    tag_id: 1,
  },
  {
    id: 2,
    judul: "Pendaftaran Wisuda Periode April 2025",
    isi: "Pendaftaran wisuda telah dibuka hingga 15 Februari 2025. Segera lengkapi dokumen dan bayar biaya administrasi.",
    jumlah_lampiran: 1,
    tag_id: 2,
  },
  {
    id: 3,
    judul: "Perubahan Jadwal Kuliah Semester Genap 2025",
    isi: "Beberapa jadwal mata kuliah mengalami perubahan. Silakan periksa kembali jadwal di sistem akademik ISTTS.",
    jumlah_lampiran: 0,
    tag_id: 3,
  },
];

// Dummy file penting
const dummyFiles = [
  { name: "Panduan Skripsi 2025.pdf", url: "#" },
  { name: "Kalender Akademik 2025.pdf", url: "#" },
  { name: "Template Proposal TA.docx", url: "#" },
];

export default function PengumumanList() {
  const [announcements, setAnnouncements] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // simulasi fetch data dari API
    setAnnouncements(dummyAnnouncements);
    setFiles(dummyFiles);
  }, []);

  return (
    <div className="content flex flex-col lg:flex-row lg:items-start gap-6 mt-6 ">
      {/* Kolom kiri: Pengumuman */}
      <div className="w-full lg:w-[75%]">
        <div className="text-4xl text-center text-primary font-bold mb-6">
          📢 Pengumuman Terbaru
        </div>

        <div className="grid gap-4 overflow-y-auto max-h-[40vh]">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition p-6"
            >
              <h3 className="text-xl font-bold text-primary mb-2">
                {item.judul}
              </h3>
              <p className="text-base-content mb-3 leading-relaxed">{item.isi}</p>

              <div className="flex items-center justify-between text-sm text-base-content/70">
                <span>📎 Lampiran: {item.jumlah_lampiran}</span>
                <span className="badge badge-outline badge-primary">
                  Tag #{item.tag_id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kolom kanan: File penting */}
      <div className="w-full lg:w-[25%] flex flex-col bg-primary/10 p-6 rounded-lg shadow-md me-2 h-[50vh]">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">
          📂 File Penting
        </h2>
        <div className="flex flex-col gap-3 overflow-y-auto">
          {files.map((file, idx) => (
            <li
              key={idx}
              className="card bg-base-100 shadow-sm p-3 flex justify-between items-center hover:shadow-md transition"
            >
              <span className="truncate text-sm font-medium">{file.name}</span>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-xs btn-outline btn-primary"
              >
                Unduh
              </a>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
