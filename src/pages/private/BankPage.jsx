// src/pages/BankPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import apiService from '../../utils/services/apiService';
import { useToast } from '../../context/ToastContext';
import PaginationController from '../../components/PaginationController';

function PeriodPage() {
  const { addToast } = useToast()

  const [banks, setBanks] = useState([]);
  const [currentBank, setCurrentBank] = useState(null);
  const [newBankName, setNewBankName] = useState('');

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
    setNewBankName('');
    addModalRef.current.showModal();
  };

  const handleOpenEditModal = (bank) => {
    setCurrentBank(bank);
    editModalRef.current.showModal();
  };

  const handleOpenConfirmModal = (bank) => {
    setCurrentBank(bank);
    confirmModalRef.current.showModal();
  };

  const handleAddNewBank = async () => {
    if (newBankName.trim() === '') {
      setPostError("Bank name cannot be empty")
      return;
    }

    try {
      const response = await apiService.post("/bank", { name: newBankName });
      setBanks([...banks, response.data]);
      addModalRef.current.close();
      addToast("Bank added successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to add bank"
      addModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleEditBank = async () => {
    if (!currentBank || currentBank.name.trim() === '') {
      setPostError("Bank name cannot be empty")
      return;
    };

    try {
      const response = await apiService.put(`/bank/${currentBank.id}`, { name: currentBank.name, status: currentBank.status });
      setBanks(banks.map(bank => (bank.id === currentBank.id ? currentBank : bank)));
      editModalRef.current.close();
      addToast("Bank updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update bank"
      editModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleToggleStatus = async () => {
    if (!currentBank) {
      addToast("Bank not found", "error")
      return;
    };

    const updatedStatus = currentBank.status === '1' ? '0' : '1';

    try {
      const response = await apiService.put(`/bank/${currentBank.id}`, { name: currentBank.name, status: updatedStatus });
      setBanks(banks.map(bank => (bank.name === currentBank.name ? { ...bank, status: updatedStatus } : bank)));
      confirmModalRef.current.close();
      addToast("Bank updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update bank"
      confirmModalRef.current.close();
      addToast(message, "error")
    }
  };

  const fetchBanks = async () => {
    try {
      console.log(page, limit, searchQuery)
      const res = await apiService.get("/bank", {
        page,
        limit,
        search: searchQuery || "",
      });

      setTotalItems(res.meta.totalItems);
      setTotalPages(res.meta.totalPages);
      setHasNextPage(res.meta.hasNextPage);
      setHasPreviousPage(res.meta.hasPreviousPage);

      setBanks(res.data); // sesuai backend: res.data = array bank
    } catch (err) {
      console.error("Failed to fetch banks:", err);
    }
  };

  useEffect(() => {

    fetchBanks();
  }, [page, limit]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Bank Management</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Kelola, tambah, edit, dan nonaktifkan bank yang tersedia.
          </p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Add New Bank
        </button>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            {/* Search */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search bank..."
                className="input input-bordered w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary ml-2" onClick={() => { setPage(1); fetchBanks(); }}>
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
                fetchBanks();
              }}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1); // reset ke page 1
                fetchBanks();
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-[34rem] overflow-y-auto">
              <table className="table table-zebra">
                <thead className='sticky top-0 bg-base-200'>
                  <tr>
                    <th>#</th>
                    <th>Bank Name</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banks && banks.map((bank, index) => (
                    <tr key={bank.name}>
                      <th>{index + 1}</th>
                      <td>{bank.name}</td>
                      <td>
                        <span className={`badge ${bank.status === '1' ? 'badge-success' : 'badge-error'}`}>
                          {bank.status === "1" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        {/* --- PERUBAHAN UTAMA: Tombol dengan Lebar Tetap --- */}
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleOpenEditModal(bank)} className="btn btn-sm btn-info btn-outline w-32 justify-start">
                            <PencilIcon className="w-4 h-4 mr-2" />
                            <span>Edit</span>
                          </button>
                          {bank.status === '1' ? (
                            <button onClick={() => handleOpenConfirmModal(bank)} className="btn btn-sm btn-error btn-outline w-32 justify-start">
                              <TrashIcon className="w-4 h-4 mr-2" />
                              <span>Deactivate</span>
                            </button>
                          ) : (
                            <button onClick={() => handleOpenConfirmModal(bank)} className="btn btn-sm btn-success btn-outline w-32 justify-start">
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
      {/* --- Modal Add New Bank --- */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Bank</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Bank Name</span></label>
            <input type="text" placeholder="e.g., BCA (Bank Central Asia)" className="input input-bordered w-full" value={newBankName} onChange={(e) => setNewBankName(e.target.value)} />
            {postError && postError !== "" && <span className='text-error'>{postError}</span>}
          </div>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleAddNewBank} className="btn btn-primary ml-2">Save Bank</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Edit Bank --- */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Bank</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Bank Name</span></label>
            <input type="text" className="input input-bordered w-full" value={currentBank?.name || ''} onChange={(e) => setCurrentBank({ ...currentBank, name: e.target.value })} />
            {postError && postError !== "" && <span className='text-error'>{postError}</span>}
          </div>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleEditBank} className="btn btn-primary ml-2">Save Changes</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Konfirmasi --- */}
      <dialog ref={confirmModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Action</h3>
          <p className="py-4">
            Are you sure you want to {currentBank?.status === '1' ? 'deactivate' : 'activate'} the bank "{currentBank?.name}"?
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleToggleStatus} className={`btn ${currentBank?.status === '1' ? 'btn-error' : 'btn-success'} ml-2`}>
              Yes, {currentBank?.status === '1' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      </dialog>
    </div>


  );
}

export default PeriodPage;