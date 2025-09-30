import { Link } from "react-router-dom";

const dummyDepartments = [
  { id: 1, name: "Informatika", authors: 20, sintaScore: 12000 },
  { id: 2, name: "Sistem Informasi", authors: 15, sintaScore: 9500 },
  { id: 3, name: "Teknik Elektro", authors: 10, sintaScore: 8000 },
  { id: 4, name: "Teknik Industri", authors: 8, sintaScore: 6000 },
];

export default function DepartmentListPage() {
  return (
    <div className="content mt-12 max-w-[90vw] mx-auto mt-24 h-[70vh]">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Daftar Departemen
      </h1>

      {/* List Departemen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyDepartments.map((dept) => (
          <Link
            key={dept.id}
            to={`/department/${dept.id}`}
            className="bg-base-100 shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-2">{dept.name}</h2>
            <p className="text-sm text-gray-500">
              Jumlah Author: {dept.authors}
            </p>
            <p className="text-sm text-primary font-semibold">
              Sinta Score: {dept.sintaScore}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
