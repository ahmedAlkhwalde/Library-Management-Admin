import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// القيم التي يتوقعها الـ API
const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Banned", value: "banned" },
];

export default function UserFiltersBar({ onSearchChange, onStatusChange }) {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div className="flex p-3 items-center gap-3 flex-wrap justify-start">

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Status:</span>
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              onStatusChange?.(e.target.value);
            }}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 bg-white focus:outline-none focus:border-indigo-400 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <KeyboardArrowDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4! h-4! text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4! h-4! text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            placeholder="Search users..."
            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors w-56"
          />
        </div>
      </div>

      
    </div>
  );
}