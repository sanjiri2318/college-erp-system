import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function Card({ title, value }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography color="text.secondary">
        {title}
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
      >
        {value}
      </Typography>
    </Paper>
  );
}

function ExamTypeStats({ examTypes }) {
  const total = examTypes.length;

  const finalExams =
    examTypes.filter(
      (x) => x.isFinalExam
    ).length;

  const internal =
    total - finalExams;

  return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{ xs:12, md:4 }}>
        <Card
          title="Total Exam Types"
          value={total}
        />
      </Grid>

      <Grid size={{ xs:12, md:4 }}>
        <Card
          title="Final Exams"
          value={finalExams}
        />
      </Grid>

      <Grid size={{ xs:12, md:4 }}>
        <Card
          title="Internal Exams"
          value={internal}
        />
      </Grid>
    </Grid>
  );
}

export default ExamTypeStats;