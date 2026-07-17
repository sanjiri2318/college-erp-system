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

function HostelBedTable({
  hostelBeds,
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
              Bed Number
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Room
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Status
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
          {hostelBeds.map((bed) => (
            <TableRow
              key={bed.id}
              hover
            >
              <TableCell>
                {bed.bedNumber}
              </TableCell>

              <TableCell>
                {bed.hostelRoom?.roomNumber}
              </TableCell>

              <TableCell>
                {bed.status}
              </TableCell>

              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() =>
                    onEdit(bed)
                  }
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() =>
                    onDelete(bed)
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

export default HostelBedTable;