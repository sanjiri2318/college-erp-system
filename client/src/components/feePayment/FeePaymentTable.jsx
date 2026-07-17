import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function FeePaymentTable({
  feePayments,
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
              Student
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight:
                  "bold",
              }}
            >
              Amount
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight:
                  "bold",
              }}
            >
              Payment Method
            </TableCell>

            <TableCell
              sx={{
                color: "white",
                fontWeight:
                  "bold",
              }}
            >
              Date
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
          {feePayments.map(
            (payment) => (
              <TableRow
                key={payment.id}
                hover
              >
                <TableCell>
                  {
                    payment
                      .student
                      ?.name
                  }
                </TableCell>

                <TableCell>
                  ₹
                  {
                    payment.amount
                  }
                </TableCell>

                <TableCell>
                  {
                    payment.paymentMethod
                  }
                </TableCell>

                <TableCell>
                  {new Date(
                    payment.paymentDate
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(
                        payment
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

export default FeePaymentTable;