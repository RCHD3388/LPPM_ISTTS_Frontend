import React from 'react';
import { useEffect } from 'react';
import apiService from '../utils/services/apiService';
import { useState } from 'react';
import { onDownloadServerFile } from '../utils/services/fileApi';

// URL base dari backend untuk membangun link unduhan file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PublicPengumumanDetailModal({ open, onClose, announcement }) {
    // Jangan render apapun jika tidak ada pengumuman yang dipilih
    if (!announcement) return null;

    const [pengumuman, setPengumuman] = useState(null);
    
    const fetchData = async () => {
        try {
            const res = await apiService.get(`/pengumuman/${announcement.id}`);
            console.log(res.data);
            setPengumuman(res.data);
        } catch (err) {
            console.error("Failed to fetch periodes:", err);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <dialog className={`modal ${open ? 'modal-open' : ''}`}>
            {pengumuman ? <div className="modal-box w-11/12 max-w-2xl">
                <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                <h1 className="text-2xl font-bold text-primary">{pengumuman.judul}</h1>

                <div className="flex flex-wrap gap-2 mt-2 items-center">
                    <div className="badge badge-neutral">Tag: {pengumuman.tag?.name || 'Umum'}</div>
                    <div className="badge badge-outline">{pengumuman.lampiran?.length || 0} Lampiran</div>
                    <span className="text-xs text-base-content/60 ml-auto">
                        {new Date(pengumuman.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        })}
                    </span>
                </div>

                {/* Gunakan whitespace-pre-wrap untuk menjaga format paragraf dari backend */}
                <p className="mt-4 text-base whitespace-pre-wrap">{pengumuman.isi}</p>

                {/* Tampilkan bagian lampiran hanya jika ada */}
                {pengumuman.lampirans && pengumuman.jumlah_lampiran > 0 && (
                    <div className="mt-6 space-y-2">
                        <h3 className="font-semibold border-b pb-1">Lampiran:</h3>
                        {pengumuman.lampirans.map((att) => (
                            <div key={att.id} className="flex items-center gap-2 p-2 border rounded-md bg-base-200">
                                {att.jenis_lampiran === "file" ? (
                                    <div
                                        onClick={() => onDownloadServerFile(att.sumber_lampiran)}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <span className="text-xl">📄</span>
                                        <span className="link link-primary">{att.name_lampiran}</span>
                                    </div>
                                ) : (
                                    <a
                                        href={att.sumber_lampiran}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-xl">🔗</span>
                                        <span className="link link-primary">{att.name_lampiran}</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="modal-action mt-6">
                    <button className="btn" onClick={onClose}>Tutup</button>
                </div>
            </div> : <>
                <span className="loading loading-spinner loading-xl"></span>
            </>}
        </dialog>
    );
}

export default PublicPengumumanDetailModal;