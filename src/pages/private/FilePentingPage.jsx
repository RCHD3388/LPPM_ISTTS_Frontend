import { useRef, useState } from "react";
import {
  PlusIcon,
  Squares2X2Icon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import AttachmentInput from "../../components/AttachmentInput";
import FileCard from "../../components/FileCard";
import apiService from "../../utils/services/apiService";
import { useEffect } from "react";

function FilePentingPage() {
  const addModalRef = useRef(null);

  const [tagOptions, setTagOptions] = useState([]);
  const [postTitleError, setPostTitleError] = useState("");
  const [postTagError, setPostTagError] = useState("");
  const [postAttachmentError, setPostAttachmentError] = useState("");

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [attachment, setAttachment] = useState(null);

  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [files, setFiles] = useState([]);

  const handleOpenAddModal = () => {
    setTitle("");
    setTag("");
    setAttachment(null);
    addModalRef.current.showModal();
  };

  const updateTagOptions = async () => {
    try {
      const response = await apiService.get("/tag", { status: "1" });
      setTagOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveFile = async () => {

    setPostTitleError("")
    setPostTagError("")
    setPostAttachmentError("")

    if (!title.trim()) {
      setPostTitleError("Title cannot be empty!");
      return;
    }
    if (!tag) {
      setPostTagError("Tag must be selected!");
      return;
    }
    if (!attachment) {
      setPostAttachmentError("Attachment must be provided!");
      return;
    }

    const formData = new FormData();
    
    formData.append("title", title);
    formData.append("tag", tag);
    formData.append("type", attachment.type);
    if(attachment.type === "file"){
      formData.append("file", attachment.file);
    }else if(attachment.type === "link"){
      formData.append("link", attachment.url);
    }

    let response = await apiService.post("/filepenting", formData)

    const newData = {
      title: response.data.title,
      tag: response.data.tag,
      type: response.data.type,
      value: response.data.value,
      date: new Date(),
    }
    setFiles((prev) => [newData, ...prev])

    handleOpenAddModal();
    addModalRef.current.close();
  };

  useEffect(() => {
    updateTagOptions();
  }, []);

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
              {postTitleError && (
                <span className="text-error text-sm">{postTitleError}</span>
              )}
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
              {postTagError && (
                <span className="text-error text-sm">{postTagError}</span>
              )}
            </div>

            {/* Attachment */}
            <div>
              <label className="label">
                <span className="label-text">Attachment</span>
              </label>
              <AttachmentInput value={attachment} onChange={setAttachment} />
              {postAttachmentError && (
                <span className="text-error text-sm">{postAttachmentError}</span>
              )}
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