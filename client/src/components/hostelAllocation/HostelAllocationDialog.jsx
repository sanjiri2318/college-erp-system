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

function HostelAllocationDialog({
  open,
  onClose,
  formData,
  students,
  hostelBeds,
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
        Allocate Hostel Bed
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
            label="Hostel Bed"
            name="hostelBedId"
            value={formData.hostelBedId}
            onChange={onChange}
          >
            {hostelBeds.map((bed) => (
              <MenuItem
                key={bed.id}
                value={bed.id}
              >
                {bed.bedNumber}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="date"
            label="Check In Date"
            name="checkInDate"
            value={formData.checkInDate}
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
          Allocate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HostelAllocationDialog;