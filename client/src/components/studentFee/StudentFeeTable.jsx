import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function StudentFeeTable({
  studentFees,
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
              Student
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Fee Category
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Amount
            </TableCell>

            <TableCell
              align="center"
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
          {studentFees.map(
            (studentFee) => (
              <TableRow
                key={studentFee.id}
                hover
              >
                <TableCell>
                  {studentFee.student?.name}
                </TableCell>

                <TableCell>
                  {
                    studentFee
                      .feeCategory
                      ?.name
                  }
                </TableCell>

                <TableCell>
                  ₹
                  {
                    studentFee.amount
                  }
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(
                        studentFee
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(
                        studentFee
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default StudentFeeTable;