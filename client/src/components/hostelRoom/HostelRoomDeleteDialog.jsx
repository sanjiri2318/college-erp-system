import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

function HostelRoomDeleteDialog({
  open,
  hostelRoom,
  onClose,
  onDelete,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Hostel Room
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete room{" "}
          <strong>
            {hostelRoom?.roomNumber}
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

export default HostelRoomDeleteDialog;