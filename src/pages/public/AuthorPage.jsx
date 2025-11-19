import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import ArticleContainer from "../../components/ArticleContainer";
import { useParams } from "react-router-dom";
import apiService from "../../utils/services/apiService";
import { useEffect, useState } from "react";

export default function AuthorPage() {
  const { authorId } = useParams();
  const [dosen, setDosen] = useState(null);
  const [chart, setChart] = useState({});
  const [articles, setArticles] = useState([]);

  const fetchDosenHandler = async () => {
    const result = await apiService.get(`/dosen/${authorId}`);
    if (!dosen) setDosen(result.data);
  };

  const articleHandler = async () => {
    const result = await apiService.get(`/article/dosen/${authorId}`);
    setArticles(result.data);
  };

  const fetchChartHandler = async () => {
    const result = await apiService.get(`/score/dosen/${authorId}`);
    setChart(result.data);
  };

  useEffect(() => {
    fetchDosenHandler();
    fetchChartHandler();
    articleHandler();
  }, []);

  return (
    <div className="content mt-10 lg:max-w-[90vw] mx-auto mt-24">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* KIRI */}
        <div className="flex-1">
          {/* Profil */}
          <div className="card bg-base-100 shadow p-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src={dosen?.pp_url || ""}
              alt={dosen?.name || "Dosen"}
              className="w-32 h-32 object-cover rounded-full border-2 border-primary"
            />
            <a href={"https://sinta.kemdiktisaintek.go.id/authors/profile/"+authorId} target="_blank">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-primary">{dosen?.name}</h1>
                <p className="text-base-content">
                  Institut Sains dan Teknologi Terpadu Surabaya
                </p>
                <p className="text-base-content">{dosen?.program}</p>
                <p className="text-sm text-base-content/70">
                  SINTA ID: {dosen?.sintaId}
                </p>
              </div>
            </a>
          </div>

          {/* Skor */}
          <div className="stats shadow w-full mt-6">
            <div className="stat">
              <div className="stat-figure text-primary text-xl">👤</div>
              <div className="stat-title">SINTA Score Overall</div>
              <div className="stat-value text-primary">
                {dosen?.overall_sinta || 0}
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary text-xl">📊</div>
              <div className="stat-title">SINTA Score 3Yr</div>
              <div className="stat-value text-secondary">
                {dosen?.three_year_score || 0}
              </div>
            </div>
          </div>

          {/* Artikel */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Scopus Articles
            </h2>

            {/* Container grid dengan scroll */}
            <div className="card bg-base-100 shadow p-4 max-h-[540px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-base-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.length > 0 ? (
                  articles.map((article, index) => (
                    <div
                      key={index}
                      className="card bg-base-200 shadow-sm hover:shadow-lg transition p-4"
                    >
                      <div className="card-body p-0">
                        <h3 className="card-title text-base font-bold text-base-content mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-base-content/70 mb-2">
                          {article.venue} ({article.year})
                        </p>
                        <p className="text-sm text-base-content/70">
                          <span className="font-semibold">Cited:</span>{" "}
                          {article.cited || 0}
                        </p>
                        <p className="text-sm text-base-content/70">
                          <span className="font-semibold">Quartile:</span>{" "}
                          {article.quartile || "-"}
                        </p>
                        {article.external_link && (
                          <a
                            href={article.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-2 hover:underline"
                          >
                            View on Scopus →
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-base-content/60">
                    No articles found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          <div className="card bg-base-100 shadow p-4">
            <PieChart label="Article Quartile" pie_data={chart.quartile} />
          </div>
          <div className="card bg-base-100 shadow p-4">
            <PieChart label="Research Output" pie_data={chart.research_output} />
          </div>
        </div>
      </div>

      <hr className="my-8 border-2 border-secondary" />

      {/* Line Chart */}
      <div className="w-full flex flex-wrap justify-center gap-8">
        <div className="card bg-base-100 shadow p-4 w-full md:w-[30%]">
          <LineChart label="Jumlah Publikasi Artikel" line_data={chart.article} />
        </div>
        <div className="card bg-base-100 shadow p-4 w-full md:w-[30%]">
          <LineChart label="Jumlah Research" line_data={chart.research} />
        </div>
        <div className="card bg-base-100 shadow p-4 w-full md:w-[30%]">
          <LineChart label="Jumlah Community Services" line_data={chart.service} />
        </div>
      </div>
    </div>
  );
}
