// src/components/AttachmentInput.jsx
import { useState } from "react";
import { LinkIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";

function AttachmentInput({ value, value_type = null, onChange }) {
  const [type, setType] = useState(value_type || null);

  const handleLinkChange = (e) => {
    onChange({ type: "link", url: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ type: "file", file });
    }
  };

  const handleRemove = () => {
    setType(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      {/* Selector Type */}
      {!type && (
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline flex items-center gap-1"
            onClick={() => setType("link")}
          >
            <LinkIcon className="w-4 h-4" /> Add Link
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline flex items-center gap-1"
            onClick={() => setType("file")}
          >
            <PaperClipIcon className="w-4 h-4" /> Upload File
          </button>
        </div>
      )}

      {/* Link Input */}
      {type === "link" && (
        <div className="flex items-center gap-2">
          <input
            type="url"
            placeholder="https://drive.google.com/..."
            className="input input-bordered input-sm w-full"
            value={value?.url || ""}
            onChange={handleLinkChange}
          />
          <button type="button" onClick={handleRemove} className="btn btn-ghost btn-sm">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* File Input */}
      {type === "file" && (
        <div className="flex items-center gap-2">
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm w-full"
            onChange={handleFileChange}
          />

          {value_type == null && <button type="button" onClick={handleRemove} className="btn btn-ghost btn-sm">
            <XMarkIcon className="w-5 h-5" />
          </button>}
        </div>
      )}
    </div>
  );
}

export default AttachmentInput;
