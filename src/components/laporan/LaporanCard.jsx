import dayjs from "dayjs";
import { STATUS_PROPOSAL_LAPORAN_BADGE } from "./../../utils/constants/constant";

function LaporanCard({ laporan, proposal, onDetail = () => { } }) {

  return (
    <div
      key={laporan.id}
      className="card card-compact bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={onDetail}
    >
      <div className="card-body p-3">
        <div className="flex justify-between items-center ">
          <h1 className="font-semibold text-lg mr-2">{proposal.judul}</h1>
          <span
            className={`badge ${STATUS_PROPOSAL_LAPORAN_BADGE[laporan.status].color}`}
          >
            {STATUS_PROPOSAL_LAPORAN_BADGE[laporan.status].text}
          </span>
        </div>
        <p className="text-sm text-base-content/70">
          {proposal.jenis} • {proposal.periode.name}
        </p>
        <p className="text-xs mt-1">
          {dayjs(laporan.date).format("DD MMM YYYY")}
        </p>
      </div>
    </div>
  );
}

export default LaporanCard;
