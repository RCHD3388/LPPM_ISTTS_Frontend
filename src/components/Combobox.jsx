import { useEffect, useState } from "react";
import ComboBoxItem from "./ComboboxItem";
import { useNavigate } from "react-router-dom";

export default function ComboBox({options}) {
    const dummy_options = [
    {
        id: 1,
        nama_dosen: "Dr. Budi Santoso",
        overall_sinta: 350,
        three_year_score: 120,
    },
    {
        id: 2,
        nama_dosen: "Prof. Siti Aminah",
        overall_sinta: 480,
        three_year_score: 200,
    },
    {
        id: 3,
        nama_dosen: "Ir. Andi Pratama, M.T.",
        overall_sinta: 275,
        three_year_score: 90,
    },
    {
        id: 4,
        nama_dosen: "Dr. Maria Natalia",
        overall_sinta: 420,
        three_year_score: 180,
    },
    {
        id: 5,
        nama_dosen: "Prof. Bambang Setiawan",
        overall_sinta: 510,
        three_year_score: 240,
    },
    ];
    options = options?options:dummy_options
  const [query, setQuery] = useState("");
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null);
    useEffect(()=>{
      if(selected){
        navigate("/authors/"+selected.id)
      }
    },[selected])

    const filteredOptions = options.filter((opt) =>
    opt.nama_dosen.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div className="w-full">
      <div className="dropdown w-full">
        {/* Input utama */}
        <div tabIndex={0} className="form-control w-full">
          <input
            type="text"
            placeholder="Search Author"
            value={selected ? selected.nama_dosen : query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
            }}
            className="input input-bordered w-full text-base-content"
          />
        </div>

        {/* Dropdown list */}
        <ul
        tabIndex={0}
        className="dropdown-content z-[1] bg-base-100 rounded-box w-full mt-1 shadow max-h-60 overflow-auto flex flex-col divide-y divide-base-200"
        >
        {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
            <ComboBoxItem
                key={opt.id}
                option={opt}
                onSelect={(val) => {
                setSelected(val);
                setQuery("");
                }}
            />
            ))
        ) : (
            <li className="p-2 text-center text-base-content/50">No results found</li>
        )}
        </ul>
      </div>
    </div>
  );
}
