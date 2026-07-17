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

function HostelStats({ hostels }) {
  const totalHostels = hostels.length;

  const activeHostels = hostels.filter(
    (hostel) => hostel.isActive
  ).length;

  const inactiveHostels =
    totalHostels - activeHostels;

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Total Hostels"
          value={totalHostels}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Active Hostels"
          value={activeHostels}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Inactive Hostels"
          value={inactiveHostels}
        />
      </Grid>
    </Grid>
  );
}

export default HostelStats;