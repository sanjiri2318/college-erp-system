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
  TextField,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";

import {
  getMySubjects,
  getStudentsForMarks,
  saveInternalMarks,
} from "../../api/facultyApi";

const FacultyMarks = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [internalNumber, setInternalNumber] =
    useState(1);

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
      const res =
        await getStudentsForMarks(id);

      setStudents(res.students);

      const initialMarks = {};

      res.students.forEach((student) => {
        initialMarks[student.id] = "";
      });

      setMarks(initialMarks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkChange = (
    studentId,
    value
  ) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res =
        await saveInternalMarks({
          subjectId,
          internalNumber,
          marks,
        });

      alert(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        Internal Marks
      </Typography>

      <Box display="flex" gap={3}>
        <FormControl sx={{ minWidth: 250 }}>
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

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>
            Internal Number
          </InputLabel>

          <Select
            value={internalNumber}
            label="Internal Number"
            onChange={(e) =>
              setInternalNumber(
                e.target.value
              )
            }
          >
            <MenuItem value={1}>
              Internal 1
            </MenuItem>
            <MenuItem value={2}>
              Internal 2
            </MenuItem>
            <MenuItem value={3}>
              Internal 3
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

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
                    Name
                  </TableCell>
                  <TableCell>
                    Marks
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
                      <TextField
                        type="number"
                        value={
                          marks[
                            student.id
                          ] || ""
                        }
                        onChange={(e) =>
                          handleMarkChange(
                            student.id,
                            e.target.value
                          )
                        }
                        size="small"
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
            Save Marks
          </Button>
        </>
      )}
    </Box>
  );
};

export default FacultyMarks;