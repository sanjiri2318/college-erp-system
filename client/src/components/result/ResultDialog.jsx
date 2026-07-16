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

function ResultDialog({
  open,
  onClose,
  formData,
  students,
  subjects,
  examTypes,
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
        Generate Result
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
            label="Subject"
            name="subjectId"
            value={formData.subjectId}
            onChange={onChange}
          >
            {subjects.map((subject) => (
              <MenuItem
                key={subject.id}
                value={subject.id}
              >
                {subject.code} - {subject.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Exam Type"
            name="examTypeId"
            value={formData.examTypeId}
            onChange={onChange}
          >
            {examTypes.map((exam) => (
              <MenuItem
                key={exam.id}
                value={exam.id}
              >
                {exam.name}
              </MenuItem>
            ))}
          </TextField>

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
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResultDialog;