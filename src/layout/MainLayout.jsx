import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import AppSnackbar from "../components/AppSnackbar.jsx";
import Sidebar from "./Sidebar.jsx";
import TopBar from "../components/TopBar.jsx";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const snackbar = location.state?.snackbar;

  const handleCloseSnackbar = () => {
    if (!snackbar) return;
    navigate(location.pathname, { replace: true, state: null });
  };

  return (
    <div className="min-h-screen flex bg-(--color-primary)">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile hamburger header */}
        <header className="md:hidden sticky top-0 z-10 bg-(--color-primary) backdrop-blur border-b border-(--color-border)">
          <div className="flex items-center gap-3 p-4">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg border border-(--color-border) bg-(--color-secondary) text-(--color-text) hover:bg-[color-mix(in_srgb,var(--color-secondary)_92%,var(--color-accent)_8%)]"
            >
              <Menu fontSize="small" />
            </button>
            <span className="font-semibold text-(--color-text)">
              Green Team Library
            </span>
          </div>
        </header>

        {/* Shared desktop top bar — search + notifications + admin */}
        <TopBar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <AppSnackbar
        open={Boolean(snackbar?.message)}
        message={snackbar?.message || ""}
        variant={snackbar?.variant || "success"}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
}