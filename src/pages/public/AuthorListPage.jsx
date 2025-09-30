import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthorListPage() {
  const [search, setSearch] = useState("");

  // Dummy data
  const authors = [
    {
      id: 1,
      name: "Dr. Budi Santoso",
      institution: "Institut Sains dan Teknologi Terpadu Surabaya",
      overallSinta: 350,
      threeYearSinta: 120,
      photo: "/avatar.jpg",
    },
    {
      id: 2,
      name: "Prof. Siti Aminah",
      institution: "Institut Teknologi Bandung",
      overallSinta: 480,
      threeYearSinta: 200,
      photo: "/avatar.jpg",
    },
    {
      id: 3,
      name: "Ir. Andi Pratama, M.T.",
      institution: "Universitas Gadjah Mada",
      overallSinta: 275,
      threeYearSinta: 90,
      photo: "/avatar.jpg",
    },
    {
      id: 4,
      name: "Dr. Maria Natalia",
      institution: "Universitas Indonesia",
      overallSinta: 420,
      threeYearSinta: 180,
      photo: "/avatar.jpg",
    },
  ];

  // Filter berdasarkan search
  const filteredAuthors = authors.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.institution.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content mt-12 max-w-[90vw] mx-auto mt-24 h-[80vh]">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Daftar Author
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Cari author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />
      </div>

      {/* List Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuthors.length > 0 ? (
          filteredAuthors.map((author) => (
            <div key={author.id} className="card bg-base-100 shadow-md p-4">
              <div className="flex items-center gap-4">
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold text-base-content">
                    {author.name}
                  </h2>
                  <p className="text-sm text-base-content/70">
                    {author.institution}
                  </p>
                </div>
              </div>

              <div className="stats shadow mt-4 w-full">
                <div className="stat">
                  <div className="stat-title">Overall</div>
                  <div className="stat-value text-primary">
                    {author.overallSinta}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">3 Years</div>
                  <div className="stat-value text-secondary">
                    {author.threeYearSinta}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Link to={`/authors/${author.id}`}>
                  <button className="btn btn-primary btn-sm">
                    Lihat Detail
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Tidak ada author ditemukan
          </p>
        )}
      </div>
    </div>
  );
}
