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

function MarkEntryDialog({
  open,
  onClose,
  formData,
  students,
  subjects,
  faculties,
  examTypes,
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
          ? "Edit Mark Entry"
          : "Add Mark Entry"}
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
            label="Faculty"
            name="facultyId"
            value={formData.facultyId}
            onChange={onChange}
          >
            {faculties.map((faculty) => (
              <MenuItem
                key={faculty.id}
                value={faculty.id}
              >
                {faculty.name}
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
            label="Marks"
            name="marks"
            type="number"
            value={formData.marks}
            onChange={onChange}
            fullWidth
          />

          <TextField
            label="Maximum Marks"
            name="maxMarks"
            type="number"
            value={formData.maxMarks}
            onChange={onChange}
            fullWidth
          />

          <TextField
            label="Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={onChange}
            multiline
            rows={3}
            fullWidth
          />

          {isEdit && (
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={onChange}
            >
              <MenuItem value="DRAFT">
                Draft
              </MenuItem>

              <MenuItem value="LOCKED">
                Locked
              </MenuItem>

              <MenuItem value="PUBLISHED">
                Published
              </MenuItem>
            </TextField>
          )}

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
          {isEdit ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
    );
}

export default MarkEntryDialog;