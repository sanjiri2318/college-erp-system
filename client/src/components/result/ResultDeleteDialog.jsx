import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

function ResultDeleteDialog({
  open,
  onClose,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Result Generated
      </DialogTitle>

      <DialogContent>
        <Typography>
          Results are generated academic records
          and cannot be deleted from this module.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResultDeleteDialog;