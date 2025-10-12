import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../utils/services/apiService";
import fileApi from "../../utils/services/fileApi";

const PengumumanDetailPage = () => {
  const [pengumuman, setPengumuman] = useState(null);
  const { pengumumanId } = useParams()
  const deleteModalRef = useRef(null);

  const fetchData = async () => {
    try {
      const res = await apiService.get(`/pengumuman/${pengumumanId}`);
      console.log(res.data);
      setPengumuman(res.data);
    } catch (err) {
      console.error("Failed to fetch periodes:", err);
    }
  }

  const onDeletePengumuman = async () => {
    deleteModalRef.current.showModal();
  }

  const handleDeletePengumuman = async () => {
    try {
      await apiService.delete(`/pengumuman/${pengumumanId}`);
      deleteModalRef.current.close();
      navigate("/app/pengumuman");
    } catch (error) {
      console.error("Failed to delete pengumuman:", error);
      alert("Gagal menghapus pengumuman.");
    }
  }

  const onDownloadServerFile = (lampiranId) => async () => {
    try {
      const response = await fileApi.get(`/download/${lampiranId}`, {
        responseType: 'blob',
        // Penting: jangan biarkan Axios parse sebagai JSON/text
      });

      // ✅ Ambil MIME type dari header response (lebih akurat!)
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      const contentDisposition = response.headers['content-disposition'];

      // Ekstrak filename dari header (opsional tapi bagus)
      let fileName = `lampiran_${lampiranId}`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename\*=UTF-8''(.+)/i);
        if (match) {
          fileName = decodeURIComponent(match[1]);
        } else {
          const match2 = contentDisposition.match(/filename="?(.+)"?/i);
          if (match2) fileName = match2[1];
        }
      }

      // ✅ Buat Blob dengan type yang benar
      const blob = new Blob([response.data], { type: contentType });

      // ✅ Buat URL dan download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // 👈 ini penting!
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download error:", error);
      alert("Gagal mengunduh file.");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center flex-wrap flex-wrap">
        <button onClick={() => { navigate("/app/pengumuman") }} className="btn btn-ghost mb-4">
          <ArrowLeftIcon className="w-5 h-5" /> Kembali
        </button>
        <button onClick={() => { onDeletePengumuman() }} className="btn btn-error mb-4">
          <TrashIcon className="w-5 h-5" /> Delete
        </button>
      </div>
      {pengumuman ? <>
        <h1 className="text-2xl font-bold">{pengumuman.judul}</h1>
        <div className="flex gap-2 mt-2">
          <div className="badge badge-neutral">{pengumuman.tag}</div>
          <div className="badge badge-outline">{pengumuman.jumlah_lampiran} Attachment</div>
        </div>

        <p className="mt-4 text-base">{pengumuman.isi}</p>

        <div className="mt-6 space-y-2">
          <h3 className="font-semibold">Attachment:</h3>
          {pengumuman.lampirans.map((att, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 border rounded-md">
              {att.jenis_lampiran === "file" ? (
                <div onClick={
                  onDownloadServerFile(att.id)
                }>
                  📄 <span className="link link-primary">{att.name_lampiran}</span>
                </div>
              ) : (
                <a href={att.sumber_lampiran} target="_blank" rel="noreferrer">
                  🔗 <span className="link link-primary">{att.name_lampiran}</span>
                </a>
              )}
              <span className="text-xs text-base-content/70">
                {pengumuman.tanggal}
              </span>
            </div>
          ))}
        </div>
      </>
        : <span className="loading loading-spinner loading-xl"></span>}

      {/* --- Delete Modal --- */}
      <dialog ref={deleteModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error">Konfirmasi Hapus Pengumuman</h3>
          <p className="py-4">
            Apakah Anda yakin ingin menghapus pengumuman <span className="font-bold">{pengumuman ? pengumuman.judul: ""}</span>
          </p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Batalkan</button></form>
            <button onClick={handleDeletePengumuman} className="btn btn-error">
              Hapus
            </button>
          </div>
        </div>
      </dialog>

    </div>
  );
}

export default PengumumanDetailPage;
