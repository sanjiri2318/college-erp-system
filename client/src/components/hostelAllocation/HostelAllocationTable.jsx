import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function HostelAllocationTable({
  hostelAllocations,
  onCheckout,
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
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Student
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Bed
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Check In
            </TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Check Out
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
          {hostelAllocations.map(
            (allocation) => (
              <TableRow
                key={allocation.id}
                hover
              >
                <TableCell>
                  {allocation.student?.name}
                </TableCell>

                <TableCell>
                  {allocation.hostelBed
                    ?.bedNumber}
                </TableCell>

                <TableCell>
                  {allocation.checkInDate}
                </TableCell>

                <TableCell>
                  {allocation.checkOutDate ||
                    "-"}
                </TableCell>

                <TableCell align="center">
                  {!allocation.checkOutDate && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        onCheckout(
                          allocation
                        )
                      }
                    >
                      Checkout
                    </Button>
                  )}

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(
                        allocation
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

export default HostelAllocationTable;