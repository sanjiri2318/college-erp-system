import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ExamTypeTable({
  examTypes,
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
              Name
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Description
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Type
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Internal
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              External
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Pass Marks
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examTypes.map((examType) => (
            <TableRow
              key={examType.id}
              hover
            >
              <TableCell>{examType.name}</TableCell>

              <TableCell>
                {examType.description}
              </TableCell>

              <TableCell>
                <Chip
                  label={
                    examType.isFinalExam
                      ? "Final"
                      : "Internal"
                  }
                  color={
                    examType.isFinalExam
                      ? "success"
                      : "primary"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell>
                {examType.maxInternalMarks}
              </TableCell>

              <TableCell>
                {examType.maxExternalMarks}
              </TableCell>

              <TableCell>
                {examType.passMarks}
              </TableCell>

              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{ mr: 1 }}
                  onClick={() =>
                    onEdit(examType)
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
                    onDelete(examType.id)
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

export default ExamTypeTable;