import React, { useState } from "react";
import { TrashIcon, PlusIcon, GlobeAltIcon, EnvelopeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

function SettingPage() {
  // contoh data awal
  const [mailingList, setMailingList] = useState([
    "lppm@universitas.ac.id",
    "penelitian@universitas.ac.id",
  ]);
  const [crawlUrls, setCrawlUrls] = useState([
    "https://lppm.universitas.ac.id/berita",
    "https://lppm.universitas.ac.id/pengumuman",
  ]);
  const [newMail, setNewMail] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleAddMail = () => {
    if (newMail.trim() && !mailingList.includes(newMail)) {
      setMailingList([...mailingList, newMail]);
      setNewMail("");
    }
  };

  const handleAddUrl = () => {
    if (newUrl.trim() && !crawlUrls.includes(newUrl)) {
      setCrawlUrls([...crawlUrls, newUrl]);
      setNewUrl("");
    }
  };

  const handleDeleteMail = (email) => {
    setMailingList(mailingList.filter((m) => m !== email));
  };

  const handleDeleteUrl = (url) => {
    setCrawlUrls(crawlUrls.filter((u) => u !== url));
  };

  const handleUpdateData = () => {
    alert("Data publik LPPM berhasil diperbarui!");
  };

  return (
    <div className="min-h-screen p-8 bg-base-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Setting Sistem LPPM</h1>
            <p className="mt-2 text-sm text-base-content/70">
              Kelola konfigurasi sistem LPPM dan sumber data publik.
            </p>
          </div>
        </div>

        {/* Mailing List Section */}
        <div className="card bg-base-200 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <EnvelopeIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold">Mailing List</h2>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="Masukkan email baru"
                className="input input-bordered w-full"
                value={newMail}
                onChange={(e) => setNewMail(e.target.value)}
              />
              <button onClick={handleAddMail} className="btn btn-primary">
                <PlusIcon className="w-5 h-5" />
                Tambah
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {mailingList.map((mail, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-base-100 rounded-lg p-3 shadow-sm"
                >
                  <span className="truncate text-sm">{mail}</span>
                  <button
                    onClick={() => handleDeleteMail(mail)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crawl URL Section */}
        <div className="card bg-base-200 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <GlobeAltIcon className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold">URL untuk Crawl</h2>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="url"
                placeholder="Tambahkan URL baru"
                className="input input-bordered w-full"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <button onClick={handleAddUrl} className="btn btn-primary">
                <PlusIcon className="w-5 h-5" />
                Tambah
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {crawlUrls.map((url, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-base-100 rounded-lg p-3 shadow-sm"
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm text-primary underline"
                  >
                    {url}
                  </a>
                  <button
                    onClick={() => handleDeleteUrl(url)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tombol Update Data Publik */}
        <div className="text-center mt-10">
          <button
            onClick={handleUpdateData}
            className="btn btn-accent btn-lg gap-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Perbarui Data LPPM Publik
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
