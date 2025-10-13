import { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import RadarChart from "../../components/RadarChart";
import apiService from "../../utils/services/apiService";
import ArticleContainer from "../../components/ArticleContainer";
import { Link } from "react-router-dom";

export default function StatisticPage() {
  const [activeTab, setActiveTab] = useState("Articles"); // 🔹 tab aktif
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [affilData,setAffilData] = useState(null)
  // 🔹 Fetch data saat pertama kali atau saat tab berubah
  const fetchStatisticData = async () => {
    try {
      setIsLoading(true);
      // Contoh API endpoint (ganti sesuai backend)
      const response = await apiService.get("/score");
      setChartData(response.data);
    } catch (err) {
      console.error("Failed to fetch statistic data:", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const articleHandler = async () => {
    const result = await apiService.get(`/article`);
    setArticles(result.data);
    const affil = await apiService.get("/score/affiliate")
    setAffilData(affil.data)
    console.log(affil.data);
    
  };

  useEffect(() => {
    fetchStatisticData();
    articleHandler()
  }, [activeTab]);

  // 🔹 Konten berdasarkan tab aktif
  const renderActiveTabContent = () => {
    if (isLoading)
      return (
        <div className="text-center py-12 animate-pulse text-base-content/70">
          Loading data...
        </div>
      );

    switch (activeTab) {
      case "Articles":
        return (
          <>
            <h2 className="text-lg font-bold mb-2">
              Latest number of publications (Articles)
            </h2>
            <LineChart line_data={chartData?.article} label="Articles" />
          </>
        );
      case "Researches":
        return (
          <>
            <h2 className="text-lg font-bold mb-2">Research Publications</h2>
            <LineChart line_data={chartData?.research} label="Researches" />
          </>
        );
      case "Community Services":
        return (
          <>
            <h2 className="text-lg font-bold mb-2">
              Community Service Activities
            </h2>
            <LineChart line_data={chartData?.service} label="Services" />
          </>
        );
      case "IPRs":
        return (
          <>
            <h2 className="text-lg font-bold mb-2">
              Intellectual Property Rights (IPRs)
            </h2>
            <LineChart line_data={chartData?.ipr} label="IPRs" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="content mt-12 max-w-[90vw] mx-auto mt-24">
      {/* === Header === */}
      <div className="bg-base-100 shadow p-6 rounded-lg flex items-center gap-6">
        <img src="/istts.png" alt="Logo" className="w-20 h-20 object-contain" />
        <div>
          <h1 className="text-3xl font-bold text-primary">
            <a
              href="https://sinta.kemdiktisaintek.go.id/affiliations/profile/2136"
              target="_blank"
              rel="noopener noreferrer"
            >
              Institut Sains dan Teknologi Terpadu Surabaya
            </a>
          </h1>
          <p className="text-sm text-gray-600">
            📍 Kota Surabaya - Jawa Timur, ID <br />
            ID : 2136 | Code : 072021
          </p>
        </div>
      </div>

      {/* === Statistik Utama === */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        <Link to={"/authors"}>
          <StatCard title="Authors" value={"55"} />
        </Link>
        <Link to={"/department"}>
        <StatCard title="Departments" value="8" />
        </Link>
        {/* <StatCard title="Journals" value="2" /> */}
        <StatCard title="Sinta Score Overall" value={affilData && affilData.overall_score?affilData.overall_score:"20.092"} />
        <StatCard title="Sinta Score 3Yr" value={affilData && affilData.three_year?affilData.three_year:"9.213"} />
        {/* <StatCard title="Sinta Productivity 3Yr" value="144" /> */}
      </div>

      {/* === Konten Utama === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* KIRI: Chart + Articles */}
        <div className="lg:col-span-2 bg-base-100 shadow rounded-lg p-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 border-b pb-2 mb-4 text-sm font-semibold">
            {["Articles", "Researches", "Community Services", "IPRs"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`transition-all duration-200 ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Konten aktif */}
          <div className="mt-4">{renderActiveTabContent()}</div>

          {/* Articles list (dummy) */}
          {activeTab === "Articles" && (
            <div className="mt-2 flex justify-center mx-auto">
              <ArticleContainer articles={articles}/>
            </div>
          )}
        </div>

        {/* KANAN: Summary */}
        <div className="bg-base-100 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-base-content">Summary</h2>

          <div className="flex flex-col gap-6">
            <div>
              {chartData && <PieChart label="Quartile" pie_data={chartData?.quartile}/>}
            </div>

            <div>
              {chartData && <PieChart label="Research Output" pie_data={chartData?.research_output}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === Komponen kecil untuk card statistik === */
function StatCard({ title, value }) {
  return (
    <div className="bg-base-100 shadow rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
      <span className="text-lg font-semibold text-gray-500">{title}</span>
      <span className="text-2xl font-bold text-primary">{value}</span>
    </div>
  );
}
