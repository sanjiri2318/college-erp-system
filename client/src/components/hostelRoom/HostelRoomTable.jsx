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

function HostelRoomTable({
  hostelRooms,
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
              Room Number
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Block
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Capacity
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
          {hostelRooms.map((room) => (
            <TableRow
              key={room.id}
              hover
            >
              <TableCell>
                {room.roomNumber}
              </TableCell>

              <TableCell>
                {room.hostelBlock?.name}
              </TableCell>

              <TableCell>
                {room.capacity}
              </TableCell>

              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() =>
                    onEdit(room)
                  }
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    onDelete(room)
                  }
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

export default HostelRoomTable;