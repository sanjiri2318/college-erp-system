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

function FeePaymentDialog({
  open,
  onClose,
  formData,
  students,
  onChange,
  onSubmit,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Record Fee Payment
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
            fullWidth
            type="number"
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={onChange}
          />

          <TextField
            select
            fullWidth
            label="Payment Method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={onChange}
          >
            <MenuItem value="CASH">
              Cash
            </MenuItem>

            <MenuItem value="UPI">
              UPI
            </MenuItem>

            <MenuItem value="CARD">
              Card
            </MenuItem>

            <MenuItem value="BANK_TRANSFER">
              Bank Transfer
            </MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="date"
            label="Payment Date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FeePaymentDialog;