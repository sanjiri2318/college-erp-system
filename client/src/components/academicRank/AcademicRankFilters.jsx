import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

function AcademicRankFilters({
  search = "",
  onSearchChange,
  department = "",
  onDepartmentChange,
  academicYear = "",
  onAcademicYearChange,
}) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Search Student"
            placeholder="Search by name or register number"
            value={search}
            onChange={onSearchChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Department"
            placeholder="All Departments"
            value={department}
            onChange={onDepartmentChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Academic Year"
            placeholder="2025-2026"
            value={academicYear}
            onChange={onAcademicYearChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AcademicRankFilters;