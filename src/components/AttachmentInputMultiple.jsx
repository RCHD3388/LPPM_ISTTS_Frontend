import { useState } from "react";

function AttachmentInputMultiple({ value = [], onChange }) {
  const [type, setType] = useState("file"); // "file" | "link"
  const [link, setLink] = useState("");

  const handleAdd = (item) => {
    onChange([...value, item]);
  };

  const handleRemove = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <select
          className="select select-bordered select-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="file">File</option>
          <option value="link">Link</option>
        </select>

        {type === "file" ? (
          <input
            type="file"
            className="file-input file-input-bordered file-input-sm w-full"
            onChange={(e) => {
              if (e.target.files[0]) {
                handleAdd({
                  type: "file",
                  value: e.target.files[0],
                  date: new Date(),
                });
              }
            }}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Masukkan link"
              className="input input-bordered input-sm w-full"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => {
                if (link.trim()) {
                  handleAdd({
                    type: "link",
                    value: link,
                    date: new Date(),
                  });
                  setLink("");
                }
              }}
            >
              Tambah
            </button>
          </>
        )}
      </div>

      {/* List attachment */}
      <div className="flex flex-col gap-1">
        {value.map((att, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center text-sm p-2 border rounded-md"
          >
            <span>
              {att.type === "file" ? att.value.name : att.value}
            </span>
            <button
              className="btn btn-xs btn-error"
              onClick={() => handleRemove(idx)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttachmentInputMultiple;
