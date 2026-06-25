import { useEffect, useState } from "react";
import { getStudentAttendance } from "../../api/studentApi";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await getStudentAttendance();
      setAttendance(res.attendance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Attendance Records
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Present</TableCell>
              <TableCell>Total Classes</TableCell>
              <TableCell>Attendance %</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attendance.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.present}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{item.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default StudentAttendance;