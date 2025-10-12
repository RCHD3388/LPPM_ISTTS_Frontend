// src/pages/PeriodePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import apiService from '../../utils/services/apiService';
import { useToast } from '../../context/ToastContext';
import PaginationController from '../../components/PaginationController';

function PeriodPage() {
  const { addToast } = useToast()

  const [periodes, setPeriodes] = useState([]);
  const [currentPeriode, setCurrentPeriode] = useState(null);
  const [newPeriodeName, setNewPeriodeName] = useState('');

  const [postError, setPostError] = useState("")

  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const confirmModalRef = useRef(null);

  // paginate & search state
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);           // currentPage
  const [limit, setLimit] = useState(10);        // pageSize
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);


  const handleOpenAddModal = () => {
    setNewPeriodeName('');
    addModalRef.current.showModal();
  };

  const handleOpenEditModal = (periode) => {
    setCurrentPeriode(periode);
    editModalRef.current.showModal();
  };

  const handleOpenConfirmModal = (periode) => {
    setCurrentPeriode(periode);
    confirmModalRef.current.showModal();
  };

  const handleAddNewPeriode = async () => {
    if (newPeriodeName.trim() === '') {
      setPostError("Periode name cannot be empty")
      return;
    }

    try {
      const response = await apiService.post("/periode", { name: newPeriodeName });
      setPeriodes([...periodes, response.data]);
      addModalRef.current.close();
      addToast("Periode added successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to add periode"
      addModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleEditPeriode = async () => {
    if (!currentPeriode || currentPeriode.name.trim() === '') {
      setPostError("Periode name cannot be empty")
      return;
    };

    try {
      const response = await apiService.put(`/periode/${currentPeriode.id}`, { name: currentPeriode.name, status: currentPeriode.status });
      setPeriodes(periodes.map(periode => (periode.id === currentPeriode.id ? currentPeriode : periode)));
      editModalRef.current.close();
      addToast("Periode updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update periode"
      editModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleToggleStatus = async () => {
    if (!currentPeriode) {
      addToast("Periode not found", "error")
      return;
    };

    const updatedStatus = currentPeriode.status === '1' ? '0' : '1';

    try {
      const response = await apiService.put(`/periode/${currentPeriode.id}`, { name: currentPeriode.name, status: updatedStatus });
      setPeriodes(periodes.map(periode => (periode.name === currentPeriode.name ? { ...periode, status: updatedStatus } : periode)));
      confirmModalRef.current.close();
      addToast("Periode updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update periode"
      confirmModalRef.current.close();
      addToast(message, "error")
    }
  };

  const fetchPeriodes = async () => {
    try {
      console.log(page, limit, searchQuery)
      const res = await apiService.get("/periode", {
        page,
        limit,
        search: searchQuery || "",
      });

      setTotalItems(res.meta.totalItems);
      setTotalPages(res.meta.totalPages);
      setHasNextPage(res.meta.hasNextPage);
      setHasPreviousPage(res.meta.hasPreviousPage);

      setPeriodes(res.data); // sesuai backend: res.data = array periode
    } catch (err) {
      console.error("Failed to fetch periodes:", err);
    }
  };

  useEffect(() => {

    fetchPeriodes();
  }, [page, limit]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Data Periode</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Kelola, tambah, edit, dan nonaktifkan periode yang tersedia.
          </p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Tambah Periode Baru
        </button>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            {/* Search */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search periode..."
                className="input input-bordered w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary ml-2" onClick={() => { setPage(1); fetchPeriodes(); }}>
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
                fetchPeriodes();
              }}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1); // reset ke page 1
                fetchPeriodes();
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-[34rem] overflow-y-auto">
              <table className="table table-zebra">
                <thead className='sticky top-0 bg-base-200'>
                  <tr>
                    <th>#</th>
                    <th>Periode Name</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {periodes && periodes.map((periode, index) => (
                    <tr key={periode.name}>
                      <th>{index + 1}</th>
                      <td>{periode.name}</td>
                      <td>
                        <span className={`badge ${periode.status === '1' ? 'badge-success' : 'badge-error'}`}>
                          {periode.status === "1" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        {/* --- PERUBAHAN UTAMA: Tombol dengan Lebar Tetap --- */}
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleOpenEditModal(periode)} className="btn btn-sm btn-info btn-outline w-32 justify-start">
                            <PencilIcon className="w-4 h-4 mr-2" />
                            <span>Edit</span>
                          </button>
                          {periode.status === '1' ? (
                            <button onClick={() => handleOpenConfirmModal(periode)} className="btn btn-sm btn-error btn-outline w-32 justify-start">
                              <TrashIcon className="w-4 h-4 mr-2" />
                              <span>Deactivate</span>
                            </button>
                          ) : (
                            <button onClick={() => handleOpenConfirmModal(periode)} className="btn btn-sm btn-success btn-outline w-32 justify-start">
                              <ArrowPathIcon className="w-4 h-4 mr-2" />
                              <span>Activate</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- Semua Modal Tetap Sama --- */}
      {/* --- Modal Add New Periode --- */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Periode Baru</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Periode Name</span></label>
            <input type="text" placeholder="e.g., 2025/2026 GASAL" className="input input-bordered w-full" value={newPeriodeName} onChange={(e) => setNewPeriodeName(e.target.value)} />
            {postError && postError !== "" && <span className='text-error'>{postError}</span>}
          </div>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Batalkan</button></form>
            <button onClick={handleAddNewPeriode} className="btn btn-primary ml-2">Simpan Periode</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Edit Periode --- */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Periode</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Periode Name</span></label>
            <input type="text" className="input input-bordered w-full" value={currentPeriode?.name || ''} onChange={(e) => setCurrentPeriode({ ...currentPeriode, name: e.target.value })} />
            {postError && postError !== "" && <span className='text-error'>{postError}</span>}
          </div>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Batalkan</button></form>
            <button onClick={handleEditPeriode} className="btn btn-primary ml-2">Simpan Perubahan</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Konfirmasi --- */}
      <dialog ref={confirmModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konfirmasi</h3>
          <p className="py-4">
            Are you sure you want to {currentPeriode?.status === '1' ? 'deactivate' : 'activate'} the periode "{currentPeriode?.name}"?
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Batalkan</button></form>
            <button onClick={handleToggleStatus} className={`btn ${currentPeriode?.status === '1' ? 'btn-error' : 'btn-success'} ml-2`}>
              Yes, {currentPeriode?.status === '1' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      </dialog>
    </div>


  );
}

export default PeriodPage;