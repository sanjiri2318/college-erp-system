import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MarkEntryTable({
  markEntries,
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
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Student
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Subject
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Exam Type
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Faculty
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Marks
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Status
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {markEntries.map((entry) => (
            <TableRow key={entry.id} hover>
              <TableCell>
                {entry.student?.name}
              </TableCell>

              <TableCell>
                {entry.subject?.name}
              </TableCell>

              <TableCell>
                {entry.examType?.name}
              </TableCell>

              <TableCell>
                {entry.faculty?.name}
              </TableCell>

              <TableCell>
                {entry.marks} / {entry.maxMarks}
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  label={entry.status}
                  color={
                    entry.status === "PUBLISHED"
                      ? "success"
                      : entry.status === "LOCKED"
                      ? "warning"
                      : "default"
                  }
                />
              </TableCell>

              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{ mr: 1 }}
                  onClick={() => onEdit(entry)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() =>
                    onDelete(entry.id)
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

export default MarkEntryTable;