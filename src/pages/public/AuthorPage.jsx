import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import ArticleContainer from "../../components/ArticleContainer";

export default function AuthorPage() {
  // Dummy data
  const author = {
    name: "Yosi Kristian",
    institution: "Institut Sains dan Teknologi Terpadu Surabaya",
    program: "S1 - Informatika",
    sintaId: "169786",
    overallSinta: 1192,
    threeYearSinta: 649,
    photo: "/avatar.jpg",
    tags: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Deep Learning"],
  };

  const metrics = {
    scopus: { article: 30, citation: 103, citedDoc: 23, hIndex: 7, i10Index: 3, gIndex: 1 },
    gscholar: { article: 97, citation: 387, citedDoc: 64, hIndex: 11, i10Index: 16, gIndex: 1 },
  };

  return (
    <div className="content mt-25 lg:max-w-[90vw] max-w-[100vw] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Kolom kiri */}
        <div className="flex-1">
          {/* Header */}
          <div className="card bg-base-100 shadow p-6 flex flex-col md:flex-row gap-6">
            <img
              src={author.photo}
              alt={author.name}
              className="w-32 h-32 object-cover rounded-full"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary">{author.name}</h1>
              <p className="text-base-content">{author.institution}</p>
              <p className="text-base-content">{author.program}</p>
              <p className="text-sm text-base-content/70">SINTA ID: {author.sintaId}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {author.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-primary badge-outline">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Score */}
          <div className="stats shadow w-full mt-6">
            <div className="stat">
              <div className="stat-figure text-primary">👤</div>
              <div className="stat-title">SINTA Score Overall</div>
              <div className="stat-value">{author.overallSinta}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">📊</div>
              <div className="stat-title">SINTA Score 3Yr</div>
              <div className="stat-value">{author.threeYearSinta}</div>
            </div>
          </div>
            
            {/* <h2 className="text-lg font-bold mb-2">Summary</h2>
            <table className="table table-sm shadow shadow-sm">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-primary">Scopus</th>
                  <th className="text-secondary">GScholar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Article</td>
                  <td>{metrics.scopus.article}</td>
                  <td>{metrics.gscholar.article}</td>
                </tr>
                <tr>
                  <td>Citation</td>
                  <td>{metrics.scopus.citation}</td>
                  <td>{metrics.gscholar.citation}</td>
                </tr>
                <tr>
                  <td>Cited Document</td>
                  <td>{metrics.scopus.citedDoc}</td>
                  <td>{metrics.gscholar.citedDoc}</td>
                </tr>
                <tr>
                  <td>H-Index</td>
                  <td>{metrics.scopus.hIndex}</td>
                  <td>{metrics.gscholar.hIndex}</td>
                </tr>
                <tr>
                  <td>i10-Index</td>
                  <td>{metrics.scopus.i10Index}</td>
                  <td>{metrics.gscholar.i10Index}</td>
                </tr>
                <tr>
                  <td>G-Index</td>
                  <td>{metrics.scopus.gIndex}</td>
                  <td>{metrics.gscholar.gIndex}</td>
                </tr>
              </tbody>
            </table> */}


          {/* Artikel */}
          <div className="mt-4 me-4">
            <h2 className="text-2xl font-bold text-primary mb-4 ms-4">Articles</h2>
            <ArticleContainer />
          </div>
        </div>

        {/* Kolom kanan */}
        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          {/* Pie Chart */}
          <div className="card bg-base-100 shadow">
            {/* <h2 className="text-lg font-bold mb-2">Article Quartile</h2> */}
            <PieChart />
          </div>

          {/* Line Chart */}
          <div className="card bg-base-100 shadow">
            {/* <h2 className="text-lg font-bold mb-2">Research Output</h2> */}
            <LineChart />
          </div>

          {/* Tabel Ringkasan */}
          <div className="card bg-base-100 shadow p-4 overflow-x-auto">
            <h2 className="text-lg font-bold mb-2">Summary</h2>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-primary">Scopus</th>
                  <th className="text-secondary">GScholar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Article</td>
                  <td>{metrics.scopus.article}</td>
                  <td>{metrics.gscholar.article}</td>
                </tr>
                <tr>
                  <td>Citation</td>
                  <td>{metrics.scopus.citation}</td>
                  <td>{metrics.gscholar.citation}</td>
                </tr>
                <tr>
                  <td>Cited Document</td>
                  <td>{metrics.scopus.citedDoc}</td>
                  <td>{metrics.gscholar.citedDoc}</td>
                </tr>
                <tr>
                  <td>H-Index</td>
                  <td>{metrics.scopus.hIndex}</td>
                  <td>{metrics.gscholar.hIndex}</td>
                </tr>
                <tr>
                  <td>i10-Index</td>
                  <td>{metrics.scopus.i10Index}</td>
                  <td>{metrics.gscholar.i10Index}</td>
                </tr>
                <tr>
                  <td>G-Index</td>
                  <td>{metrics.scopus.gIndex}</td>
                  <td>{metrics.gscholar.gIndex}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}