// src/pages/DosenPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import apiService from '../../utils/services/apiService';
import { useToast } from '../../context/ToastContext';
import PaginationController from '../../components/PaginationController';

function DosenPage() {
  const { addToast } = useToast()

  const [dosens, setDosens] = useState([])

  // paginate & search state
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);           // currentPage
  const [limit, setLimit] = useState(10);        // pageSize
  const [totalPages, setTotalPages] = useState(1);
  const [banks, setBanks] = useState([]); // State baru untuk menyimpan daftar bank
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentDosen, setCurrentDosen] = useState(null);
  const editModalRef = useRef(null);

  const handleSyncDataDosen = async () => {
    try {

      const res = await apiService.post("/dosen/sync");
      console.log(res);
      if (res.data.created !== 0 || res.data.updated !== 0) {
        addToast("Dosen synced successfully, updated " + (res.data.created + res.data.updated) + " records", "success");
        fetchDosens();
      } else {
        addToast("Dosen data already synced", "success");
      }
    } catch (err) {
      addToast("Failed to sync dosen data", "error");
    }
  };

  const fetchDosens = async () => {
    try {
      console.log(page, limit, searchQuery)
      const res = await apiService.get("/dosen/all", {
        page,
        limit,
        search: searchQuery || "",
      });

      const banksResponse = await apiService.get("/bank")
      setBanks(banksResponse.data);

      setTotalItems(res.meta.totalItems);
      setTotalPages(res.meta.totalPages);
      setHasNextPage(res.meta.hasNextPage);
      setHasPreviousPage(res.meta.hasPreviousPage);

      setDosens(res.data); // sesuai backend: res.data = array dosen
    } catch (err) {
      addToast("Failed to fetch dosen data", "error");
    }
  };

  const handleOpenEditModal = (dosen) => {
    setCurrentDosen(dosen)
    editModalRef.current.showModal();
  };

  const handleRoleChange = async (newRole) => {
    if (!currentDosen) return;

    setIsSubmitting(true);
    try {
      const updatedDosen = await apiService.put(
        `/dosen/${currentDosen.id}`,
        { role_id: newRole }
      );

      addToast("Role dosen berhasil diperbarui.", "success");
      fetchDosens();
      editModalRef.current.close();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal memperbarui role.";
      addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchDosens();
  }, [page, limit]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Data Dosen</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Pengolahan data dosen pada lembaga LPPM ISTTS saat ini
          </p>
        </div>
        <button onClick={handleSyncDataDosen} className="btn btn-primary">
          Sync Data Dosen
        </button>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            {/* Search */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search dosen..."
                className="input input-bordered w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary ml-2" onClick={() => { setPage(1); fetchDosens(); }}>
                Search
              </button>
            </div>

            {/* PaginationController di atas table */}
            <PaginationController
              page={page}
              limit={limit}
              totalItems={totalItems}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              onPageChange={(newPage) => {
                setPage(newPage);
                fetchDosens();
              }}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1); // reset ke page 1
                fetchDosens();
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-[38rem] overflow-y-auto">
              <table className="table table-zebra">
                <thead className='sticky top-0 bg-base-200'>
                  <tr>
                    <th>#</th>
                    <th>Kode Dosen</th>
                    <th>Nama Dosen</th>
                    <th>Email</th>
                    <th>ID SINTA</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dosens && dosens.map((dosen, index) => (
                    <tr key={dosen.name}>
                      <th>{index + 1}</th>
                      <td>{dosen.code}</td>
                      <td>{dosen.name}</td>
                      <td>{dosen.email}</td>
                      <td>{dosen.sinta_id ? dosen.sinta_id : "-"}</td>
                      <td>
                        {dosen.role_id == "1" ? (
                          <div className="badge badge-outline">Dosen</div>
                        ) : dosen.role_id == "2" ? (
                          <div className="badge badge-info badge-outline">Ka LPPM</div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td><div className={"badge badge-outline " + (dosen.status == 1 ? "badge-success" : "badge-error")}>{dosen.status == 1 ? "Active" : "Inactive"}</div></td>
                      <td className="">
                        <button
                          onClick={() => { handleOpenEditModal(dosen) }}
                          className="btn btn-warning btn-sm">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* edit modal dialog */}
      <dialog ref={editModalRef} className="modal">
        {/* Menambahkan modal-bottom agar lebih responsif di mobile */}
        <div className="modal-box w-11/12 max-w-2xl">
          {/* Guard clause untuk memastikan currentDosen tidak null */}
          {currentDosen && (
            <>
              <h3 className="font-bold text-lg">Detail Dosen</h3>
              <p className="text-base-content/70 -mt-1 mb-4">{currentDosen.name}</p>

              {/* --- Bagian Detail Informasi --- */}
              <div className="space-y-2 text-sm">
                {/* Baris untuk Kode, Email, Sinta ID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 rounded-lg bg-base-200">
                  <div>
                    <div className="text-xs text-base-content/70">Kode Dosen</div>
                    <div className="font-semibold">{currentDosen.code}</div>
                  </div>
                  <div>
                    <div className="text-xs text-base-content/70">Email</div>
                    <div className="font-semibold break-words">{currentDosen.email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-base-content/70">SINTA ID</div>
                    <div className="font-semibold">
                      {currentDosen.sinta_id ? (
                        currentDosen.sinta_id
                      ) : (
                        <span className="italic text-base-content/50">Belum diisi</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Baris untuk Role dan Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                  <div>
                    <div className="text-xs text-base-content/70">Role Saat Ini</div>
                    <div className="font-semibold">
                      {currentDosen.role_id === '1' && 'Dosen'}
                      {currentDosen.role_id === '2' && 'Ka LPPM'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-base-content/70">Status</div>
                    <div className="font-semibold">
                      {currentDosen.status === 1 ?
                        <span className="badge badge-success badge-sm">Aktif</span> :
                        <span className="badge badge-error badge-sm">Tidak Aktif</span>
                      }
                    </div>
                  </div>
                </div>

                {/* --- Bagian Informasi Bank --- */}
                <div className="pt-2">
                  <h4 className="font-semibold text-base border-b pb-1 mb-2">Informasi Bank</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
                    <div>
                      <div className="text-xs text-base-content/70">Nama Bank</div>
                      <div className="font-semibold">
                        {currentDosen.bank_id ? (
                          banks?.find(bank => bank.id.toString() === currentDosen.bank_id)?.name || "-"
                        ) : (
                          <span className="italic text-base-content/50">Belum diisi</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-base-content/70">No. Rekening</div>
                      <div className="font-semibold">
                        {currentDosen.account_no ? (
                          currentDosen.account_no
                        ) : (
                          <span className="italic text-base-content/50">Belum diisi</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-base-content/70">Atas Nama</div>
                      <div className="font-semibold">
                        {currentDosen.account_name ? (
                          currentDosen.account_name
                        ) : (
                          <span className="italic text-base-content/50">Belum diisi</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Bagian Aksi Promote / Demote --- */}
              <div className="divider text-sm">Manajemen Role</div>
              <div className="p-4 bg-base-200 rounded-lg text-center">
                {/* Tombol Promote (muncul jika role adalah '1') */}
                {currentDosen.role_id === '1' && (
                  <div>
                    <p className="mb-2 text-sm">Dosen ini dapat dipromosikan menjadi Kepala LPPM.</p>
                    <button
                      onClick={() => handleRoleChange('2')}
                      className={`btn btn-sm  btn-success ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      Promote menjadi Ka LPPM
                    </button>
                  </div>
                )}

                {/* Tombol Demote (muncul jika role adalah '2') */}
                {currentDosen.role_id === '2' && (
                  <div>
                    <p className="mb-2 text-sm">Kembalikan role Kepala LPPM menjadi Dosen biasa.</p>
                    <button
                      onClick={() => handleRoleChange('1')}
                      className={`btn btn-sm  btn-warning ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      Demote menjadi Dosen
                    </button>
                  </div>
                )}
              </div>

              {/* --- Bagian Tombol Aksi Modal --- */}
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-ghost">Tutup</button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>

    </div>
  );
}

export default DosenPage;