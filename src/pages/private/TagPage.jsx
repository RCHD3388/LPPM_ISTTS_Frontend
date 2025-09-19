// src/pages/TagPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import apiService from '../../utils/services/apiService';

function TagPage() {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);
  const [newTagName, setNewTagName] = useState('');

  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const confirmModalRef = useRef(null);

  const handleOpenAddModal = () => {
    setNewTagName('');
    addModalRef.current.showModal();
  };

  const handleOpenEditModal = (tag) => {
    setCurrentTag(tag);
    editModalRef.current.showModal();
  };

  const handleOpenConfirmModal = (tag) => {
    setCurrentTag(tag);
    confirmModalRef.current.showModal();
  };

  const handleAddNewTag = async () => {
    if (newTagName.trim() === '') return;
    const response = await apiService.post("/tag", { name: newTagName });
    setTags([...tags, response.data]);
    addModalRef.current.close();
  };

  const handleEditTag = () => {
    if (!currentTag || currentTag.name.trim() === '') return;
    setTags(tags.map(tag => (tag.name === currentTag.name ? currentTag : tag)));
    editModalRef.current.close();
  };

  const handleToggleStatus = () => {
    if (!currentTag) return;
    const updatedStatus = currentTag.status === 'Active' ? 'Inactive' : 'Active';
    setTags(tags.map(tag => (tag.name === currentTag.name ? { ...tag, status: updatedStatus } : tag)));
    confirmModalRef.current.close();
  };

  const fetchTags = async () => {
    try {
      const res = await apiService.get("/tag");
      console.log(res)
      setTags(res.data); // sesuai backend: res.data = array tag
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tags Management</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Kelola, tambah, edit, dan nonaktifkan tag yang tersedia.
          </p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Add New Tag
        </button>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-end mb-4">
            <input type="text" placeholder="Search tag..." className="input input-bordered w-full max-w-xs" />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tag Name</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tags && tags.map((tag, index) => (
                  <tr key={tag.name}>
                    <th>{index + 1}</th>
                    <td>{tag.name}</td>
                    <td>
                      <span className={`badge ${tag.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                        {tag.status}
                      </span>
                    </td>
                    <td className="text-center">
                      {/* --- PERUBAHAN UTAMA: Tombol dengan Lebar Tetap --- */}
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOpenEditModal(tag)} className="btn btn-sm btn-info btn-outline w-32 justify-start">
                          <PencilIcon className="w-4 h-4 mr-2" />
                          <span>Edit</span>
                        </button>
                        {tag.status === 'Active' ? (
                          <button onClick={() => handleOpenConfirmModal(tag)} className="btn btn-sm btn-error btn-outline w-32 justify-start">
                            <TrashIcon className="w-4 h-4 mr-2" />
                            <span>Deactivate</span>
                          </button>
                        ) : (
                          <button onClick={() => handleOpenConfirmModal(tag)} className="btn btn-sm btn-success btn-outline w-32 justify-start">
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

      {/* --- Semua Modal Tetap Sama --- */}
      {/* --- Modal Add New Tag --- */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Tag</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Tag Name</span></label>
            <input type="text" placeholder="e.g., Jurnal SINTA 2" className="input input-bordered w-full" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
          </div>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleAddNewTag} className="btn btn-primary ml-2">Save Tag</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Edit Tag --- */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Tag</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Tag Name</span></label>
            <input type="text" className="input input-bordered w-full" value={currentTag?.name || ''} onChange={(e) => setCurrentTag({ ...currentTag, name: e.target.value })} />
          </div>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleEditTag} className="btn btn-primary ml-2">Save Changes</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Konfirmasi --- */}
      <dialog ref={confirmModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Action</h3>
          <p className="py-4">
            Are you sure you want to {currentTag?.status === 'Active' ? 'deactivate' : 'activate'} the tag "{currentTag?.name}"?
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleToggleStatus} className={`btn ${currentTag?.status === 'Active' ? 'btn-error' : 'btn-success'} ml-2`}>
              Yes, {currentTag?.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      </dialog>
    </div>


  );
}

export default TagPage;