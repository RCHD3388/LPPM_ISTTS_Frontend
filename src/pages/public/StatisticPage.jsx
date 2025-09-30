import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import RadarChart from "../../components/RadarChart";

export default function StatisticPage() {
  return (
    <div className="content mt-12 max-w-[90vw] mx-auto mt-24">
      {/* Header */}
      <div className="bg-base-100 shadow p-6 rounded-lg flex items-center gap-6">
        <img
          src="/istts.png"
          alt="Logo"
          className="w-20 h-20 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Institut Sains dan Teknologi Terpadu Surabaya
          </h1>
          <p className="text-sm text-gray-600">
            📍 Kota Surabaya - Jawa Timur, ID <br />
            ID : 2136 | Code : 072021
          </p>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        <StatCard title="Authors" value="55" />
        <StatCard title="Departments" value="8" />
        <StatCard title="Journals" value="2" />
        <StatCard title="Sinta Score Overall" value="20.092" />
        <StatCard title="Sinta Score 3Yr" value="9.213" />
        <StatCard title="Sinta Productivity 3Yr" value="144" />
      </div>

      {/* Konten utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Kiri: Chart + Articles */}
        <div className="lg:col-span-2 bg-base-100 shadow rounded-lg p-6">
          {/* Tabs */}
          <div className="flex gap-6 border-b pb-2 mb-4 text-sm font-semibold text-gray-600">
            <button className="text-primary border-b-2 border-primary">
              Articles
            </button>
            <button>Researches</button>
            <button>Community Services</button>
            <button>IPRs</button>
            {/* <button>Books</button> */}
            {/* <button>Networks</button> */}
          </div>

          {/* Line Chart */}
          <h2 className="text-lg font-bold mb-2">Latest number of publications</h2>
          <LineChart />

          {/* Articles list (dummy) */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Scopus</h3>
            <div className="p-4 border rounded-md shadow-sm">
              <p className="font-semibold">
                Retrieval Augmented Generation-Based Chatbot for Prospective and
                Current University Students
              </p>
              <p className="text-sm text-gray-600">
                no-Q Journal | International Journal of Engineering Science and
                Information Technology
              </p>
              <p className="text-xs text-gray-500">Creator: Hartono L.S.</p>
            </div>
          </div>
        </div>

        {/* Kanan: Summary */}
        <div className="bg-base-100 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Summary</h2>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold mb-2">Scopus Documents Quartile</h3>
              <PieChart />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Scopus Research Output</h3>
              <RadarChart />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Metrics</h3>
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-orange-600">Scopus</th>
                    <th className="text-green-600">GScholar</th>
                    <th className="text-red-600">Garuda</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Documents</td>
                    <td>159</td>
                    <td>1.210</td>
                    <td>395</td>
                  </tr>
                  <tr>
                    <td>Citation</td>
                    <td>712</td>
                    <td>4.886</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Cited Document</td>
                    <td>111</td>
                    <td>623</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Citation / Researcher</td>
                    <td>10,47</td>
                    <td>71,85</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                Last update: 2025-09-16 12:33:03
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Komponen kecil untuk card statistik */
function StatCard({ title, value }) {
  return (
    <div className="bg-base-100 shadow rounded-lg p-4 flex flex-col items-center">
      <span className="text-lg font-semibold text-gray-500">{title}</span>
      <span className="text-2xl font-bold text-primary">{value}</span>
    </div>
  );
}
