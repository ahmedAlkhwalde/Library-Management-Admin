import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useNavigate } from "react-router-dom";

const ACTIONS = [
  {
    icon: MenuBookOutlinedIcon,
    iconBg: "bg-emerald-500",
    label: "Add Book",
    description: "Add a new book to the library",
    to: "/app/books/new",
  },
  {
    icon: FolderOpenOutlinedIcon,
    iconBg: "bg-blue-500",
    label: "Add Category",
    description: "Add a new category",
    to: "/app/categories",
  },
  {
    icon: AssignmentOutlinedIcon,
    iconBg: "bg-indigo-500",
    label: "View Requests",
    description: "View all borrow requests",
    to: "/app/borrow-requests",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {ACTIONS.map(({ icon: Icon, iconBg, label, description, to }) => (
        <button
          key={label}
          onClick={() => navigate(to)}
          className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all text-left group"
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
            <Icon className="!w-5 !h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          </div>
          <ArrowForwardIcon className="!w-4 !h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
        </button>
      ))}
    </div>
  );
}
