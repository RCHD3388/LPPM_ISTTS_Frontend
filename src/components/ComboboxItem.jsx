export default function ComboBoxItem({ option, onSelect }) {
  return (
    <li>
      <button
        type="button"
        className="flex items-start gap-3 hover:bg-primary hover:text-primary-content rounded-md px-3 py-2 w-full"
        onClick={() => onSelect(option)}
      >
        {/* Icon / Initial (optional) */}
        <div className="w-10 h-10 flex items-center justify-center text-lg font-bold bg-secondary text-secondary-content rounded-full">
          {option.nama_dosen?.charAt(0).toUpperCase()}
        </div>

        {/* Detail */}
        <div className="flex flex-col text-left">
          <p className="font-medium text-base-content">{option.nama_dosen}</p>
          <p className="text-xs text-base-content/70">
            Overall Sinta Score: <span className="font-semibold">{option.overall_sinta}</span>
          </p>
          <p className="text-xs text-base-content/70">
            Three Year Score: <span className="font-semibold">{option.three_year_score}</span>
          </p>
        </div>
      </button>
    </li>
  );
}
