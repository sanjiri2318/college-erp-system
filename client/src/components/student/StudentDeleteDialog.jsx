import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function StudentDeleteDialog({
  open,
  onClose,
  onConfirm,
  student,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          bgcolor: "error.main",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Delete Student
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <DialogContentText>
          Are you sure you want to delete this
          student?
        </DialogContentText>

        {student && (
          <>
            <DialogContentText sx={{ mt: 2 }}>
              <strong>Name:</strong>{" "}
              {student.name}
            </DialogContentText>

            <DialogContentText>
              <strong>Reg No:</strong>{" "}
              {student.regNumber}
            </DialogContentText>

            <DialogContentText>
              <strong>Email:</strong>{" "}
              {student.user?.email}
            </DialogContentText>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
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

export default StudentDeleteDialog;