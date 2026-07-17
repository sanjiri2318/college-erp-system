import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AuthorTable({
  authors,
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
            backgroundColor:
              "#1976d2",
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                color: "white",
                fontWeight:
                  "bold",
              }}
            >
              Name
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight:
                  "bold",
              }}
            >
              Biography
            </TableCell>

            <TableCell
              align="center"
              sx={{
                color: "white",
                fontWeight:
                  "bold",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {authors.map(
            (author) => (
              <TableRow
                key={author.id}
                hover
              >
                <TableCell>
                  {author.name}
                </TableCell>

                <TableCell>
                  {author.biography}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(author)
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(author)
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

export default AuthorTable;