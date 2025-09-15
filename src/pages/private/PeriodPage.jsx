// src/pages/PeriodPage.jsx
import React, { useState, useRef, useMemo } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon, CalendarDaysIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Toaster, toast } from 'react-hot-toast'; // <-- Import Toaster

// Data dummy dengan lebih banyak variasi tanggal
const initialPeriods = [
  { id: 1, name: 'Semester Ganjil 2024/2025', startDate: '2024-09-01', endDate: '2025-01-31', status: 'Active' },
  { id: 2, name: 'Semester Genap 2023/2024', startDate: '2024-02-01', endDate: '2024-07-31', status: 'Inactive' }, // Selesai
  { id: 3, name: 'Penelitian Tahap 1 2025', startDate: '2025-08-15', endDate: '2025-11-15', status: 'Active' }, // Akan Datang
  { id: 4, name: 'Pengabdian Masyarakat 2024', startDate: '2024-05-01', endDate: '2024-09-30', status: 'Active' }, // Sedang Berlangsung
];

// Helper functions (dipindahkan ke luar komponen agar tidak dibuat ulang setiap render)
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getDuration = (start, end) => {
  if (!start || !end) return 0;
  const diffTime = Math.abs(new Date(end) - new Date(start));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 untuk inklusif
};

const getTimelineStatus = (start, end) => {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (now > endDate) return { text: 'Finished', color: 'bg-base-300 text-base-content' };
  if (now >= startDate && now <= endDate) return { text: 'Ongoing', color: 'bg-blue-500 text-white' };
  return { text: 'Upcoming', color: 'bg-yellow-400 text-black' };
};

