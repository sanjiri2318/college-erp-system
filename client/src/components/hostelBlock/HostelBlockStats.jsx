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

function HostelBlockStats({
  hostelBlocks,
}) {
  const totalBlocks =
    hostelBlocks.length;

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid size={{ xs: 12 }}>
        <StatCard
          title="Total Hostel Blocks"
          value={totalBlocks}
        />
      </Grid>
    </Grid>
  );
}

export default HostelBlockStats;
