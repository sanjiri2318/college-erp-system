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

function StudentTable({
  students,
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
              Reg Number
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Name
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Email
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
              Department
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
          {students.map((student) => (
            <TableRow
              key={student.id}
              hover
            >
              <TableCell>
                {student.regNumber}
              </TableCell>

              <TableCell>
                {student.name}
              </TableCell>

              <TableCell>
                {student.user?.email}
              </TableCell>

              <TableCell>
                {student.semester}
              </TableCell>

              <TableCell>
                {student.department?.code}
              </TableCell>

              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{ mr: 1 }}
                  onClick={() =>
                    onEdit(student)
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
                    onDelete(student.id)
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

export default StudentTable;