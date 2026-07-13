import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

function StudentFilters({
  search,
  departmentId,
  semester,
  departments,
  onSearchChange,
  onDepartmentChange,
  onSemesterChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Search Student"
            placeholder="Name / Reg No"
            value={search}
            onChange={onSearchChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            select
            label="Department"
            value={departmentId}
            onChange={onDepartmentChange}
          >
            <MenuItem value="">
              All Departments
            </MenuItem>

            {departments.map((dept) => (
              <MenuItem
                key={dept.id}
                value={dept.id}
              >
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
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

            {[1,2,3,4,5,6,7,8].map((sem)=>(
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

export default StudentFilters;