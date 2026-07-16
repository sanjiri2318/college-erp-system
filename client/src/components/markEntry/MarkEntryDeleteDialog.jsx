import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

function MarkEntryDeleteDialog({
  open,
  markEntry,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Mark Entry
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this
          mark entry?
        </Typography>

        <Typography
          mt={2}
          fontWeight="bold"
        >
          {markEntry?.student?.name}
        </Typography>

        <Typography>
          {markEntry?.subject?.name}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MarkEntryDeleteDialog;