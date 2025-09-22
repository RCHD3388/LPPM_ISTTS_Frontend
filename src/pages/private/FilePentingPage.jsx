import { useRef, useState } from "react";
import {
  PlusIcon,
  Squares2X2Icon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import AttachmentInput from "../../components/AttachmentInput";
import FileCard from "../../components/FileCard";

function FilePentingPage() {
  const addModalRef = useRef(null);

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleOpenAddModal = () => {
    setTitle("");
    setTag("");
    setAttachment(null);
    addModalRef.current.showModal();
  };

  const handleSaveFile = () => {
    if (!title.trim() || !tag || !attachment) {
      alert("Semua field wajib diisi!");
      return;
    }

    const payload = {
      title,
      tag,
      attachment,
      date: new Date(),
    };

    console.log("File Penting baru:", payload);
    addModalRef.current.close();
  };


  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [files] = useState([
    {
      title: "Panduan Proposal",
      tag: "Proposal",
      type: "link",
      value: "https://drive.google.com/xxxxx",
      date: new Date(),
    },
    {
      title: "Laporan Akhir",
      tag: "Laporan",
      type: "file",
      value: new File(["dummy"], "laporan.pdf"),
      date: new Date(),
    },
    {
      title: "Panduan Proposal",
      tag: "Proposal",
      type: "link",
      value: "https://drive.google.com/xxxxx",
      date: new Date(),
    },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">File Penting Management</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Kelola, tambah, dan perbarui data file penting yang tersedia.
          </p>
        </div>
        {/* Add New */}
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Add New File Penting
        </button>

      </div>

      {/* View Mode Switcher */}
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

      {/* Daftar File Penting */}
      <div className="h-[calc(100vh-14rem)] overflow-y-auto card bg-base-100 shadow-lg p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((file, idx) => (
              <FileCard key={idx} file={file} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {files.map((file, idx) => (
              <FileCard key={idx} file={file} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>

      {/* Modal Add File Penting */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New File Penting</h3>
          <div className="space-y-3 mt-3">
            {/* Title */}
            <div>
              <label className="label">
                <span className="label-text">Judul File</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Panduan Proposal"
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
                <option value="Proposal">Proposal</option>
                <option value="Laporan">Laporan</option>
                <option value="Dosen">Dosen</option>
              </select>
            </div>

            {/* Attachment */}
            <div>
              <label className="label">
                <span className="label-text">Attachment</span>
              </label>
              <AttachmentInput value={attachment} onChange={setAttachment} />
            </div>
          </div>

          {/* Action */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button onClick={handleSaveFile} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default FilePentingPage;