import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

function ResultTable({ results }) {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead
          sx={{
            backgroundColor: "#1976d2",
          }}
        >
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Reg No
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Student
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Subject
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Exam
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Internal
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              External
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Total
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              %
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Grade
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Result
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id} hover>
              <TableCell>
                {result.student?.regNumber}
              </TableCell>

              <TableCell>
                {result.student?.name}
              </TableCell>

              <TableCell>
                {result.subject?.name}
              </TableCell>

              <TableCell>
                {result.examType?.name}
              </TableCell>

              <TableCell>
                {result.internalMarks}
              </TableCell>

              <TableCell>
                {result.externalMarks}
              </TableCell>

              <TableCell>
                {result.totalMarks}
              </TableCell>

              <TableCell>
                {result.percentage}%
              </TableCell>

              <TableCell>
                <Chip
                  label={result.grade}
                  color="primary"
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={result.resultStatus}
                  color={
                    result.resultStatus === "PASS"
                      ? "success"
                      : "error"
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ResultTable;