import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

function HostelBedDeleteDialog({
  open,
  hostelBed,
  onClose,
  onDelete,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Hostel Bed
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete bed{" "}
          <strong>
            {hostelBed?.bedNumber}
          </strong>
          ?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HostelBedDeleteDialog;