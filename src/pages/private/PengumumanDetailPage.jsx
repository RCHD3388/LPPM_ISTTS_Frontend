import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

function PengumumanDetailPage({ pengumuman = {
  title: "Jadwal Sidang Proposal",
  tag: "Akademik",
  content: "Sidang proposal akan dilaksanakan pada minggu depan...",
  attachments: [
    { type: "link", value: "https://drive.google.com/xxx", date: new Date() },
    { type: "file", value: new File(["dummy"], "jadwal.pdf"), date: new Date() },
  ],
  date: new Date(),
} }) {

  return (
    <div className="p-6">
      <div className="flex justify-between items-center flex-wrap flex-wrap">
        <button onClick={() => { }} className="btn btn-ghost mb-4">
          <ArrowLeftIcon className="w-5 h-5" /> Kembali
        </button>
        <button onClick={() => { }} className="btn btn-error mb-4">
          <TrashIcon className="w-5 h-5" /> Delete
        </button>
      </div>

      <h1 className="text-2xl font-bold">{pengumuman.title}</h1>
      <div className="flex gap-2 mt-2">
        <div className="badge badge-neutral">{pengumuman.tag}</div>
        <div className="badge badge-outline">{pengumuman.attachments.length} Attachment</div>
      </div>

      <p className="mt-4 text-base">{pengumuman.content}</p>

      <div className="mt-6 space-y-2">
        <h3 className="font-semibold">Attachment:</h3>
        {pengumuman.attachments.map((att, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 border rounded-md">
            {att.type === "file" ? (
              <a
                href={URL.createObjectURL(att.value)}
                download={att.value.name}
                className="link link-primary"
              >
                📄 {att.value.name}
              </a>
            ) : (
              <a href={att.value} target="_blank" rel="noreferrer" className="link link-primary">
                🔗 {att.value}
              </a>
            )}
            <span className="text-xs text-base-content/70">
              {att.date.toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PengumumanDetailPage;
