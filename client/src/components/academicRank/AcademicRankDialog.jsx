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

function AcademicRankDialog({
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
        Generate Academic Rank
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
            label="Semester"
            name="semester"
            type="number"
            value={formData.semester}
            onChange={onChange}
          />

          <TextField
            fullWidth
            label="Remarks"
            name="remarks"
            value={formData.remarks}
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
          Generate Rank
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AcademicRankDialog;