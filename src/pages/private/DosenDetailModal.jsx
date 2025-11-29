import React from 'react';

// Helper component untuk menampilkan baris detail, agar kode utama lebih bersih
// dan otomatis menangani nilai null/kosong.
const DetailItem = ({ label, value, isBadge = false }) => {
  const renderValue = () => {
    if (value) {
      if (isBadge) {
        return value; // Badge akan di-render di luar
      }
      return value;
    }
    return <span className="italic text-base-content/50">Belum diisi</span>;
  };

  return (
    <div className="py-2 grid grid-cols-3 gap-4">
      <p className="text-sm font-medium text-base-content/70 col-span-1">{label}</p>
      <p className="font-semibold text-base-content col-span-2">{renderValue()}</p>
    </div>
  );
};

// Komponen Modal Utama
const DosenDetailModal = ({ currentDosen, onPromote, onDemote }) => {
  // Guard clause untuk mencegah error jika currentDosen belum ada isinya
  if (!currentDosen) {
    return null;
  }

  // Fungsi untuk memetakan role_id menjadi teks yang mudah dibaca
  const getRoleName = (roleId) => {
    if (roleId === '1') return 'Dosen';
    if (roleId === '2') return 'Ka LPPM';
    return 'Role Tidak Dikenal';
  };

  return (
    <dialog id="dosen_detail_modal" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-xl mb-4">Detail Informasi Dosen</h3>

        {/* --- Informasi Utama --- */}
        <DetailItem label="Kode Dosen" value={currentDosen.code} />
        <DetailItem label="Nama Lengkap" value={currentDosen.name} />
        <DetailItem label="Email" value={currentDosen.email} />
        <DetailItem label="SINTA ID" value={currentDosen.sinta_id} />
        <DetailItem label="Role" value={getRoleName(currentDosen.role_id)} />
        
        {/* --- Informasi Status dengan Badge --- */}
        <div className="py-2 grid grid-cols-3 gap-4 items-center">
            <p className="text-sm font-medium text-base-content/70 col-span-1">Status</p>
            <div className="col-span-2">
                {currentDosen.status === 1 ? (
                    <div className="badge badge-success badge-outline font-semibold">Aktif</div>
                ) : (
                    <div className="badge badge-error badge-outline font-semibold">Tidak Aktif</div>
                )}
            </div>
        </div>

        {/* --- Informasi Bank (dipisahkan dengan divider) --- */}
        <div className="divider my-4">Informasi Bank</div>
        <DetailItem label="Nama Bank" value={currentDosen.bank_id} />
        <DetailItem label="Nomor Rekening" value={currentDosen.account_no} />
        <DetailItem label="Atas Nama" value={currentDosen.account_name} />
        
        {/* --- Bagian Aksi (Tombol) --- */}
        <div className="modal-action mt-6">
          <form method="dialog" className="w-full flex justify-between">
            <div>
              {/* Tombol Promote (muncul jika role-nya 'Dosen') */}
              {currentDosen.role_id === '1' && (
                <button 
                  className="btn btn-primary"
                  onClick={() => onPromote(currentDosen.id)}
                >
                  Promosikan ke Ka LPPM
                </button>
              )}

              {/* Tombol Demote (muncul jika role-nya 'Ka LPPM') */}
              {currentDosen.role_id === '2' && (
                <button 
                  className="btn btn-warning"
                  onClick={() => onDemote(currentDosen.id)}
                >
                  Demosikan ke Dosen
                </button>
              )}
            </div>

            {/* Tombol untuk menutup modal */}
            <button className="btn">Tutup</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DosenDetailModal;