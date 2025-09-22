import { LinkIcon, PaperClipIcon } from "@heroicons/react/24/outline";

const FileCard = ({ file, viewMode }) => {
  return (
    <div
      className={`card bg-base-100 border border-base-200 shadow-sm ${viewMode === "list" ? "w-full" : ""
        }`}
    >
      <div className="card-body p-3 gap-1">
        {/* Judul */}
        <h2 className="font-semibold text-sm line-clamp-1">{file.title}</h2>

        {/* Tag + Type */}
        <div className="flex items-center gap-2">
          <span className="badge badge-neutral badge-md">{file.tag}</span>
          <span
            className={`badge badge-md ${file.type === "link" ? "badge-accent" : "badge-secondary"
              } flex items-center gap-1`}
          >
            {file.type === "link" ? (
              <LinkIcon className="w-3 h-3" />
            ) : (
              <PaperClipIcon className="w-3 h-3" />
            )}
            {file.type === "link" ? "Link" : "File"}
          </span>
        </div>

        {/* Tanggal */}
        <div className="text-xs text-base-content/50">
          {new Date(file.date).toLocaleDateString()}
        </div>

        {/* Aksi */}
        <div className="card-actions justify-end">
          <a
            href={file.type === "link" ? file.value : URL.createObjectURL(file.value)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-xs btn-outline"
          >
            Akses
          </a>
        </div>
      </div>
    </div>
  );
}
export default FileCard;