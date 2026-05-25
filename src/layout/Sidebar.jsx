import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Close, MenuBook } from "@mui/icons-material";
import { sidebarItems } from "../features/sidebar/config/sidebarItems.jsx";
import { useLogoutMutation } from "../features/auth/services/authService.js";
import { setLogout } from "../features/auth/store/authSlice.js";

const baseItemClass =
  "flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-xl cursor-pointer transition-colors text-sm md:text-base";
const activeItemClass =
  "bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-(--color-accent)";
const inactiveItemClass =
  "text-(--color-grey) hover:bg-[color-mix(in_srgb,var(--color-secondary)_92%,var(--color-accent)_8%)]";

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const logoutItem = sidebarItems.find((item) => item.action === "logout");

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        dispatch(setLogout());
        navigate("/app/login", {
          replace: true,
          state: {
            snackbar: {
              message: "Logged out successfully.",
              variant: "success",
            },
          },
        });
        onClose();
      },
    });
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-[color-mix(in_srgb,var(--color-text)_30%,transparent)] md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 md:w-72 bg-(--color-secondary) flex flex-col p-4 md:p-6 border-r border-(--color-border) shadow-lg md:shadow-none transform transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <MenuBook className="text-(--color-accent) text-2xl md:text-3xl" />
            <div className="flex flex-col">
              <span className="font-bold text-(--color-accent) text-base md:text-lg">
                Green Team
              </span>
              <span className="font-bold text-(--color-text) text-base md:text-lg -mt-1">
                Library
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="md:hidden text-(--color-grey) hover:text-(--color-text)"
          >
            <Close fontSize="small" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {sidebarItems
            .filter((item) => item.action !== "logout")
            .map((item) => {
              return (
                <NavLink
                  key={item.key}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `${baseItemClass} ${
                      isActive ? activeItemClass : inactiveItemClass
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={
                          isActive
                            ? "text-(--color-accent)"
                            : "text-(--color-grey)"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
        </nav>

        {logoutItem && (
          <button
            type="button"
            onClick={handleLogout}
            className={`${baseItemClass} ${inactiveItemClass} text-left mb-3`}
            disabled={logoutMutation.isPending}
            aria-busy={logoutMutation.isPending}
          >
            <span className="text-(--color-grey)">{logoutItem.icon}</span>
            <span className="font-medium">{logoutItem.label}</span>
          </button>
        )}

        <div className="hidden md:block bg-[color-mix(in_srgb,var(--color-accent)_8%,var(--color-secondary))] p-4 rounded-2xl text-center border border-(--color-border)">
          <MenuBook className="text-(--color-accent) text-3xl mx-auto mb-2" />
          <h3 className="font-bold text-(--color-text) text-base">
            Green Team Library
          </h3>
          <p className="text-(--color-grey) text-xs mt-1 leading-relaxed">
            Smart Library Management for a better future.
          </p>
        </div>
      </aside>
    </>
  );
}
