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

function FeePaymentStats({
  feePayments,
}) {
  const totalPayments =
    feePayments.length;

  const totalAmount =
    feePayments.reduce(
      (sum, payment) =>
        sum +
        Number(payment.amount || 0),
      0
    );

  return (
    <Grid
      container
      spacing={2}
      mb={3}
    >
      <Grid
        size={{ xs: 12, md: 6 }}
      >
        <StatCard
          title="Total Payments"
          value={totalPayments}
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
      >
        <StatCard
          title="Amount Collected"
          value={`₹${totalAmount}`}
        />
      </Grid>
    </Grid>
  );
}

export default FeePaymentStats;