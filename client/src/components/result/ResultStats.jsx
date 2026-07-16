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

function ResultStats({ results }) {
  const totalResults = results.length;

  const passed = results.filter(
    (r) => r.resultStatus === "PASS"
  ).length;

  const failed = results.filter(
    (r) => r.resultStatus === "FAIL"
  ).length;

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Total Results"
          value={totalResults}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Passed"
          value={passed}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Failed"
          value={failed}
        />
      </Grid>
    </Grid>
  );
}

export default ResultStats;