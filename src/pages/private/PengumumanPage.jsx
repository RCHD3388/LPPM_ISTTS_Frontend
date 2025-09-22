import { useRef, useState } from "react";
import { PlusIcon, Squares2X2Icon, Bars3Icon } from "@heroicons/react/24/outline";
import PengumumanCard from "../../components/PengumumanCard";
import AttachmentInputMultiple from "../../components/AttachmentInputMultiple";

function PengumumanPage({ onOpenDetail }) {
  const addModalRef = useRef(null);

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState([]);

  const [viewMode, setViewMode] = useState("grid");
  const [pengumumanList, setPengumumanList] = useState([
    {
      title: "Jadwal Sidang Proposal",
      tag: "Akademik",
      content: "Sidang proposal akan dilaksanakan pada minggu depan...",
      attachments: [
        { type: "link", value: "https://drive.google.com/xxx", date: new Date() },
        { type: "file", value: new File(["dummy"], "jadwal.pdf"), date: new Date() },
      ],
      date: new Date(),
    },
  ]);

  const handleOpenAddModal = () => {
    setTitle("");
    setTag("");
    setContent("");
    setAttachments([]);
    addModalRef.current.showModal();
  };

  const handleSave = () => {
    if (!title.trim() || !tag || !content.trim()) {
      alert("Judul, isi, dan tag wajib diisi!");
      return;
    }
    const payload = {
      title,
      tag,
      content,
      attachments,
      date: new Date(),
    };
    setPengumumanList([...pengumumanList, payload]);
    addModalRef.current.close();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Pengumuman Management</h1>
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
                <option value="Akademik">Akademik</option>
                <option value="Administrasi">Administrasi</option>
                <option value="Umum">Umum</option>
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
              <button className="btn">Cancel</button>
            </form>
            <button onClick={handleSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PengumumanPage;
