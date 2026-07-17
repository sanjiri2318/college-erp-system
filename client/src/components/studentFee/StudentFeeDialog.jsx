import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

function StudentFeeDialog({
  open,
  onClose,
  formData,
  students,
  feeStructures,
  onChange,
  onSubmit,
  isEdit,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {isEdit
          ? "Edit Student Fee"
          : "Assign Student Fee"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            fullWidth
            label="Student"
            name="studentId"
            value={formData.studentId}
            onChange={onChange}
          >
            {students.map((student) => (
              <MenuItem
                key={student.id}
                value={student.id}
              >
                {student.regNumber} - {student.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Fee Structure"
            name="feeStructureId"
            value={formData.feeStructureId}
            onChange={onChange}
          >
            {feeStructures.map((structure) => (
              <MenuItem
                key={structure.id}
                value={structure.id}
              >
                {structure.feeCategory?.name} - ₹
                {structure.amount}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={onChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
        >
          {isEdit ? "Update" : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StudentFeeDialog;