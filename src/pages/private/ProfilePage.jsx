import React, { useState, useEffect } from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import apiService from './../../utils/services/apiService';
import { useToast } from './../../context/ToastContext';
import LocalStorageService from './../../utils/services/LocalStorageService'; // Impor service baru

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [banks, setBanks] = useState([]); // State baru untuk menyimpan daftar bank
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const fetchData = async () => {
    try {
      // Ambil data user dari localStorage untuk mendapatkan ID
      const userData = LocalStorageService.getItem('app_user');
      if (!userData || !userData.id) { // Cek userData dan ID nya
        throw new Error("Data pengguna tidak ditemukan. Silakan login kembali.");
      }

      // Jalankan pengambilan data profil dan bank secara bersamaan
      const [profileResponse, banksResponse] = await Promise.all([
        apiService.get(`/dosen/profile/${userData.id}`), // Endpoint Anda menjadi /dosen/:id
        apiService.get("/bank")
      ]);

      setProfileData(profileResponse.data);
      setBanks(banksResponse.data);

      // Inisialisasi form dengan data yang ada
      setFormData({
        sinta_id: profileResponse.data.sinta_id || '',
        bank_id: profileResponse.data.bank_id || '', // Ini akan menjadi ID bank
        account_no: profileResponse.data.account_no || '',
        account_name: profileResponse.data.account_name || '',
      });

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal memuat data halaman.";
      addToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [addToast]);

  // ... (handleInputChange dan handleSubmit tidak ada perubahan) ...
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData) return;

    setIsSubmitting(true);
    try {
      const response = await apiService.put(`/dosen/${profileData.id}`, formData);
      setProfileData(response.data);
      addToast("Profil berhasil diperbarui.", "success");
      fetchData()
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal memperbarui profil.";
      addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tampilan Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Tampilan jika data tidak berhasil dimuat
  if (!profileData) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl text-error">Gagal memuat profil.</h2>
        <p>Silakan coba muat ulang halaman atau login kembali.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* --- KARTU PROFIL UTAMA --- */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {/* Ganti dengan pp_url jika ada */}
                <UserCircleIcon className="w-24 h-24 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="card-title text-3xl">{profileData.name}</h1>
              <p className="text-base-content/70">{profileData.email}</p>
              <div className="mt-2 flex gap-2">
                <span className="badge badge-primary badge-outline">{profileData.code}</span>
                <span className="badge badge-secondary badge-outline">
                  {profileData.role_id === '1' ? 'Dosen' : 'Ka LPPM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-xl border-b pb-2 flex items-center gap-2">
              <PencilIcon className="w-6 h-6" />
              Edit Informasi Publikasi & Bank
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* SINTA ID */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text">SINTA ID</span></label>
                <input
                  type="text" name="sinta_id" placeholder="Contoh: 6123456"
                  className="input input-bordered w-full"
                  value={formData.sinta_id} onChange={handleInputChange}
                />
              </div>

              <div></div> {/* Kosong untuk layout */}

              {/* NAMA BANK (DINAMIS) */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text">Nama Bank</span></label>
                <select
                  name="bank_id"
                  className="select select-bordered w-full"
                  value={formData.bank_id}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>-- Pilih Bank --</option>
                  {banks.map(bank => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* NOMOR REKENING */}
              <div className="form-control w-full">
                <label className="label"><span className="label-text">Nomor Rekening</span></label>
                <input
                  type="text" name="account_no" placeholder="Masukkan nomor rekening"
                  className="input input-bordered w-full"
                  value={formData.account_no} onChange={handleInputChange}
                />
              </div>
            </div>

            {/* ATAS NAMA */}
            <div className="form-control w-full mt-2">
              <label className="label"><span className="label-text">Atas Nama (Sesuai Buku Tabungan)</span></label>
              <input
                type="text" name="account_name" placeholder="Masukkan nama pemilik rekening"
                className="input input-bordered w-full"
                value={formData.account_name} onChange={handleInputChange}
              />
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                type="submit" className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;