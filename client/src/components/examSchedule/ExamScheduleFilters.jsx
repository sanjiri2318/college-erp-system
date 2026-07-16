import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

function ExamScheduleFilters({
  search,
  semester,
  onSearchChange,
  onSemesterChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Subject / Hall / Exam Type"
            value={search}
            onChange={onSearchChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            select
            label="Semester"
            value={semester}
            onChange={onSemesterChange}
          >
            <MenuItem value="">
              All Semesters
            </MenuItem>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <MenuItem
                key={sem}
                value={sem}
              >
                Semester {sem}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExamScheduleFilters;