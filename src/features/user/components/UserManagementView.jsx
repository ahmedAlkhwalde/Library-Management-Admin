import { useState } from "react";
import UserHeader from "./UserHeader.jsx";
import UserFiltersBar from "./UserFiltersBar.jsx";
import UserTable from "./UserTable.jsx";
import UserPagination from "./UserPagination.jsx";
import UserDetailsModal from "./UserDetailsModal.jsx";
import BlockUserModal from "./BlockUserModal.jsx";
import AppSnackbar from "../../../components/AppSnackbar.jsx";
import {
  useUsersQuery,
  useBanUserMutation,
  useActivateUserMutation,
} from "../services/userService.js";

export default function UserManagementView() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // حالات المودال
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToBlock, setUserToBlock] = useState(null);

  // حالة التنبيهات
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  // ربط الـ API
  const { data, isLoading, refetch } = useUsersQuery({
    search,
    status,
    page: currentPage,
  });
  const banMutation = useBanUserMutation();
  const activateMutation = useActivateUserMutation();

  const users = data?.data?.users || [];
  const pagination = data?.data?.pagination;

  // منطق الحظر وفك الحظر
  const handleBlockConfirm = () => {
    if (!userToBlock) return;

    const isBanned = userToBlock.status === "banned";
    const mutation = isBanned ? activateMutation : banMutation;

    mutation.mutate(userToBlock.id, {
      onSuccess: (res) => {
        setSnackbar({
          open: true,
          message: res.message || "Operation successful",
          variant: "success",
        });
        setUserToBlock(null);
        refetch();
      },
      onError: () => {
        setSnackbar({
          open: true,
          message: "Operation failed, please try again.",
          variant: "error",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 max-w-7xl mx-auto">
        <UserHeader />

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <UserFiltersBar
              onSearchChange={(v) => {
                setSearch(v);
                setCurrentPage(1);
              }}
              onStatusChange={(v) => {
                setStatus(v);
                setCurrentPage(1);
              }}
            />
          </div>
          <UserTable
            users={users}
            isLoading={isLoading}
            onView={(user) => setSelectedUserId(user.id)} // نمرر الـ id فقط
            onBlock={setUserToBlock}
          />
          {console.log(selectedUserId)}
          <UserDetailsModal
            isOpen={!!selectedUserId}
            onClose={() => setSelectedUserId(null)}
            userId={selectedUserId} // نمرر الـ id
          />
          <UserPagination
            totalCount={pagination?.total || 0}
            currentPage={currentPage}
            totalPages={pagination?.last_page || 1}
            onPageChange={setCurrentPage}
            pageSize={pagination?.per_page || 10}
          />
        </div>
      </main>

      {/* المودالات */}
      <UserDetailsModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />

      <BlockUserModal
        isOpen={!!userToBlock}
        onClose={() => setUserToBlock(null)}
        onConfirm={handleBlockConfirm}
        userName={userToBlock?.name}
        isBlocked={userToBlock?.status === "banned"}
        isLoading={banMutation.isPending || activateMutation.isPending}
      />

      {/* التنبيهات */}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.variant}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
