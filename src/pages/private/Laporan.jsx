import { PlusIcon } from "@heroicons/react/24/outline";

function LaporanPage() {

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Laporan Management</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Kelola, tambah, dan perbarui data laporan yang tersedia.
          </p>
        </div>
        <button onClick={() => {}} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Add New Laporan
        </button>
      </div>
    </div>
  );
}

export default LaporanPage;