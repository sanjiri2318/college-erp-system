import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function StatCard({ title, value }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        mt={1}
      >
        {value}
      </Typography>
    </Paper>
  );
}

function StudentStats({ students }) {
  const totalStudents = students.length;

  const totalDepartments = new Set(
    students.map(
      (student) => student.department?.id
    )
  ).size;

  const semesters = new Set(
    students.map(
      (student) => student.semester
    )
  ).size;

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Total Students"
          value={totalStudents}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Departments"
          value={totalDepartments}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Semesters"
          value={semesters}
        />
      </Grid>
    </Grid>
  );
}

export default StudentStats;