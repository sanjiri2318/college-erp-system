import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ExamScheduleTable({
  examSchedules,
  onEdit,
  onDelete,
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
              Exam Type
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Subject
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Faculty
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
              Date
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Time
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Hall
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Marks
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examSchedules.map((schedule) => (
            <TableRow
              key={schedule.id}
              hover
            >
              <TableCell>
                {schedule.examType?.name}
              </TableCell>

              <TableCell>
                {schedule.subject?.name}
              </TableCell>

              <TableCell>
                {schedule.faculty?.name}
              </TableCell>

              <TableCell>
                {schedule.semester}
              </TableCell>

              <TableCell>
                {new Date(
                  schedule.examDate
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {new Date(
                  schedule.startTime
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" - "}
                {new Date(
                  schedule.endTime
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>

              <TableCell>
                {schedule.hall}
              </TableCell>

              <TableCell>
                {schedule.totalMarks}
              </TableCell>

              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{ mr: 1 }}
                  onClick={() =>
                    onEdit(schedule)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() =>
                    onDelete(schedule.id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ExamScheduleTable;