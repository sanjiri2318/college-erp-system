import { useEffect, useState } from "react";
import { getStudentMarks } from "../../api/studentApi";

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function StudentMarks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    loadMarks();
  }, []);

  const loadMarks = async () => {
    try {
      const res = await getStudentMarks();
      setMarks(res.marks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Internal Marks
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Internal No</TableCell>
              <TableCell>Marks Obtained</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {marks.map((mark) => (
              <TableRow key={mark.id}>
                <TableCell>{mark.subject.name}</TableCell>
                <TableCell>{mark.internalNumber}</TableCell>
                <TableCell>{mark.marksObtained}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default StudentMarks;