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

function HostelTable({
  hostels,
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
              Hostel Name
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Gender
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Capacity
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Warden
            </TableCell>

            <TableCell
              align="center"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hostels.map((hostel) => (
            <TableRow
              key={hostel.id}
              hover
            >
              <TableCell>
                {hostel.name}
              </TableCell>

              <TableCell>
                {hostel.gender}
              </TableCell>

              <TableCell>
                {hostel.capacity}
              </TableCell>

              <TableCell>
                {hostel.wardenName}
              </TableCell>

              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => onEdit(hostel)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(hostel)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default HostelTable;