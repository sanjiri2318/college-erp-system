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

function MarkEntryStats({
  markEntries,
}) {
  const totalEntries =
    markEntries.length;

  const totalStudents =
    new Set(
      markEntries.map(
        (entry) => entry.studentId
      )
    ).size;

  const totalSubjects =
    new Set(
      markEntries.map(
        (entry) => entry.subjectId
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
          title="Mark Entries"
          value={totalEntries}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Students"
          value={totalStudents}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <StatCard
          title="Subjects"
          value={totalSubjects}
        />
      </Grid>
    </Grid>
  );
}

export default MarkEntryStats;