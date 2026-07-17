import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import {
  getMySubjects,
  getStudentsBySubject,
  saveAttendance,
} from "../../api/facultyApi";

const FacultyAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await getMySubjects();
      setSubjects(res.subjects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubjectChange = async (e) => {
    const id = e.target.value;
    setSubjectId(id);

    try {
      const res = await getStudentsBySubject(id);

      setStudents(res.students);

      const initialAttendance = {};

      res.students.forEach((student) => {
        initialAttendance[student.id] = true;
      });

      setAttendance(initialAttendance);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSave = async () => {
    if (!subjectId) {
      alert("Please select a subject.");
      return;
    }

    if (students.length === 0) {
      alert("No students found.");
      return;
    }

    try {
      for (const student of students) {
        await saveAttendance({
          studentId: student.id,
          subjectId: Number(subjectId),
          date,
          status: attendance[student.id],
        });
      }

      alert("Attendance saved successfully.");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to save attendance."
      );
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        Attendance
      </Typography>

      {/* Subject Dropdown */}
      <FormControl
        sx={{
          minWidth: 300,
          mr: 3,
        }}
      >
        <InputLabel>
          Select Subject
        </InputLabel>

        <Select
          value={subjectId}
          label="Select Subject"
          onChange={handleSubjectChange}
        >
          {subjects.map((subject) => (
            <MenuItem
              key={subject.id}
              value={subject.id}
            >
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date Picker */}
      <TextField
        type="date"
        label="Attendance Date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      {/* Student Table */}
      {students.length > 0 && (
        <>
          <Paper sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Reg Number
                  </TableCell>

                  <TableCell>
                    Student Name
                  </TableCell>

                  <TableCell>
                    Present
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student) => (
                  <TableRow
                    key={student.id}
                  >
                    <TableCell>
                      {student.regNumber}
                    </TableCell>

                    <TableCell>
                      {student.name}
                    </TableCell>

                    <TableCell>
                      <Checkbox
                        checked={
                          attendance[
                            student.id
                          ] || false
                        }
                        onChange={() =>
                          handleCheckboxChange(
                            student.id
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Attendance
          </Button>
        </>
      )}
    </Box>
  );
};

export default FacultyAttendance;