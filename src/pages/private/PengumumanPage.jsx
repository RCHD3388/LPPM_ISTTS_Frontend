import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, Squares2X2Icon, Bars3Icon } from "@heroicons/react/24/outline";
import PengumumanCard from "../../components/PengumumanCard";
import AttachmentInputMultiple from "../../components/AttachmentInputMultiple";
import { useEffect } from "react";
import apiService from "../../utils/services/apiService";
import { useToast } from "../../context/ToastContext";

function PengumumanPage() {
  const addModalRef = useRef(null);
  const {addToast} = useToast();

  const [tagOptions, setTagOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);

  const [viewMode, setViewMode] = useState("grid");
  const [pengumumanList, setPengumumanList] = useState([]);

  // Pagination state
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);           // currentPage
  const [limit, setLimit] = useState(10);        // pageSize
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const handleOpenAddModal = () => {
    setTitle("");
    setTag("");
    setContent("");
    setAttachments([]);
    addModalRef.current.showModal();
  };

  const handleSave = async () => {
    if (!title.trim() || !tag || !content.trim()) {
      alert("Judul, isi, dan tag wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tag", tag);
    formData.append("body", content);
    attachments.forEach((attachment) => {
      if (attachment.type === "file") {
        formData.append("files", attachment.value);
      } else if (attachment.type === "link") {
        formData.append("links", attachment.value);
      }
    });
    addToast("Berhasil membuat pengumuman", "success");
    const response = await apiService.post("/pengumuman", formData);

    fetchPengumuman();
    addModalRef.current.close();
  };

  const updateTagOptions = async () => {
    try {
      const response = await apiService.get("/tag", { status: "1" });
      setTagOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPengumuman = async () => {
    try {
      console.log(page, limit, searchQuery)
      const res = await apiService.get("/pengumuman", {
        page,
        limit,
        search: searchQuery || "",
      });

      setTotalItems(res.meta.totalItems);
      setTotalPages(res.meta.totalPages);
      setHasNextPage(res.meta.hasNextPage);
      setHasPreviousPage(res.meta.hasPreviousPage);

      setPengumumanList(res.data); // sesuai backend: res.data = array periode
    } catch (err) {
      console.error("Failed to fetch periodes:", err);
    }
  };

  const navigate = useNavigate();
  const onOpenDetail = (pengumuman) => {
    const path = `/app/pengumuman/${pengumuman.id}`;
    navigate(path);
  }

  useEffect(() => {
    updateTagOptions();
  }, []);
  useEffect(() => {
    fetchPengumuman();
  }, [page, limit]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pengumuman</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Kelola, tambah, dan lihat detail pengumuman.
          </p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Tambah Pengumuman
        </button>
      </div>

      {/* View Mode */}
      <div className="btn-group mb-2">
        <button
          className={`btn btn-sm ${viewMode === "grid" ? "btn-active" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          <Squares2X2Icon className="w-5 h-5" />
        </button>
        <button
          className={`btn btn-sm ${viewMode === "list" ? "btn-active" : ""}`}
          onClick={() => setViewMode("list")}
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
      </div>

      {/* List/Grid */}
      <div className="h-[calc(100vh-14rem)] overflow-y-auto card bg-base-100 shadow p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pengumumanList.map((item, idx) => (
              <PengumumanCard
                key={idx}
                pengumuman={item}
                onClick={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pengumumanList.map((item, idx) => (
              <PengumumanCard
                key={idx}
                pengumuman={item}
                onClick={onOpenDetail}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Pengumuman</h3>
          <div className="space-y-3 mt-3">
            {/* Judul */}
            <div>
              <label className="label">
                <span className="label-text">Judul</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Tag */}
            <div>
              <label className="label">
                <span className="label-text">Tag</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="">Pilih Tag</option>
                {tagOptions && tagOptions.map((tagOption, idx) => (
                  <option key={idx} value={tagOption.id}>{tagOption.name}</option>
                ))}
              </select>
            </div>

            {/* Isi */}
            <div>
              <label className="label">
                <span className="label-text">Isi Pengumuman</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="label">
                <span className="label-text">Attachment</span>
              </label>
              <AttachmentInputMultiple
                value={attachments}
                onChange={setAttachments}
              />
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Batalkan</button>
            </form>
            <button onClick={handleSave} className="btn btn-primary">
              Simpan
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PengumumanPage;
