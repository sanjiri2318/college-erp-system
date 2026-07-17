import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

function CGPATable({
  cgpas,
}) {
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
              Academic Year
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Total Credits
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Earned Credits
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              CGPA
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {cgpas.map((cgpa) => (
            <TableRow
              key={cgpa.id}
              hover
            >
              <TableCell>
                {cgpa.student?.regNumber}
              </TableCell>

              <TableCell>
                {cgpa.student?.name}
              </TableCell>

              <TableCell>
                {cgpa.academicYear}
              </TableCell>

              <TableCell>
                {cgpa.totalCredits}
              </TableCell>

              <TableCell>
                {cgpa.earnedCredits}
              </TableCell>

              <TableCell>
                <Chip
                  label={cgpa.cgpa}
                  color="primary"
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

export default CGPATable;