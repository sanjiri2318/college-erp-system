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

function FeeStructureTable({
  feeStructures,
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
              Category
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
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Academic Year
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
          {feeStructures.map(
            (structure) => (
              <TableRow
                key={structure.id}
                hover
              >
                <TableCell>
                  {structure.feeCategory
                    ?.name}
                </TableCell>

                <TableCell>
                  ₹
                  {structure.amount}
                </TableCell>

                <TableCell>
                  {
                    structure.academicYear
                  }
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(
                        structure
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(
                        structure
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

export default FeeStructureTable;