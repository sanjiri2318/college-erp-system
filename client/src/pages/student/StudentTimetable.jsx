import { useEffect, useMemo, useState } from "react";
import { getStudentTimetable } from "../../api/timetableApi";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

const DAY_COLOR = {
  MONDAY: "primary",
  TUESDAY: "secondary",
  WEDNESDAY: "success",
  THURSDAY: "warning",
  FRIDAY: "error",
  SATURDAY: "default",
};

function StudentTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTimetable = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getStudentTimetable();
        setTimetable(data || []);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to load timetable.");
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();
  }, []);

  const totalPeriods = useMemo(() => timetable.length, [timetable]);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={2.5}>
        Timetable
      </Typography>

      <Stack direction="row" spacing={1} mb={2.5}>
        <Chip label={`Total Periods: ${totalPeriods}`} color="primary" variant="outlined" />
      </Stack>

      {error ? <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert> : null}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Day</strong></TableCell>
              <TableCell><strong>Period</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Faculty</strong></TableCell>
              <TableCell><strong>Semester</strong></TableCell>
              <TableCell><strong>Room</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : timetable.length > 0 ? (
              timetable.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Chip
                      label={row.day}
                      size="small"
                      color={DAY_COLOR[row.day] || "default"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>{row.subject?.name || "-"}</TableCell>
                  <TableCell>{row.faculty?.name || "-"}</TableCell>
                  <TableCell>{row.semester}</TableCell>
                  <TableCell>{row.roomNumber || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No timetable entries available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StudentTimetable;
