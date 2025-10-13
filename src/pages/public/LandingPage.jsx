import { useEffect, useState } from "react";
import ArticleContainer from "../../components/ArticleContainer";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import ImageCarousel from "../../layout/public/ImageCarousel";
import Navbar from "../../layout/public/Navbar";
import apiService from '../../utils/services/apiService';


const LandingPage = () => {
  
  const [articles,setArticles] = useState([])
  const [graphData,setGraphData] = useState({})


  const handleArticles = async () => {
    const response = await apiService.get("/article")
    console.log(response.data);
    setArticles(response.data)
  }

  const handleGraph = async () => {
    const response = await apiService.get("/score")
    console.log(response);
    setGraphData(response.data)
  }

  useEffect(()=>{
    handleArticles()
    handleGraph()
  },[])

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
          {/* Jurnal */}
          <div className="mt-10 text-4xl text-center text-primary font-bold">
            Jurnal-jurnal ISTTS
          </div>
         
          <div className="mt-2 flex justify-center mx-auto">
            <ArticleContainer articles={articles}
            />
          </div>
        </div>

        {/* Kolom kanan grafik */}
        <div className="w-[100%] lg:w-[25%] flex flex-wrap lg:flex-col justify-center items-center gap-6 lg:mt-[12vh] lg:bg-primary/30 p-4 rounded-lg mx-2">
        {graphData && 
        [ <LineChart label={"Jumlah Publikasi Artikel"} line_data={graphData.article}/>, 
        <LineChart label={"Jumlah Research"} line_data={graphData.research}/>
        ,<PieChart label={"Chart Kuartil"} pie_data={graphData.quartile}/>].map((ChartComp, idx) => (
          <div
            key={idx}
            className="w-1/2 md:w-1/3 lg:w-full flex justify-center"
          >
            <div className="w-full max-w-xs"> {/* konsistensi ukuran */}
              {ChartComp}
            </div>
          </div>
        ))}
      </div>


      </div>
    </>
  );
};

export default LandingPage;
