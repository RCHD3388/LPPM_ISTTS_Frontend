import { ArrowRightIcon } from "@heroicons/react/24/outline";

function PengumumanCard({ pengumuman, onClick }) {
  return (
    <div
      className="card bg-base-100 shadow-sm hover:shadow-md cursor-pointer transition"
      onClick={() => onClick(pengumuman)}
    >
      <div className="card-body p-4">
        <h2 className="card-title text-base">{pengumuman.title}</h2>
        <p className="line-clamp-2 text-sm text-base-content/70">
          {pengumuman.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="badge badge-neutral">{pengumuman.tag}</div>
          <div className="badge badge-outline">
            {pengumuman.attachments.length} Attachment
          </div>
        </div>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-xs btn-outline">
            Detail <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PengumumanCard;
