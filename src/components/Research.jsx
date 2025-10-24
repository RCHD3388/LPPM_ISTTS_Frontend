export default function Research({ research }) {
  const personils = Array.isArray(research.personils)
    ? research.personils
    : (() => {
        try {
          return JSON.parse(research.personils || "[]");
        } catch {
          return [];
        }
      })();

  return (
    <div className="card bg-base-100 shadow-md p-4 hover:shadow-lg transition-all duration-200">
      {/* Judul */}
      <h3 className="text-lg font-bold text-primary mb-1">
        {research.title}
      </h3>

      {/* Leader & Tahun */}
      <div className="flex flex-wrap items-center text-sm text-base-content/70 mb-2">
        <span className="mr-4">👤 Leader: {research.leader || "-"}</span>
        <span>📅 {research.year || "N/A"}</span>
      </div>

      {/* Funding */}
      <p className="text-sm mb-2">
        💰 Funding:{" "}
        <span className="font-medium text-secondary">
          {research.funding || "-"}
        </span>
      </p>

      {/* Nominal */}
      {research.nominal && (
        <p className="text-sm mb-2">
          💸 Nominal: Rp{" "}
          <span className="font-semibold text-success">
            {research.nominal}
          </span>
        </p>
      )}

      {/* Personils */}
      <div className="text-sm mb-3">
        👥 Personils:{" "}
        {personils.length > 0 ? (
          <span>
            {personils.map((p, i) => (
              <span key={i}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="#"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
                {i < personils.length - 1 && "; "}
              </span>
            ))}
          </span>
        ) : (
          <span>-</span>
        )}
      </div>

      {/* Tombol / Aksi */}
      {research.url && (
        <div>
          <a
            href={research.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-primary"
          >
            🔗 View Detail
          </a>
        </div>
      )}
    </div>
  );
}
