import React, { useEffect, useState } from "react";
import { TrashIcon, PlusIcon, GlobeAltIcon, EnvelopeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import apiService from "../../utils/services/apiService";
import { useToast } from "../../context/ToastContext";

function SettingPage() {
  // contoh data awal
  const {addToast} = useToast()
  const [mailingList, setMailingList] = useState([
    "lppm@universitas.ac.id",
    "penelitian@universitas.ac.id",
  ]);
  const [crawlUrls, setCrawlUrls] = useState([
    "https://lppm.universitas.ac.id/berita",
    "https://lppm.universitas.ac.id/pengumuman",
  ]);
  const [newMail, setNewMail] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const fetchMailingList = async () => {
    try {
      const response = await apiService.get("/milis");
      setMailingList(response.data);
    } catch (error) {

    }
  }

  const handleAddMail = async () => {
    try {
      if(newMail === "") {
        addToast("Email tidak boleh kosong", "error")
        return
      }
      const response = await apiService.post(`/milis/`, { nama: newMail })
      addToast("Email berhasil ditambahkan", "success")
      fetchMailingList()
    } catch (error) {
      addToast("Gagal menambahkan email", "error")
    }
  };

  const handleDeleteMail = async (idemail) => {
    try {
      const response = await apiService.delete(`/milis/${idemail}`)
      addToast("Email berhasil dihapus", "success")
      fetchMailingList()
    } catch (error) {
      addToast("Gagal menghapus email", "error")
    }
  };

  useEffect(() => {
    fetchMailingList()
  }, [])

  const handleUpdateData = async () => {
    await apiService.post(`scrapping/scheduler/run`)
    addToast("Data LPPM Publik berhasil diperbarui", "success")
  };

  return (
    <div className="min-h-screen p-8 bg-base-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Setting Sistem LPPM</h1>
            <p className="mt-2 text-sm text-base-content/70">
              Kelola konfigurasi sistem LPPM dan sumber data publik.
            </p>
          </div>
        </div>

        {/* Mailing List Section */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <EnvelopeIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold">Mailing List</h2>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Masukkan email baru"
                className="input input-bordered w-full"
                value={newMail}
                onChange={(e) => setNewMail(e.target.value)}
              />
              <button onClick={handleAddMail} className="btn btn-primary">
                <PlusIcon className="w-5 h-5" />
                Tambah
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {mailingList.map((mail, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-base-100 rounded-lg p-3 shadow-sm"
                >
                  <span className="truncate text-sm">{mail.nama}</span>
                  <button
                    onClick={() => handleDeleteMail(mail.id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tombol Update Data Publik */}
        <div className="text-center mt-10">
          <button
            onClick={handleUpdateData}
            className="btn btn-accent btn-lg gap-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Perbarui Data LPPM Publik
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
