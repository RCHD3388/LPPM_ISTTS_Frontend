export default function Article({ article,view}) {
  return (
    <div className="card bg-base-100 shadow-md p-4 hover:shadow-lg transition">
      {/* Judul */}
      <h3 className="text-lg font-bold text-primary mb-1">{article.title}</h3>

      {/* Tahun & Cite */}
      <div className="flex items-center text-sm text-base-content/70 mb-2">
        <span className="mr-4">📅 {article.year}</span>
        <span>📖 {article.cited} citations</span>
      </div>

      {/* Venue */}
      <p className="text-sm mb-2">
        Venue:{" "}
        <a
          href={article.venueLink}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-primary"
        >
          {article.venue}
        </a>
      </p>

      {/* Quartile */}
      {
        view == "scopus" &&
        (<p className="text-sm mb-2">
          Quartile:{" "}
          <span className="badge badge-secondary">{article.quartile}</span>
        </p>)
      }

      {/* External link */}
      <div>
        <a
          href={article.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline btn-primary"
        >
          🔗 View Article
        </a>
      </div>
    </div>
  );
}
