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

function ExamScheduleStats({
  examSchedules,
}) {
  const totalSchedules =
    examSchedules.length;

  const totalSemesters =
    new Set(
      examSchedules.map(
        (schedule) =>
          schedule.semester
      )
    ).size;

  const totalHalls =
    new Set(
      examSchedules.map(
        (schedule) =>
          schedule.hall
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
          title="Total Schedules"
          value={totalSchedules}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Semesters"
          value={totalSemesters}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Exam Halls"
          value={totalHalls}
        />
      </Grid>
    </Grid>
  );
}

export default ExamScheduleStats;