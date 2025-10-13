import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../utils/services/apiService";



export default function DepartmentListPage() {
  const [dept,setDept] = useState([])

  const deptHandler = async () => {
    const result = await apiService.get("/departement")
    setDept(result.data)
  }
  useEffect(()=>{
    deptHandler()
  },[])

  return (
    <div className="content mt-12 max-w-[90vw] mx-auto mt-24 h-[70vh]">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Daftar Departemen
      </h1>

      {/* List Departemen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dept && dept.map((dept) => (
          <Link
            key={dept.id}
            className="bg-base-100 shadow-md rounded-lg p-6 hover:shadow-lg transition flex items-center"
          >
            <img src="/public/istts.png" alt="" className="w-[5vw] me-5"/>
            <h2 className="text-xl font-bold mb-2">{dept.nama}</h2>
            {/* <p className="text-sm text-gray-500">
              Jumlah Author: {dept.authors}
            </p>
            <p className="text-sm text-primary font-semibold">
              Sinta Score: {dept.sintaScore}
            </p> */}
          </Link>
        ))}
      </div>
    </div>
  );
}
