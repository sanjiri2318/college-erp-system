import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

function SemesterGPATable({
  semesterGPAs,
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
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Reg No
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Student
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Semester
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Academic Year
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Total Credits
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Earned Credits
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              GPA
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {semesterGPAs.map(
            (semesterGPA) => (
              <TableRow
                key={semesterGPA.id}
                hover
              >
                <TableCell>
                  {
                    semesterGPA.student
                      ?.regNumber
                  }
                </TableCell>

                <TableCell>
                  {
                    semesterGPA.student
                      ?.name
                  }
                </TableCell>

                <TableCell>
                  {
                    semesterGPA.semester
                  }
                </TableCell>

                <TableCell>
                  {
                    semesterGPA.academicYear
                  }
                </TableCell>

                <TableCell>
                  {
                    semesterGPA.totalCredits
                  }
                </TableCell>

                <TableCell>
                  {
                    semesterGPA.earnedCredits
                  }
                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      semesterGPA.gpa
                    }
                    color="primary"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default SemesterGPATable;