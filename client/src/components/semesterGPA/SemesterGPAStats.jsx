import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function StatCard({
  title,
  value,
}) {
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

function SemesterGPAStats({
  semesterGPAs,
}) {
  const totalRecords =
    semesterGPAs.length;

  const averageGPA =
    totalRecords === 0
      ? 0
      : (
          semesterGPAs.reduce(
            (sum, item) =>
              sum + item.gpa,
            0
          ) / totalRecords
        ).toFixed(2);

  const highestGPA =
    totalRecords === 0
      ? 0
      : Math.max(
          ...semesterGPAs.map(
            (item) => item.gpa
          )
        );

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <StatCard
          title="Total Records"
          value={totalRecords}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <StatCard
          title="Average GPA"
          value={averageGPA}
        />
      </Grid>

      <Grid
        size={{
          xs: 12,
          md: 4,
        }}
      >
        <StatCard
          title="Highest GPA"
          value={highestGPA}
        />
      </Grid>
    </Grid>
  );
}

export default SemesterGPAStats;