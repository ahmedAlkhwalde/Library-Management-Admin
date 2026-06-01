import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BookPagination({
  currentPage,
  lastPage,
  total,
  onPageChange,
}) {
  if (!lastPage || lastPage <= 1) return null;

  return (
    <div
      className="
        mt-4
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-6
        py-4
        shadow-sm
      "
    >
      {/* Left Side */}
      <div>
        <p className="text-sm font-medium text-gray-600">
          {total} Books Total
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl border border-gray-200 bg-white
            text-gray-600 transition-all
            hover:border-blue-500 hover:text-blue-600
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <ChevronLeftIcon fontSize="small" />
        </button>

        {Array.from(
          { length: lastPage },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              h-11 w-11 rounded-xl text-sm font-semibold
              transition-all duration-200
              ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:-translate-y-0.5"
              }
            `}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl border border-gray-200 bg-white
            text-gray-600 transition-all
            hover:border-blue-500 hover:text-blue-600
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <ChevronRightIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}