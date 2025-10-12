import React, { useState } from "react";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function ProfilePage() {
  // 🔹 contoh data awal
  const [profile, setProfile] = useState({
    kodeDosen: "DSN12345",
    namaDosen: "Hendrawan Armanto S.Kom., M.Kom.",
    idSinta: "654321",
    namaBank: "BNI",
    noRek: "1234567890",
    namaRekening: "Hendrawan Armanto",
  });

  const bankList = [
    { id: 1, nama: "BNI" },
    { id: 2, nama: "BRI" },
    { id: 3, nama: "Mandiri" },
    { id: 4, nama: "BCA" },
    { id: 5, nama: "CIMB Niaga" },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile);
  };

  const handleSave = () => {
    if (
      !formData.kodeDosen.trim() ||
      !formData.namaDosen.trim() ||
      !formData.idSinta.trim()
    ) {
      alert("Kode Dosen, Nama Dosen, dan ID SINTA wajib diisi!");
      return;
    }
    setProfile(formData);
    setIsEditing(false);
    alert("Profil berhasil diperbarui!");
  };

  return (
    <div className="min-h-screen p-10 bg-base-100">
      <div className="max-w-4xl mx-auto card bg-base-200 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <UserCircleIcon className="w-14 h-14 text-primary" />
              <div>
                <h1 className="text-3xl font-extrabold text-base-content">
                  Profil Dosen
                </h1>
                <p className="text-base text-base-content/70 mt-1">
                  Kelola dan perbarui data pribadi Anda dengan mudah.
                </p>
              </div>
            </div>

            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="btn btn-success btn-md gap-2"
                >
                  <CheckIcon className="w-5 h-5" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-error btn-md gap-2"
                >
                  <XMarkIcon className="w-5 h-5" />
                  Batal
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="btn btn-primary btn-md gap-2"
              >
                <PencilSquareIcon className="w-5 h-5" />
                Edit Profil
              </button>
            )}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Kode Dosen */}
            <div>
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Kode Dosen
                </span>
              </label>
              <input
                type="text"
                value={formData.kodeDosen}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, kodeDosen: e.target.value })
                }
                className={`input input-bordered w-full text-lg ${
                  !isEditing && "input-disabled"
                }`}
              />
            </div>

            {/* Nama Dosen */}
            <div>
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Nama Dosen
                </span>
              </label>
              <input
                type="text"
                value={formData.namaDosen}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, namaDosen: e.target.value })
                }
                className={`input input-bordered w-full text-lg ${
                  !isEditing && "input-disabled"
                }`}
              />
            </div>

            {/* ID SINTA */}
            <div>
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  ID SINTA
                </span>
              </label>
              <input
                type="text"
                value={formData.idSinta}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, idSinta: e.target.value })
                }
                className={`input input-bordered w-full text-lg ${
                  !isEditing && "input-disabled"
                }`}
              />
            </div>

            {/* Nama Bank */}
            <div>
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Nama Bank
                </span>
              </label>
              <select
                value={formData.namaBank}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, namaBank: e.target.value })
                }
                className={`select select-bordered w-full text-lg ${
                  !isEditing && "select-disabled"
                }`}
              >
                {bankList.map((bank) => (
                  <option key={bank.id} value={bank.nama}>
                    {bank.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* No Rekening */}
            <div>
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Nomor Rekening
                </span>
              </label>
              <input
                type="text"
                value={formData.noRek}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, noRek: e.target.value })
                }
                className={`input input-bordered w-full text-lg ${
                  !isEditing && "input-disabled"
                }`}
              />
            </div>

            {/* Nama Rekening */}
            <div>
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Nama Rekening
                </span>
              </label>
              <input
                type="text"
                value={formData.namaRekening}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, namaRekening: e.target.value })
                }
                className={`input input-bordered w-full text-lg ${
                  !isEditing && "input-disabled"
                }`}
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-base text-center text-base-content/70">
            Terakhir diperbarui:{" "}
            <span className="font-semibold text-base-content">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
