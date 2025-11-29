// components/ProposalDetailModal.jsx
import React, { useState } from "react";
import { ArrowDownTrayIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { STATUS_PROPOSAL_LAPORAN_BADGE, TIPE_PERSETUJUAN_BADGE } from "../../utils/constants/constant";
import { onDownloadServerFile } from "./../../utils/services/fileApi"

function ProposalDetailContent({ proposal }) {

  if (!proposal) return null;

  const handleDownload = (url) => {
    if (!url) return alert("File belum tersedia");
    window.open(url, "_blank");
  };

  const isResponded = proposal.status in STATUS_PROPOSAL_LAPORAN_BADGE;

  const getStatus = () => {
    return STATUS_PROPOSAL_LAPORAN_BADGE[proposal.status].text
  }

  // Helper untuk mendapatkan status laporan individual
  const getStatusLaporan = (statusId) => {
    return STATUS_PROPOSAL_LAPORAN_BADGE[statusId] || { text: 'N/A', color: 'badge-ghost' };
  };

  return (
    <div>
      {/* Judul */}
      <h3 className="font-bold text-xl mb-2">{proposal.judul}</h3>
      <div className="divider"></div>

      {/* Informasi Proposal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <p><strong>Jenis:</strong> {proposal.jenis_proposal}</p>
        <p><strong>Periode:</strong> {proposal.periode.name}</p>
        <p><strong>Tag:</strong> {proposal.tag.name}</p>
        <p><strong>Status:</strong> {getStatus()}</p>
        <p><strong>Dana Diajukan:</strong> Rp {proposal.dana_diajukan.toLocaleString()}</p>

        {proposal.dana_disetujui > 0 && (
          <p><strong>Dana Disetujui:</strong> Rp {proposal.dana_disetujui.toLocaleString()}</p>
        )}
      </div>

      {/* Kontributor */}
      <div className="mt-3">
        <strong>Kontributor:</strong>
        <div className="flex flex-wrap gap-2 mt-2">
          {proposal.kontributor.map((c, i) => (
            <span key={i} className="badge badge-accent">{c.name}</span>
          ))}
        </div>
      </div>

      <div className="divider"></div>

      {/* Tombol Download Proposal */}
      <div className="flex justify-between items-center mb-3">
        <button
          className="btn btn-outline btn-sm gap-2"
          onClick={() => { onDownloadServerFile(proposal.berkas_proposal, proposal.judul) }}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Download Proposal
        </button>
      </div>

      {/* Informasi Setelah Disetujui */}
      <div className="mt-4 border border-base-200 rounded-lg bg-base-100 p-4 space-y-2 text-sm">
        <h4 className="font-semibold text-base">Informasi Persetujuan</h4>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`badge ${STATUS_PROPOSAL_LAPORAN_BADGE[proposal.status].color}`}>{getStatus()}</span>
        </p>
        {proposal.persetujuan && proposal.persetujuan.tipe != 3 && (<>
          <p>
            <strong>Dana Disetujui:</strong> Rp{" "}
            {proposal.dana_disetujui
              ? proposal.dana_disetujui.toLocaleString()
              : proposal.dana_diajukan.toLocaleString()}
          </p>

          {proposal.persetujuan.tipe == 2 && (
            <p>
              <strong>Laporan:</strong> Diperlukan
            </p>
          )}

          {proposal.persetujuan.berkas_lampiran && (
            <div>
              <strong>Lampiran Ketua:</strong>{" "}
              <button
                className="btn btn-outline btn-xs ml-2"
                onClick={() => onDownloadServerFile(proposal.persetujuan.berkas_lampiran, proposal.judul + "_Lampiran_Ketua")}
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download Lampiran
              </button>
            </div>
          )}
        </>
        )}
      </div>

      {/* RIWAYAT LAPORAN */}
      {false && (
        <div className="card  bg-base-100 border border-base-200 mt-4">
          <div className="card-body p-4">
            <h4 className="card-title text-base mb-2">Riwayat Laporan</h4>
            {proposal.laporan && proposal.laporan.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {proposal.laporan.map((laporan, index) => {
                  const statusInfo = getStatusLaporan(laporan.status);
                  // Asumsi backend mengembalikan `createdAt` atau `date`
                  const tglLaporan = laporan.createdAt || laporan.date;

                  return (
                    <div key={laporan.id || index} className="flex justify-between items-center p-2 bg-base-200 rounded-md">
                      {/* Sisi Kiri: Informasi */}
                      <div className="flex items-center gap-3">
                        <span className={`badge ${statusInfo.color}`}>{statusInfo.text}</span>
                        {tglLaporan && (
                          <div className="flex items-center gap-1 text-xs text-base-content/70">
                            <CalendarDaysIcon className="w-4 h-4" />
                            <span>
                              {new Date(tglLaporan).toLocaleDateString('id-ID', {
                                year: 'numeric', month: 'long', day: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Sisi Kanan: Aksi */}
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => alert(`Lihat detail laporan ID: ${laporan.id}`)}
                      >
                        Lihat Detail
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-base-content/60 italic">Belum ada laporan yang diunggah.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProposalDetailContent;
