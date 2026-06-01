import { useMemo, useState } from "react";
import UserHeader from "./UserHeader.jsx";
import UserFiltersBar from "./UserFiltersBar.jsx";
import UserTable from "./UserTable.jsx";
import UserPagination from "./UserPagination.jsx";
import UserDetailsModal from "./UserDetailsModal.jsx";
import { mockUsers } from "../data/mockUsers.js";

export default function UserManagementView() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const pageSize = 6;

  const filteredUsers = useMemo(
    () => applyLocalFilters(mockUsers, search, status),
    [search, status],
  );
  const totalCount = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 max-w-7xl mx-auto">
        <UserHeader />

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <UserFiltersBar
              onSearchChange={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
              onStatusChange={(value) => {
                setStatus(value === "All Status" ? "" : value);
                setCurrentPage(1);
              }}
            />
          </div>

          <UserTable
            users={pagedUsers}
            isLoading={false}
            onView={handleViewUser}
          />
          <UserPagination
            totalCount={totalCount}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <UserDetailsModal
        isOpen={Boolean(selectedUser)}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </div>
  );
}

function applyLocalFilters(users, search, status) {
  const normalizedSearch = search.trim().toLowerCase();
  const normalizedStatus = status.toLowerCase();

  return users.filter((user) => {
    const matchesSearch =
      !normalizedSearch ||
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch) ||
      user.phone.toLowerCase().includes(normalizedSearch);
    const matchesStatus =
      !normalizedStatus || user.status.toLowerCase() === normalizedStatus;
    return matchesSearch && matchesStatus;
  });
}
