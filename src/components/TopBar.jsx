import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { markAllNotificationsRead } from "../features/dashboard/store/dashboardSlice";
import { searchBooks } from "../features/search/searchService";
import BookDetailsModal from "../features/books/components/BookDetailsModal";

export default function TopBar() {
  const dispatch = useDispatch();
  const notificationsCount = useSelector(
    (s) => s.dashboard?.notificationsCount ?? 0
  );
  const notifications = useSelector((s) => s.dashboard?.notifications ?? []);
  const user = useSelector((s) => s.auth?.user);

  const [notifOpen, setNotifOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const searchRef = useRef(null);

  const displayName = user?.name || "Admin";
  const displayRole = user?.role || "Administrator";
  const initial = displayName.charAt(0).toUpperCase();

  const handleBellClick = () => {
    setNotifOpen((v) => !v);
    if (notificationsCount > 0) dispatch(markAllNotificationsRead());
  };

  const handleSelectBook = (book) => {
    setSelectedBookId(book.id);
    setBookModalOpen(true);
    setSearchOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const term = query.trim();

    if (!term) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    let active = true;
    setIsSearching(true);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await searchBooks(term);
        const books = response?.data?.books || [];
        if (!active) return;

        setResults(books);
        setSearchOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
        if (!active) return;

        setResults([]);
        setSearchOpen(true);
      } finally {
        if (active) setIsSearching(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <>
      <div className="hidden md:flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shrink-0">
        <div ref={searchRef} className="relative w-72">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (query.trim() && results.length > 0) {
                  setSearchOpen(true);
                }
              }}
              placeholder="Search books, authors, categories..."
              className="w-full pl-9 pr-16 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors bg-white"
            />

            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 !w-4 !h-4 text-gray-400" />

            {query ? (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-medium"
              >
                Clear
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-mono">
                Ctrl+K
              </span>
            )}
          </div>

          {searchOpen && (
            <div className="absolute left-0 top-12 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl z-50">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Search results
                </p>
              </div>

              {isSearching ? (
                <div className="px-4 py-5 text-sm text-gray-500">
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-5 text-sm text-gray-400">
                  No books found
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {results.map((book) => (
                    <button
                      key={book.id}
                      type="button"
                      className="w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      onClick={() => handleSelectBook(book)}
                    >
                      <img
                        src={book.image || "https://picsum.photos/id/24/120/160"}
                        alt={book.title}
                        className="w-10 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {book.title}
                        </p>

                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {book.author}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {book.category_name && (
                            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 border border-indigo-100">
                              {book.category_name}
                            </span>
                          )}

                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium border ${
                              book.status === "available"
                                ? "bg-green-50 text-green-700 border-green-100"
                                : "bg-red-50 text-red-700 border-red-100"
                            }`}
                          >
                            {book.status === "available" ? "Available" : "Unavailable"}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <button
              onClick={handleBellClick}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <NotificationsNoneOutlinedIcon className="!w-5 !h-5 text-gray-500" />
              {notificationsCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-1 ring-white">
                  {notificationsCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                />
                <div className="absolute right-0 top-11 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">
                      Notifications
                    </p>
                    {notificationsCount === 0 && (
                      <span className="text-xs text-gray-400">All caught up</span>
                    )}
                  </div>
                  <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <li className="px-4 py-6 text-center text-xs text-gray-400">
                        No notifications
                      </li>
                    ) : (
                      notifications.map((n) => (
                        <li
                          key={n.id}
                          className={`px-4 py-3 text-xs text-gray-600 leading-relaxed ${
                            n.read ? "opacity-50" : "bg-indigo-50/40"
                          }`}
                        >
                          {n.message}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {initial}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 leading-none">
                {displayName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{displayRole}</p>
            </div>
            <KeyboardArrowDownIcon className="!w-4 !h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>

      <BookDetailsModal
        open={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        bookId={selectedBookId}
      />
    </>
  );
}