import React from "react";

function LaporanList({ laporanList, userRole, onSelectLaporan, onUploadLaporan }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {laporanList.map((laporan) => (
        <div
          key={laporan.id}
          className="card bg-base-100 shadow-md border hover:shadow-lg transition cursor-pointer"
          onClick={() => onSelectLaporan(laporan)}
        >
          <div className="card-body p-4">
            <h3 className="font-semibold text-lg">
              {laporan.proposal.title}
            </h3>
            <p className="text-sm text-base-content/70">
              {laporan.proposal.jenis} • {laporan.proposal.periode}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="badge badge-neutral">{laporan.proposal.tag}</span>
              <span
                className={`badge ${
                  laporan.status === "Disetujui"
                    ? "badge-success"
                    : laporan.status === "Ditolak"
                    ? "badge-error"
                    : "badge-warning"
                }`}
              >
                {laporan.status}
              </span>
            </div>

            {userRole === "dosen" && laporan.status === "Belum Upload" && (
              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUploadLaporan(laporan.proposal);
                  }}
                >
                  Upload Laporan
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LaporanList;
