import dayjs from "dayjs";

function LaporanCard({ laporan, proposal, onClick = () => { } }) {

  return (
    <div
      key={laporan.id}
      className="card bg-base-100 shadow-sm border hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{proposal.title}</h3>
          <span
            className={`badge ${laporan.status === "Menunggu"
              ? "badge-warning"
              : laporan.status === "Ditolak"
                ? "badge-error"
                : "badge-success"
              }`}
          >
            {laporan.status}
          </span>
        </div>
        <p className="text-sm text-base-content/70">
          {proposal.jenis} • {proposal.periode}
        </p>
        <p className="text-xs mt-1">
          {dayjs(laporan.tanggal).format("DD MMM YYYY")}
        </p>
      </div>
    </div>
  );
}

export default LaporanCard;
