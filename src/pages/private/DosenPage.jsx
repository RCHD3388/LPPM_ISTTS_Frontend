// src/pages/DosenPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import apiService from '../../utils/services/apiService';
import { useToast } from '../../context/ToastContext';
import PaginationController from '../../components/PaginationController';

function DosenPage() {
  const { addToast } = useToast()

  const [dosens, setDosens] = useState([
    {
      "kode_dosen": "GLD001",
      "nama_dosen": "Grace Levina Dewi, S.Kom., M.Kom.",
      "id_sinta": "6781234",
      "nama_bank": "BCA",
      "no_rek": "1234567890",
      "nama_rekening": "Grace L Dewi"
    },
    {
      "kode_dosen": "GNW002",
      "nama_dosen": "Prof. Dr. Ir. Gunawan, M.Kom.",
      "id_sinta": "1234567",
      "nama_bank": "Mandiri",
      "no_rek": "9876543210",
      "nama_rekening": "Gunawan P"
    },
    {
      "kode_dosen": "HPS003",
      "nama_dosen": "Hari Purwo Susilo, S.Pd.K.",
      "id_sinta": "5432109",
      "nama_bank": "BRI",
      "no_rek": "5678901234",
      "nama_rekening": "Hari P Susilo"
    },
    {
      "kode_dosen": "HJ004",
      "nama_dosen": "Dr. Ir. Hartarto Junaedi, S.Kom., M.Kom., IPM., ASEAN Eng.",
      "id_sinta": "7890123",
      "nama_bank": "BNI",
      "no_rek": "3456789012",
      "nama_rekening": "Hartarto Junaedi"
    },
    {
      "kode_dosen": "HA005",
      "nama_dosen": "Hendrawan Armanto, S.Kom., M.Kom.",
      "id_sinta": "8765432",
      "nama_bank": "BCA",
      "no_rek": "2109876543",
      "nama_rekening": "Hendrawan A"
    },
    {
      "kode_dosen": "HB006",
      "nama_dosen": "Dr. Ir. Herman Budianto, M.M.",
      "id_sinta": "2345678",
      "nama_bank": "Mandiri",
      "no_rek": "4321098765",
      "nama_rekening": "Herman Budianto"
    },
    {
      "kode_dosen": "HTS007",
      "nama_dosen": "Herman Thuan To Saurik, S.Kom., M.T.",
      "id_sinta": "9012345",
      "nama_bank": "BRI",
      "no_rek": "6543210987",
      "nama_rekening": "Herman T S"
    },
    {
      "kode_dosen": "IGASD008",
      "nama_dosen": "I Gusti Ayu Sri Deviyanti, S.T., M.T.",
      "id_sinta": "3456789",
      "nama_bank": "BNI",
      "no_rek": "8765432109",
      "nama_rekening": "I G A Sri Deviyanti"
    },
    {
      "kode_dosen": "IC009",
      "nama_dosen": "Ir. Iwan Chandra, S.Kom., M.Kom.",
      "id_sinta": "0123456",
      "nama_bank": "BCA",
      "no_rek": "0987654321",
      "nama_rekening": "Iwan Chandra"
    },
    {
      "kode_dosen": "JN010",
      "nama_dosen": "Dr. Jenny Ngo, M.Sc.Ed.",
      "id_sinta": "4567890",
      "nama_bank": "Mandiri",
      "no_rek": "1029384756",
      "nama_rekening": "Jenny Ngo"
    },
    {
      "kode_dosen": "JS011",
      "nama_dosen": "Dr. Ir. Joan Santoso, S.Kom., M.Kom.",
      "id_sinta": "5678901",
      "nama_bank": "BRI",
      "no_rek": "2938475610",
      "nama_rekening": "Joan Santoso"
    },
    {
      "kode_dosen": "JPS012",
      "nama_dosen": "Ir. Judi Prajetno Sugiono, M.M.",
      "id_sinta": "6789012",
      "nama_bank": "BNI",
      "no_rek": "3847561029",
      "nama_rekening": "Judi P Sugiono"
    },
    {
      "kode_dosen": "KL013",
      "nama_dosen": "Kelvin, S.T., M.M.",
      "id_sinta": "7890123",
      "nama_bank": "BCA",
      "no_rek": "4756102938",
      "nama_rekening": "Kelvin"
    },
    {
      "kode_dosen": "KS014",
      "nama_dosen": "Kevin Setiono, S.Kom., M.Kom.",
      "id_sinta": "8901234",
      "nama_bank": "Mandiri",
      "no_rek": "5610293847",
      "nama_rekening": "Kevin Setiono"
    },
    {
      "kode_dosen": "KG015",
      "nama_dosen": "Ir. Khinardi Gunawan",
      "id_sinta": "9012345",
      "nama_bank": "BRI",
      "no_rek": "6102938475",
      "nama_rekening": "Khinardi G"
    },
    {
      "kode_dosen": "LKH016",
      "nama_dosen": "Listiana Kusuma Handaru, S.S., M.Pd.",
      "id_sinta": "0123456",
      "nama_bank": "BNI",
      "no_rek": "7102938475",
      "nama_rekening": "Listiana K H"
    },
    {
      "kode_dosen": "LZ017",
      "nama_dosen": "Dr. Lukman Zaman PCSW, S.Kom., M.Kom.",
      "id_sinta": "1234567",
      "nama_bank": "BCA",
      "no_rek": "8102938475",
      "nama_rekening": "Lukman Zaman"
    },
    {
      "kode_dosen": "HS018",
      "nama_dosen": "Dr. H.M.Sholihin Fanani, S.Ag., M.PSDM.",
      "id_sinta": "2345678",
      "nama_bank": "Mandiri",
      "no_rek": "9102938475",
      "nama_rekening": "H M Sholihin F"
    },
    {
      "kode_dosen": "MRDYH019",
      "nama_dosen": "Mas Rara Dwi Yanti HandayaniI, S.Pd., M.M.",
      "id_sinta": "3456789",
      "nama_bank": "BRI",
      "no_rek": "0129384756",
      "nama_rekening": "Mas Rara DYH"
    },
    {
      "kode_dosen": "ML020",
      "nama_dosen": "Mattew Lawrenta, S.T.",
      "id_sinta": "4567890",
      "nama_bank": "BNI",
      "no_rek": "1129384756",
      "nama_rekening": "Mattew Lawrenta"
    }
  ]);
  const [currentDosen, setCurrentDosen] = useState(null);
  const [newDosenName, setNewDosenName] = useState('');
  const [newDosenCode, setNewDosenCode] = useState('');
  const [newDosenIdSinta, setNewDosenIdSinta] = useState('');
  const [newDosenBank, setNewDosenBank] = useState('');
  const [newDosenNoRek, setNewDosenNoRek] = useState('');
  const [newDosenNamaRek, setNewDosenNamaRek] = useState('');

  const [postError, setPostError] = useState("")

  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const confirmModalRef = useRef(null);

  // paginate & search state
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);           // currentPage
  const [limit, setLimit] = useState(10);        // pageSize
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const [bankList, setBankList] = useState([{id: 1, name: 'BNI'}, {id: 2, name: 'BCA'}, {id: 3, name: 'Mandiri'}, {id: 4, name: 'BRI'}]);


  const handleOpenAddModal = () => {
    setNewDosenName('');
    addModalRef.current.showModal();
  };

  const handleOpenEditModal = (dosen) => {
    setCurrentDosen(dosen);
    editModalRef.current.showModal();
  };

  const handleOpenConfirmModal = (dosen) => {
    setCurrentDosen(dosen);
    confirmModalRef.current.showModal();
  };

  const handleAddNewDosen = async () => {
    if (newDosenName.trim() === '') {
      setPostError("Dosen name cannot be empty")
      return;
    }

    try {
      const response = await apiService.post("/dosen", { name: newDosenName });
      setDosens([...dosens, response.data]);
      addModalRef.current.close();
      addToast("Dosen added successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to add dosen"
      addModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleEditDosen = async () => {
    if (!currentDosen || currentDosen.name.trim() === '') {
      setPostError("Dosen name cannot be empty")
      return;
    };

    try {
      const response = await apiService.put(`/dosen/${currentDosen.id}`, { name: currentDosen.name, status: currentDosen.status });
      setDosens(dosens.map(dosen => (dosen.id === currentDosen.id ? currentDosen : dosen)));
      editModalRef.current.close();
      addToast("Dosen updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update dosen"
      editModalRef.current.close();
      addToast(message, "error")
    }
  };

  const handleToggleStatus = async () => {
    if (!currentDosen) {
      addToast("Dosen not found", "error")
      return;
    };

    const updatedStatus = currentDosen.status === '1' ? '0' : '1';

    try {
      const response = await apiService.put(`/dosen/${currentDosen.id}`, { name: currentDosen.name, status: updatedStatus });
      setDosens(dosens.map(dosen => (dosen.name === currentDosen.name ? { ...dosen, status: updatedStatus } : dosen)));
      confirmModalRef.current.close();
      addToast("Dosen updated successfully", "success")
    } catch (error) {
      let message = error?.response?.data?.message || "Failed to update dosen"
      confirmModalRef.current.close();
      addToast(message, "error")
    }
  };

  const fetchDosens = async () => {
    try {
      console.log(page, limit, searchQuery)
      const res = await apiService.get("/dosen", {
        page,
        limit,
        search: searchQuery || "",
      });

      setTotalItems(res.meta.totalItems);
      setTotalPages(res.meta.totalPages);
      setHasNextPage(res.meta.hasNextPage);
      setHasPreviousPage(res.meta.hasPreviousPage);

      setDosens(res.data); // sesuai backend: res.data = array dosen
    } catch (err) {
      console.error("Failed to fetch dosens:", err);
    }
  };

  useEffect(() => {

    fetchDosens();
  }, [page, limit]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Data Dosen</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Pengolahan data dosen pada lembaga LPPM ISTTS saat ini
          </p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Tambah Dosen Baru
        </button>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            {/* Search */}
            <div className="flex">
              <input
                type="text"
                placeholder="Search dosen..."
                className="input input-bordered w-full max-w-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary ml-2" onClick={() => { setPage(1); fetchDosens(); }}>
                Search
              </button>
            </div>

            {/* PaginationController di atas table */}
            <PaginationController
              page={page}
              limit={limit}
              totalItems={totalItems}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              onPageChange={(newPage) => {
                setPage(newPage);
                fetchDosens();
              }}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1); // reset ke page 1
                fetchDosens();
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <div className="max-h-[34rem] overflow-y-auto">
              <table className="table table-zebra">
                <thead className='sticky top-0 bg-base-200'>
                  <tr>
                    <th>#</th>
                    <th>Kode Dosen</th>
                    <th>Nama Dosen</th>
                    <th>ID SINTA</th>
                    <th>Nama Bank</th>
                    <th>Rekening</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dosens && dosens.map((dosen, index) => (
                    <tr key={dosen.name}>
                      <th>{index + 1}</th>
                      <td>{dosen.kode_dosen}</td>
                      <td>{dosen.nama_dosen}</td>
                      <td>{dosen.id_sinta}</td>
                      <td>{dosen.nama_bank}</td>
                      <td>{dosen.no_rek} An {dosen.nama_rekening}</td>
                      <td className="text-center">
                        {/* --- PERUBAHAN UTAMA: Tombol dengan Lebar Tetap --- */}
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleOpenConfirmModal(dosen)} className="btn btn-sm btn-error btn-outline w-32 justify-start">
                            <TrashIcon className="w-4 h-4 mr-2" />
                            <span>Delete Data</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- Semua Modal Tetap Sama --- */}
      {/* --- Modal Add New Dosen --- */}
      <dialog ref={addModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Dosen Baru</h3>
          <div className="py-4">
            <label className="label"><span className="label-text">Nama Dosen</span></label>
            <input type="text" placeholder="e.g., Hendrawan Armanto, S.Kom., M.Kom." className="input input-bordered w-full" value={newDosenName} onChange={(e) => setNewDosenName(e.target.value)} />
      
          </div>
          <div className="flex gap-2 mb-2">
            <div className='w-1/2'>
              <label className="label"><span className="label-text">Dosen Code</span></label>
              <input type="text" placeholder="e.g., HA001" className="input input-bordered w-full" value={newDosenCode} onChange={(e) => setNewDosenCode(e.target.value)} />
        
            </div>
            <div className='w-1/2'>
              <label className="label"><span className="label-text">SINTA ID</span></label>
              <input type="text" placeholder="e.g., 7382641" className="input input-bordered w-full" value={newDosenIdSinta} onChange={(e) => setNewDosenIdSinta(e.target.value)} />
        
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className='w-1/2'>
              <label className="label"><span className="label-text">Nama Bank</span></label>
              <select className="select select-bordered w-full" 
                value={newDosenBank.name} 
                onChange={(e) => setNewDosenBank(e.target.value)} 
              >
                <option value="">Pilih Bank</option>
                {bankList.map((bank, index) => (
                  <option key={index} value={bank.name}>{bank.name}</option>
                ))}
              </select>
        
            </div>
            <div className='w-1/2'>
              <label className="label"><span className="label-text">No Rekening</span></label>
              <input type="text" placeholder="e.g., 7382641" className="input input-bordered w-full" value={newDosenNoRek} onChange={(e) => setNewDosenNoRek(e.target.value)} />
        
            </div>
          </div>
          <div className="">
            <label className="label"><span className="label-text">Nama Rekening</span></label>
            <input type="text" placeholder="e.g., Hendrawan Armanto" className="input input-bordered w-full" value={newDosenNamaRek} onChange={(e) => setNewDosenNamaRek(e.target.value)} />
      
          </div>

          <div className="modal-action">
            <form method="dialog"><button className="btn">Batalkan</button></form>
            <button onClick={handleAddNewDosen} className="btn btn-primary ml-2">Simpan Dosen</button>
          </div>
        </div>
      </dialog>

      {/* --- Modal Konfirmasi --- */}
      <dialog ref={confirmModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konfirmasi</h3>
          <p className="py-4">
            Apakah anda yakin untuk menghapus data dosen <span className="font-semibold">"{currentDosen?.nama_dosen}"</span>?
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Batalkan</button></form>
            <button onClick={handleToggleStatus} className={`btn btn-error ml-2`}>
              Konfirmasi
            </button>
          </div>
        </div>
      </dialog>
    </div>


  );
}

export default DosenPage;