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

function ExamScheduleDialog({
  open,
  onClose,
  formData,
  examTypes,
  subjects,
  faculties,
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
          ? "Edit Exam Schedule"
          : "Add Exam Schedule"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            fullWidth
            label="Exam Type"
            name="examTypeId"
            value={formData.examTypeId}
            onChange={onChange}
          >
            {examTypes.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.name}
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
            {subjects.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.code} - {item.name}
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
            {faculties.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Semester"
            name="semester"
            value={formData.semester}
            onChange={onChange}
          >
            {[1,2,3,4,5,6,7,8].map((sem)=>(
              <MenuItem
                key={sem}
                value={sem}
              >
                Semester {sem}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            name="examDate"
            type="date"
            value={formData.examDate}
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
            }}
            />

          <TextField
            fullWidth
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
            }}
            />

          <TextField
            fullWidth
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
            }}
            />

          <TextField
            fullWidth
            label="Hall"
            name="hall"
            value={formData.hall}
            onChange={onChange}
          />

          <TextField
            fullWidth
            type="number"
            label="Total Marks"
            name="totalMarks"
            value={formData.totalMarks}
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
          {isEdit
            ? "Update"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExamScheduleDialog;