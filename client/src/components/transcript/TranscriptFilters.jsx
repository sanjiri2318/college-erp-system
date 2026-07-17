import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

function TranscriptFilters({
  students,
  studentId,
  onStudentChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            select
            label="Select Student"
            value={studentId}
            onChange={onStudentChange}
          >
            <MenuItem value="">
              Select Student
            </MenuItem>

            {students.map((student) => (
              <MenuItem
                key={student.id}
                value={student.id}
              >
                {student.regNumber} - {student.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TranscriptFilters;