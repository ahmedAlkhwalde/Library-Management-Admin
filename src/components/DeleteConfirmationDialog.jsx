import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function DeleteConfirmationDialog({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-border)' }} className="rounded-2xl shadow-xl w-full max-w-md border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottomColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-danger-soft)' }}>
                <DeleteOutlineIcon className="!w-5 !h-5" style={{ color: 'var(--color-danger)' }} />
              </div>
              <h2 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>{title}</h2>
            </div>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: 'var(--color-grey)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface-90)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <CloseIcon className="!w-5 !h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <p className="text-sm" style={{ color: 'var(--color-grey)' }}>{message}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4" style={{ borderTopColor: 'var(--color-border)' }}>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-grey)',
                border: '1px solid',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-surface-90)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-5 py-2 rounded-lg text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              style={{
                backgroundColor: 'var(--color-danger)',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting…
                </>
              ) : (
                <>
                  <DeleteOutlineIcon className="!w-4 !h-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
