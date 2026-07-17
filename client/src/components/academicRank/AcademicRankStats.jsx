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

function AcademicRankStats({
  ranks = [],
}) {
  const totalRanks = ranks.length;

  const topRank =
    totalRanks > 0
      ? Math.min(
          ...ranks.map(
            (rank) => rank.overallRank
          )
        )
      : 0;

  const averageCGPA =
    totalRanks > 0
      ? (
          ranks.reduce(
            (sum, rank) =>
              sum + rank.cgpa,
            0
          ) / totalRanks
        ).toFixed(2)
      : "0.00";

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Total Ranked Students"
          value={totalRanks}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Top Overall Rank"
          value={topRank}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Average CGPA"
          value={averageCGPA}
        />
      </Grid>
    </Grid>
  );
}

export default AcademicRankStats;