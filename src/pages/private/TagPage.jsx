// src/pages/TagPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import apiService from '../../utils/services/apiService';
import { useToast } from '../../context/ToastContext';
import PaginationController from '../../components/PaginationController';

function TagPage() {
  const { addToast } = useToast()

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);
  const [newTagName, setNewTagName] = useState('');

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
    if (newTagName.trim() === '') {
      setPostError("Tag name cannot be empty")
      return;
    }

    try {
      const response = await apiService.post("/tag", { name: newTagName });
      setTags([...tags, response.data]);
      addModalRef.current.close();
      addToast("Tag added successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to add tag"
      addModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleEditTag = async () => {
    if (!currentTag || currentTag.name.trim() === '') {
      setPostError("Tag name cannot be empty")
      return;
    };

    try {
      const response = await apiService.put(`/tag/${currentTag.id}`, { name: currentTag.name, status: currentTag.status });
      setTags(tags.map(tag => (tag.id === currentTag.id ? currentTag : tag)));
      editModalRef.current.close();
      addToast("Tag updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update tag"
      editModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleToggleStatus = async () => {
    if (!currentTag) {
      addToast("Tag not found", "error")
      return;
    };

    const updatedStatus = currentTag.status === '1' ? '0' : '1';

    try {
      const response = await apiService.put(`/tag/${currentTag.id}`, { name: currentTag.name, status: updatedStatus });
      setTags(tags.map(tag => (tag.name === currentTag.name ? { ...tag, status: updatedStatus } : tag)));
      confirmModalRef.current.close();
      addToast("Tag updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update tag"
      confirmModalRef.current.close();
      addToast(message, "error")
    }
  };

  const fetchTags = async () => {
    try {
      console.log(page, limit, searchQuery)
      const res = await apiService.get("/tag", {
        page,
        limit,
        search: searchQuery || "",
      });

      setTotalItems(res.meta.totalItems);
      setTotalPages(res.meta.totalPages);
      setHasNextPage(res.meta.hasNextPage);
      setHasPreviousPage(res.meta.hasPreviousPage);

      setTags(res.data); // sesuai backend: res.data = array tag
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  useEffect(() => {

    fetchTags();
  }, [page, limit]);

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
          <div className="flex justify-between items-center mb-4">
            {/* Search */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search tag..."
                className="input input-bordered w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary ml-2" onClick={() => { setPage(1); fetchTags(); }}>
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
                fetchTags();
              }}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1); // reset ke page 1
                fetchTags();
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-[34rem] overflow-y-auto">
              <table className="table table-zebra">
                <thead className='sticky top-0 bg-base-200'>
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
                        <span className={`badge ${tag.status === '1' ? 'badge-success' : 'badge-error'}`}>
                          {tag.status === "1" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center">
                        {/* --- PERUBAHAN UTAMA: Tombol dengan Lebar Tetap --- */}
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleOpenEditModal(tag)} className="btn btn-sm btn-info btn-outline w-32 justify-start">
                            <PencilIcon className="w-4 h-4 mr-2" />
                            <span>Edit</span>
                          </button>
                          {tag.status === '1' ? (
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
      </div>

      {/* --- Semua Modal Tetap Sama --- */}
      {/* --- Modal Add New Tag --- */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Tag</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Tag Name</span></label>
            <input type="text" placeholder="e.g., Jurnal SINTA 2" className="input input-bordered w-full" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
            {postError && postError !== "" && <span className='text-error'>{postError}</span>}
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
            {postError && postError !== "" && <span className='text-error'>{postError}</span>}
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
            Are you sure you want to {currentTag?.status === '1' ? 'deactivate' : 'activate'} the tag "{currentTag?.name}"?
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Cancel</button></form>
            <button onClick={handleToggleStatus} className={`btn ${currentTag?.status === '1' ? 'btn-error' : 'btn-success'} ml-2`}>
              Yes, {currentTag?.status === '1' ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      </dialog>
    </div>


  );
}

export default TagPage;