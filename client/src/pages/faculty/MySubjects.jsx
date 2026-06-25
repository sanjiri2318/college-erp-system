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

import { useEffect, useState } from "react";
import { getMySubjects } from "../../api/facultyApi";

const MySubjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getMySubjects();
        setSubjects(res.subjects);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        My Subjects
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Code</b>
              </TableCell>

              <TableCell>
                <b>Subject Name</b>
              </TableCell>

              <TableCell>
                <b>Semester</b>
              </TableCell>

              <TableCell>
                <b>Department</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>
                  {subject.code}
                </TableCell>

                <TableCell>
                  {subject.name}
                </TableCell>

                <TableCell>
                  {subject.semester}
                </TableCell>

                <TableCell>
                  {subject.department.name}
                </TableCell>
              </TableRow>
            ))}

            {subjects.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                >
                  No subjects assigned.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MySubjects;