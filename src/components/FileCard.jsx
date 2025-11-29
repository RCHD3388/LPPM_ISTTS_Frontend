import { LinkIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import {fileApi} from "../utils/services/fileApi";

const FileCard = ({ file, viewMode }) => {

  const accessOnClick = async () => {
    console.log(file)
    if (file.jenis_lampiran === "link") {
      window.open(file.value, '_blank', 'noopener,noreferrer');
    } else if (file.jenis_lampiran === "file") {
      try {
        // ✅ Pakai fileApi, BUKAN apiService
        const response = await fileApi.get(`/download`, {
          params: { id: file.value },
          responseType: 'blob'
        });

        const url = window.URL.createObjectURL(response.data);
        window.open(url, '_blank', 'noopener,noreferrer');

      } catch (error) {
        console.error("Error downloading file:", error);
        alert("Gagal mengakses file. Silakan coba lagi.");
      }
    }
  };

  return (
    <div
      className={`card bg-base-100 border border-base-200 shadow-sm ${viewMode === "list" ? "w-full" : ""
        }`}
    >
      <div className="card-body p-3 gap-1">
        {/* Judul */}
        <h2 className="font-semibold text-sm line-clamp-1">{file.judul}</h2>

        {/* Tag + Type */}
        <div className="flex items-center gap-2">
          <span className="badge badge-neutral badge-md">{file.tag}</span>
          <span
            className={`badge badge-md ${file.jenis_lampiran === "link" ? "badge-accent" : "badge-secondary"
              } flex items-center gap-1`}
          >
            {file.jenis_lampiran === "link" ? (
              <LinkIcon className="w-3 h-3" />
            ) : (
              <PaperClipIcon className="w-3 h-3" />
            )}
            {file.jenis_lampiran === "link" ? "Link" : "File"}
          </span>
        </div>

        {/* Tanggal */}
        <div className="text-xs text-base-content/50">
          {new Date(file.tanggal).toLocaleDateString()}
        </div>

        {/* Aksi */}
        <div className="card-actions justify-end">
          <button
            onClick={accessOnClick}
            className="btn btn-xs btn-outline"
          >
            Akses / Download
          </button>
        </div>
      </div>
    </div>
  );
}
export default FileCard;