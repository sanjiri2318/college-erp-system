import { useEffect, useState } from "react";
import { getStudentMarks } from "../../api/studentApi";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function StudentMarks() {
  const [marks, setMarks] =
    useState([]);

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
    try {
      const res =
        await getStudentMarks();

      console.log(
        "Student Marks:",
        res
      );

      setMarks(
        res.marks || []
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
        Internal Marks
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
                  Internal No
                </strong>
              </TableCell>

              <TableCell>
                <strong>
                  Marks Obtained
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {marks.length > 0 ? (
              marks.map((mark) => (
                <TableRow
                  key={mark.id}
                >
                  <TableCell>
                    {
                      mark.subject
                        ?.name
                    }
                  </TableCell>

                  <TableCell>
                    Internal{" "}
                    {
                      mark.internalNumber
                    }
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight:
                        "bold",
                      color:
                        mark.marksObtained >=
                        50
                          ? "green"
                          : "red",
                    }}
                  >
                    {
                      mark.marksObtained
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                >
                  No internal marks
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

export default StudentMarks;