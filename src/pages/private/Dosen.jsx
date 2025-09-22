import { PlusIcon } from "@heroicons/react/24/outline";

function DosenPage() {

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Data Dosen Management</h1>
          <p className="mt-1 text-sm text-base-content/70">
            Kelola, tambah, dan perbarui data dosen yang tersedia.
          </p>
        </div>
        <button onClick={() => {}} className="btn btn-primary">
          <PlusIcon className="w-5 h-5" />
          Add New Data Dosen
        </button>
      </div>
    </div>
  );
}

export default DosenPage;