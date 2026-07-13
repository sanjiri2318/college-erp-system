import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import StudentFormFields from "./StudentFormFields";

function StudentEditDialog({
  open,
  onClose,
  formData,
  departments,
  onChange,
  onUpdate,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Edit Student
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <StudentFormFields
          formData={formData}
          departments={departments}
          onChange={onChange}
          isEdit
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onUpdate}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StudentEditDialog;