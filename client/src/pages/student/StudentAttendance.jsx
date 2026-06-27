import { useEffect, useState } from "react";
import { getStudentAttendance } from "../../api/studentApi";

import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

function StudentAttendance() {
  const [attendance, setAttendance] =
    useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res =
        await getStudentAttendance();

      console.log(
        "Student Attendance:",
        res
      );

      setAttendance(
        res.attendance || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Attendance Records
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>
                  Subject
                </strong>
              </TableCell>

              <TableCell>
                <strong>
                  Present
                </strong>
              </TableCell>

              <TableCell>
                <strong>
                  Total Classes
                </strong>
              </TableCell>

              <TableCell>
                <strong>
                  Attendance %
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attendance.length >
            0 ? (
              attendance.map(
                (
                  item,
                  index
                ) => (
                  <TableRow
                    key={index}
                  >
                    <TableCell>
                      {
                        item.subject
                      }
                    </TableCell>

                    <TableCell>
                      {
                        item.present
                      }
                    </TableCell>

                    <TableCell>
                      {
                        item.total
                      }
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight:
                          "bold",
                        color:
                          item.percentage >=
                          75
                            ? "green"
                            : "red",
                      }}
                    >
                      {
                        item.percentage
                      }
                      %
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                >
                  No attendance records
                  found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default StudentAttendance; 