function PeriodPage() {
  const [periods, setPeriods] = useState(initialPeriods);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [newPeriodData, setNewPeriodData] = useState({ name: '', startDate: '', endDate: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Menggunakan useMemo untuk performa filtering & searching
  const filteredPeriods = useMemo(() => {
    return periods
      .filter(p => statusFilter === 'All' || p.status === statusFilter)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [periods, statusFilter, searchTerm]);

  // Refs untuk modal
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const confirmModalRef = useRef(null);

  // Handlers untuk CRUD dengan Toast Notifications
  const handleAddNewPeriod = () => {
    const { name, startDate, endDate } = newPeriodData;
    if (name.trim() === '' || !startDate || !endDate) return toast.error('Semua field harus diisi.');
    if (new Date(endDate) < new Date(startDate)) return toast.error('Tanggal berakhir tidak boleh sebelum tanggal mulai.');

    const newPeriod = { id: Date.now(), ...newPeriodData, status: 'Active' };
    setPeriods([...periods, newPeriod]);
    addModalRef.current.close();
    toast.success('Periode baru berhasil ditambahkan!');
  };

  const handleEditPeriod = () => {
    if (!currentPeriod) return;
    const { name, startDate, endDate } = currentPeriod;
    if (name.trim() === '' || !startDate || !endDate) return toast.error('Semua field harus diisi.');
    if (new Date(endDate) < new Date(startDate)) return toast.error('Tanggal berakhir tidak boleh sebelum tanggal mulai.');

    setPeriods(periods.map(p => (p.id === currentPeriod.id ? currentPeriod : p)));
    editModalRef.current.close();
    toast.success('Periode berhasil diperbarui!');
  };

  const handleToggleStatus = () => {
    if (!currentPeriod) return;
    const updatedStatus = currentPeriod.status === 'Active' ? 'Inactive' : 'Active';
    setPeriods(periods.map(p => (p.id === currentPeriod.id ? { ...p, status: updatedStatus } : p)));
    confirmModalRef.current.close();
    toast.success(`Periode "${currentPeriod.name}" telah di-${updatedStatus === 'Active' ? 'aktifkan' : 'nonaktifkan'}.`);
  };

  // --- Handlers untuk membuka modal (tetap sama) ---
  const handleOpenAddModal = () => { setNewPeriodData({ name: '', startDate: '', endDate: '' }); addModalRef.current.showModal(); };
  const handleOpenEditModal = (period) => { setCurrentPeriod(period); editModalRef.current.showModal(); };
  const handleOpenConfirmModal = (period) => { setCurrentPeriod(period); confirmModalRef.current.showModal(); };

  return (
    <div>
      {/* --- Notifikasi Toast --- */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* --- Header Halaman --- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Periods Management</h1>
          <p className="mt-1 text-sm text-base-content/70">Kelola periode kegiatan, penelitian, atau semester.</p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary"><PlusIcon className="w-5 h-5" /> Add New Period</button>
      </div>

      {/* --- Stat Cards --- */}
      <div className="stats shadow w-full mb-6">
        <div className="stat">
          <div className="stat-figure text-primary"><CalendarDaysIcon className="w-8 h-8" /></div>
          <div className="stat-title">Total Periods</div>
          <div className="stat-value">{periods.length}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-success"><CheckCircleIcon className="w-8 h-8" /></div>
          <div className="stat-title">Active</div>
          <div className="stat-value">{periods.filter(p => p.status === 'Active').length}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error"><ClockIcon className="w-8 h-8" /></div>
          <div className="stat-title">Inactive</div>
          <div className="stat-value">{periods.filter(p => p.status === 'Inactive').length}</div>
        </div>
      </div>

      {/* --- Kontrol: Filter & Search --- */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="form-control w-full md:w-auto">
              <select className="select select-bordered" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <input type="text" placeholder="Search by period name..." className="input input-bordered w-full md:w-1/3" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          {/* --- Tabel Data --- */}
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Period Name</th>
                  <th>Timeline</th>
                  <th className='text-center'>Duration</th>
                  <th className='text-center'>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPeriods.map((period) => {
                  const timeline = getTimelineStatus(period.startDate, period.endDate);
                  return (
                    <tr key={period.id} className="hover">
                      <td>
                        <div className="font-bold">{period.name}</div>
                        <div className={`badge badge-sm ${timeline.color} mt-1`}>{timeline.text}</div>
                      </td>
                      <td>
                        {formatDate(period.startDate)}
                        <br />
                        <span className="text-base-content/70">to {formatDate(period.endDate)}</span>
                      </td>
                      <td className='text-center'>{getDuration(period.startDate, period.endDate)} days</td>
                      <td className='text-center'>
                        <span className={`badge ${period.status === 'Active' ? 'badge-success' : 'badge-error'}`}>{period.status}</span>
                      </td>
                      <td className="text-center">
                        {/* Tombol Aksi tetap sama */}
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleOpenEditModal(period)} className="btn btn-sm btn-info btn-outline w-32 justify-start"><PencilIcon className="w-4 h-4 mr-2" /><span>Edit</span></button>
                          {period.status === 'Active' ? <button onClick={() => handleOpenConfirmModal(period)} className="btn btn-sm btn-error btn-outline w-32 justify-start"><TrashIcon className="w-4 h-4 mr-2" /><span>Deactivate</span></button> : <button onClick={() => handleOpenConfirmModal(period)} className="btn btn-sm btn-success btn-outline w-32 justify-start"><ArrowPathIcon className="w-4 h-4 mr-2" /><span>Activate</span></button>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- Modal Add New Period --- */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Period</h3>
          <div className="form-control w-full mt-4">
            <label className="label"><span className="label-text">Period Name</span></label>
            <input type="text" placeholder="e.g., Semester Ganjil 2025/2026" className="input input-bordered w-full" value={newPeriodData.name} onChange={(e) => setNewPeriodData({ ...newPeriodData, name: e.target.value })} />
          </div>
          <div className="flex gap-4 mt-2">
            <div className="form-control w-1/2">
              <label className="label"><span className="label-text">Start Date</span></label>
              <input type="date" className="input input-bordered w-full" value={newPeriodData.startDate} onChange={(e) => setNewPeriodData({ ...newPeriodData, startDate: e.target.value })} />
            </div>
            <div className="form-control w-1/2">
              <label className="label"><span className="label-text">End Date</span></label>
              <input type="date" className="input input-bordered w-full" value={newPeriodData.endDate} onChange={(e) => setNewPeriodData({ ...newPeriodData, endDate: e.target.value })} />
            </div>
          </div>
          <div className="modal-action mt-6">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleAddNewPeriod} className="btn btn-primary ml-2">Save Period</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Edit Period --- */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Period</h3>
          <div className="form-control w-full mt-4">
            <label className="label"><span className="label-text">Period Name</span></label>
            <input type="text" className="input input-bordered w-full" value={currentPeriod?.name || ''} onChange={(e) => setCurrentPeriod({ ...currentPeriod, name: e.target.value })} />
          </div>
          <div className="flex gap-4 mt-2">
            <div className="form-control w-1/2">
              <label className="label"><span className="label-text">Start Date</span></label>
              <input type="date" className="input input-bordered w-full" value={currentPeriod?.startDate || ''} onChange={(e) => setCurrentPeriod({ ...currentPeriod, startDate: e.target.value })} />
            </div>
            <div className="form-control w-1/2">
              <label className="label"><span className="label-text">End Date</span></label>
              <input type="date" className="input input-bordered w-full" value={currentPeriod?.endDate || ''} onChange={(e) => setCurrentPeriod({ ...currentPeriod, endDate: e.target.value })} />
            </div>
          </div>
          <div className="modal-action mt-6">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleEditPeriod} className="btn btn-primary ml-2">Save Changes</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Konfirmasi --- */}
      <dialog ref={confirmModalRef} className="modal">
        {/* Konten modal konfirmasi sama persis dengan TagPage */}
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Action</h3>
          <p className="py-4">
            Are you sure you want to {currentPeriod?.status === 'Active' ? 'deactivate' : 'activate'} the period "{currentPeriod?.name}"?
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleToggleStatus} className={`btn ${currentPeriod?.status === 'Active' ? 'btn-error' : 'btn-success'} ml-2`}>
              Yes, {currentPeriod?.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PeriodPage;

