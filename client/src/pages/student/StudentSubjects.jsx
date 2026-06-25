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
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getStudentSubjects();
        setSubjects(res.subjects);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        My Subjects
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Code</strong>
              </TableCell>

              <TableCell>
                <strong>Subject Name</strong>
              </TableCell>

              <TableCell>
                <strong>Semester</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.code}</TableCell>

                <TableCell>{subject.name}</TableCell>

                <TableCell>{subject.semester}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StudentSubjects;