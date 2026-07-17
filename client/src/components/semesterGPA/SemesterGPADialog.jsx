import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

function SemesterGPADialog({
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
      maxWidth="sm"
    >
      <DialogTitle>
        Generate Semester GPA
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
            label="Academic Year"
            name="academicYear"
            value={formData.academicYear}
            onChange={onChange}
            placeholder="2026-2027"
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
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SemesterGPADialog;