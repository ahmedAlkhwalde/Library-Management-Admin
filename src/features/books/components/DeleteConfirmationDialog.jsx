import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  isLoading,
  bookTitle,
}) {
  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          maxWidth: 480,
          width: "100%",
        },
      }}
    >
      <DialogContent className="text-center py-8 px-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <WarningAmberIcon sx={{ fontSize: 40, color: "#dc2626" }} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900">Delete Book</h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">“{bookTitle}”</span>?
          <br />
          This action cannot be undone.
        </p>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          px: 4,
          pb: 4,
        }}
      >
        <Button
          onClick={onClose}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            minWidth: 120,
            py: 1,
            borderColor: "#d1d5db",
            color: "#374151",
          }}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            minWidth: 140,
            py: 1,
            backgroundColor: "#dc2626",
            "&:hover": { backgroundColor: "#b91c1c" },
          }}
          startIcon={<DeleteOutlineIcon />}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}