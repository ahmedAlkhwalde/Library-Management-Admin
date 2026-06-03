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
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          zIndex: 40,
        }} 
        onClick={onCancel}
      />
      
      {/* Dialog Container */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 50,
        }}
      >
        {/* Dialog Box */}
        <div
          style={{
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            width: '100vw',
            maxWidth: '500px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-secondary)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-danger-soft)',
                }}
              >
                <DeleteOutlineIcon style={{ color: 'var(--color-danger)', width: '20px', height: '20px' }} />
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-text)', margin: 0 }}>
                {title}
              </h2>
            </div>
            <button
              onClick={onCancel}
              disabled={isLoading}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
                color: 'var(--color-grey)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <CloseIcon style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '24px' }}>
            <p style={{ fontSize: '14px', color: 'var(--color-grey)', margin: 0 }}>
              {message}
            </p>
          </div>

          {/* Footer - Button Container */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              padding: '20px 24px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid var(--color-border)',
                backgroundColor: 'transparent',
                color: 'var(--color-text)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = 'var(--color-surface-90)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                border: 'none',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                opacity: 1,
                visibility: 'visible',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#dc2626';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#ef4444';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  <span>Deleting…</span>
                </>
              ) : (
                <>
                  <DeleteOutlineIcon style={{ width: '16px', height: '16px' }} />
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
