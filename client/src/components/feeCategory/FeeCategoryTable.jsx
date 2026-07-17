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

function FeeCategoryTable({
  feeCategories,
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
              Category Name
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Description
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
          {feeCategories.map(
            (category) => (
              <TableRow
                key={category.id}
                hover
              >
                <TableCell>
                  {category.name}
                </TableCell>

                <TableCell>
                  {category.description}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(
                        category
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(
                        category
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

export default FeeCategoryTable;