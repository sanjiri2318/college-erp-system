import { useEffect, useState } from "react";
import { getStudentSubjects } from "../../api/studentApi";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function StudentSubjects() {
  const [subjects, setSubjects] =
    useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res =
        await getStudentSubjects();

      console.log(
        "Student Subjects:",
        res
      );

      setSubjects(
        res.subjects || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        My Subjects
      </Typography>

      <TableContainer
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>
                  Subject Code
                </strong>
              </TableCell>

              <TableCell>
                <strong>
                  Subject Name
                </strong>
              </TableCell>

              <TableCell>
                <strong>
                  Semester
                </strong>
              </TableCell>

              <TableCell>
                <strong>
                  Faculty
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {subjects.length >
            0 ? (
              subjects.map(
                (subject) => (
                  <TableRow
                    key={
                      subject.id
                    }
                  >
                    <TableCell>
                      {
                        subject.code
                      }
                    </TableCell>

                    <TableCell>
                      {
                        subject.name
                      }
                    </TableCell>

                    <TableCell>
                      {
                        subject.semester
                      }
                    </TableCell>

                    <TableCell>
                      {subject
                        .faculty
                        ?.name ||
                        "Not Assigned"}
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
                  No subjects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StudentSubjects;