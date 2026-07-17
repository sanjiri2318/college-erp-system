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

function CGPAStats({
  cgpas,
}) {
  const totalRecords =
    cgpas.length;

  const averageCGPA =
    totalRecords === 0
      ? 0
      : (
          cgpas.reduce(
            (sum, item) =>
              sum + item.cgpa,
            0
          ) / totalRecords
        ).toFixed(2);

  const highestCGPA =
    totalRecords === 0
      ? 0
      : Math.max(
          ...cgpas.map(
            (item) => item.cgpa
          )
        );

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Total Records"
          value={totalRecords}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Average CGPA"
          value={averageCGPA}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Highest CGPA"
          value={highestCGPA}
        />
      </Grid>
    </Grid>
  );
}

export default CGPAStats;