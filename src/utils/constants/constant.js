export const STATUS_PROPOSAL_LAPORAN_BADGE = {
  0: { text: "Menunggu", color: "badge-warning" },
  1: { text: "Disetujui", color: "badge-success" },
  2: { text: "Ditolak", color: "badge-error" }
};

export const TIPE_PERSETUJUAN_BADGE = {
  0: { text: "Menunggu", color: "badge-warning" },
  1: { text: "Disetujui", color: "badge-success" },
  2: { text: "Disetujui + Laporan", color: "badge-info" },
  3: { text: "Ditolak", color: "badge-error" }
};

export const TIPE_PERSETUJUAN = {
  DISETUJUI: 1,
  DISETUJUI_LAPORAN: 2,
  DITOLAK: 3,
};

export const isMenunggu = (status) => {
  return status == 0
};

