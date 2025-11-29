// components/ProposalCard.jsx
import React from "react";
import { CalendarDaysIcon, UserGroupIcon, TagIcon } from "@heroicons/react/24/outline";
import { isMenunggu, STATUS_PROPOSAL_LAPORAN_BADGE, TIPE_PERSETUJUAN_BADGE } from "./../../utils/constants/constant"
import LocalStorageService from "../../utils/services/LocalStorageService";

function ProposalCard({ proposal, page = "proposal", onClick, onReview }) {
  const user = LocalStorageService.getItem("app_user");

  const getLatestLaporan = () => {
    return proposal.laporan.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }
  const getLaporanStatus = () => {
    if (proposal.laporan.length == 0) {
      return "Belum"
    } else if (isMenunggu(getLatestLaporan().status)) {
      return "Menunggu"
    } else {
      return "Revisi"
    }
  }

  const getLaporanStatusColor = () => {
    if (proposal.laporan.length == 0) {
      return "badge-warning"
    } else if (isMenunggu(getLatestLaporan().status)) {
      return "badge-warning"
    } else {
      return "badge-error"
    }
  }

  const isContributor = () =>{
    
    return proposal?.kontributor?.some((k) => k.id == user.id)
  }
  const isNeedReview = () => {
    if (page != "laporan") return false

    if (proposal.laporan.length == 0) {
      return false
    } else if (isMenunggu(getLatestLaporan().status)) {
      return true
    } else {
      return false
    }
  }

  return (
    <div
      onClick={() => page == "proposal" ? onClick() : onReview()}
      className="card card-compact bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-base font-semibold line-clamp-1">{proposal.judul}</h2>
          {page === "proposal" && <div className={`badge ${STATUS_PROPOSAL_LAPORAN_BADGE[proposal.status].color || "badge-ghost"}`}>
            {STATUS_PROPOSAL_LAPORAN_BADGE[proposal.status].text}
          </div>}
          {page === "laporan" && <div className={`badge ${getLaporanStatusColor() || "badge-ghost"}`}>
            {getLaporanStatus()}
          </div>}
        </div>

        {page === "proposal" && proposal.persetujuan && !isMenunggu(proposal.status) && <div className="flex justify-end">
          {proposal.persetujuan?.tipe == 2 && <div className={`badge badge-warning`}>
            {/* {TIPE_PERSETUJUAN_BADGE[proposal.persetujuan?.tipe].text} */}
            + Laporan
          </div>}
        </div>}

        <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70 mt-2">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4" />
            {proposal.periode.name}
          </div>
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{proposal.kontributor.length} kontributor</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70 mt-2">
          <div className="flex items-center gap-1">
            <TagIcon className="w-4 h-4" />
            <span className="badge badge-neutral badge-sm">{proposal.tag.name}</span>
          </div>
          {proposal.persetujuan?.type === "wajib" && <div className="flex items-center gap-1">
            <span className="badge badge-info badge-sm">Wajib laporan</span>
          </div>}
        </div>

        <p className="text-xs text-base-content/60 mt-1">
          Diupload pada {new Date(proposal.date).toLocaleDateString("id-ID")}
        </p>
        {page == "laporan" && isNeedReview() &&
          <button onClick={onReview} className="btn btn-base btn-outline btn-sm">Review</button>
        }
        {page == "laporan" && !isNeedReview() && isContributor() &&
          <button onClick={onClick} className="btn btn-success btn-outline btn-sm">Upload</button>
        }
      </div>

    </div>
  );
}

export default ProposalCard;
