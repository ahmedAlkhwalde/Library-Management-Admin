import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddIcon from "@mui/icons-material/Add";

export default function UserHeader() {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <PeopleAltOutlinedIcon className="w-5! h-5! text-blue-500" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            View, manage, and block system users.
          </p>
        </div>
      </div>
    </div>
  );
}
