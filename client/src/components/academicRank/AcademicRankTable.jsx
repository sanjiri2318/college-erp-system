import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function AcademicRankTable({ ranks = [] }) {
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
              Overall Rank
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Department Rank
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Reg No
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Student
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Department
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Academic Year
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              CGPA
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ranks.length > 0 ? (
            ranks.map((rank) => (
              <TableRow
                key={rank.id}
                hover
              >
                <TableCell>
                  <Chip
                    label={`#${rank.overallRank}`}
                    color="primary"
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={`#${rank.departmentRank}`}
                    color="secondary"
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {rank.student?.regNumber}
                </TableCell>

                <TableCell>
                  {rank.student?.name}
                </TableCell>

                <TableCell>
                  {rank.student?.department?.name}
                </TableCell>

                <TableCell>
                  {rank.academicYear}
                </TableCell>

                <TableCell>
                  {rank.cgpa}
                </TableCell>

                <TableCell>
                  <Chip
                    label="Ranked"
                    color="success"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
              >
                No academic ranks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default AcademicRankTable;