import { useEffect, useState } from "react";
import ArticleContainer from "../../components/ArticleContainer";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import ImageCarousel from "../../layout/public/ImageCarousel";
import Navbar from "../../layout/public/Navbar";
import apiService from '../../utils/services/apiService';
import PengumumanList from "../../components/PengumumanList";


const LandingPage = () => {
  
  const [graphData,setGraphData] = useState({})
  const [affilData,setAffilData] = useState(null)
  const [totalPublication,setTotalPublication]= useState([])

  const handleGraph = async () => {
    const response = await apiService.get("/score")
    console.log(response);
    setGraphData(response.data)
    const affil = await apiService.get("/score/affiliate")
    setAffilData(affil.data)
    sumPublicationByYear({
      scopus:response.data.scopus,
      scholar:response.data.scholar,
      garuda:response.data.garuda
    })
  }


  function sumPublicationByYear(sources) {
      const totalMap = new Map();

      // Loop setiap sumber (scopus, garuda, scholar)
      for (const [type, dataArr] of Object.entries(sources)) {
        if (!Array.isArray(dataArr)) continue;
        for (const item of dataArr) {
          const year = String(item.year);
          const val = Number(item.value) || 0;
          totalMap.set(year, (totalMap.get(year) || 0) + val);
        }
      }

      // Konversi ke array dan urutkan berdasarkan tahun
      const result = Array.from(totalMap.entries())
        .map(([year, value]) => ({ year, value }))
        .sort((a, b) => Number(a.year) - Number(b.year));

      setTotalPublication(result)
    }

  useEffect(()=>{
    handleGraph()
  },[])

  function StatCard({ title, value }) {
  return (
    <div className="bg-base-100 shadow rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
      <span className="text-lg font-semibold text-gray-500">{title}</span>
      <span className="text-2xl font-bold text-primary">{value}</span>
    </div>
  );
}
  return (
    <>
      <div className="content flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Kolom kiri */}
        <div className="w-full lg:w-[75%]">
          <ImageCarousel
            images={["/istts.jpg", "/istts2.jpg"]}
            intervalMs={3500}
            placeholderText="Academic Excellence in Science and Technology"
            heightClass="h-[35vh]"
          />
          {/* Jurnal
          <div className="mt-10 text-4xl text-center text-primary font-bold">
            Jurnal-jurnal ISTTS
          </div>
         
          <div className="mt-2 flex justify-center mx-auto">
            <ArticleContainer articles={articles}
            />
          </div> */}
          <div className="m-5 border-1 border-black rounded-md">
            <PengumumanList />

          </div>
        </div>
            
        {/* Kolom kanan grafik */}
        <div className="w-[100%] h-[91vh] lg:w-[25%] flex lg:flex-col items-center gap-6 lg:mt-[12vh] lg:bg-primary/30 px-4 py-10 rounded-lg mx-2">
          <div className="grid grid-cols-2 gap-4">
              <StatCard title="SINTA Score" value={affilData && affilData.overall_score?affilData.overall_score:"20.092"} />
              <StatCard title="SINTA 3Year" value={affilData && affilData.three_year?affilData.three_year:"9.213"} />
         </div>
        {graphData && 
        [ <LineChart label={"Jumlah Publikasi"} line_data={totalPublication}/>, 
        <LineChart label={"Jumlah Research"} line_data={graphData.research}/>
        ].map((ChartComp, idx) => (
          <div
            key={idx}
            className="w-1/2 md:w-1/3 lg:w-full flex justify-center"
          >
            <div className="w-full max-w-xs"> {/* konsistensi ukuran */}</div>
              {ChartComp}
            </div>
        ))}
      </div>


      </div>
    </>
  );
};

export default LandingPage;
