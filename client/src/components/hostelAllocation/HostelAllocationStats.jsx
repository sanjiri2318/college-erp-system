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

function HostelAllocationStats({
  hostelAllocations,
}) {
  const total =
    hostelAllocations.length;

  const active =
    hostelAllocations.filter(
      (a) => !a.checkOutDate
    ).length;

  const checkedOut =
    hostelAllocations.filter(
      (a) => a.checkOutDate
    ).length;

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Total Allocations"
          value={total}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Active"
          value={active}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Checked Out"
          value={checkedOut}
        />
      </Grid>
    </Grid>
  );
}

export default HostelAllocationStats;