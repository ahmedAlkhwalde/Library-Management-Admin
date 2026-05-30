import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const STATUS_OPTIONS = ["All Status", "Active", "Inactive"];

export default function CategoryFiltersBar({ onSearchChange, onStatusChange }) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  return (
    <div className="flex items-center gap-3 flex-wrap justify-between">
      <div className="flex items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <TuneIcon className="!w-4 !h-4" />
          Filters
        </button>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 !w-4 !h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); onSearchChange?.(e.target.value); }}
            placeholder="Search categories..."
            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors w-56"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Status:</span>
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); onStatusChange?.(e.target.value); }}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 bg-white focus:outline-none focus:border-indigo-400 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
          </select>
          <KeyboardArrowDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 !w-4 !h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}