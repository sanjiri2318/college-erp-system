import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function ExamScheduleDeleteDialog({
  open,
  examSchedule,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Exam Schedule
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this
          exam schedule?
        </Typography>

        <Typography
          mt={2}
          fontWeight="bold"
        >
          {examSchedule?.subject?.name}
        </Typography>

        <Typography variant="body2">
          {examSchedule?.examType?.name}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExamScheduleDeleteDialog;