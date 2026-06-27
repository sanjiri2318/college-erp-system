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
    if (value > 100) return;

    setMarks((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSave = async () => {
    if (!subjectId) {
      alert("Please select a subject.");
      return;
    }

    try {
      for (const studentId in marks) {
        const mark =
          marks[studentId];

        if (
          mark === "" ||
          mark === null
        ) {
          continue;
        }

        await saveInternalMarks({
          studentId:
            Number(studentId),
          subjectId:
            Number(subjectId),
          internalNumber:
            Number(
              internalNumber
            ),
          marksObtained:
            Number(mark),
        });
      }

      alert(
        "Marks saved successfully."
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to save marks."
      );
    }
  };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        mb={4}
      >
        Internal Marks
      </Typography>

      <Box
        display="flex"
        gap={3}
        flexWrap="wrap"
      >
        <FormControl
          sx={{ minWidth: 250 }}
        >
          <InputLabel>
            Select Subject
          </InputLabel>

          <Select
            value={subjectId}
            label="Select Subject"
            onChange={
              handleSubjectChange
            }
          >
            {subjects.map(
              (subject) => (
                <MenuItem
                  key={
                    subject.id
                  }
                  value={
                    subject.id
                  }
                >
                  {subject.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <FormControl
          sx={{ minWidth: 200 }}
        >
          <InputLabel>
            Internal Number
          </InputLabel>

          <Select
            value={
              internalNumber
            }
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
                {students.map(
                  (student) => (
                    <TableRow
                      key={
                        student.id
                      }
                    >
                      <TableCell>
                        {
                          student.regNumber
                        }
                      </TableCell>

                      <TableCell>
                        {
                          student.name
                        }
                      </TableCell>

                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          value={
                            marks[
                              student
                                .id
                            ] || ""
                          }
                          inputProps={{
                            min: 0,
                            max: 100,
                          }}
                          onChange={(
                            e
                          ) =>
                            handleMarkChange(
                              student.id,
                              e.target
                                .value
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Paper>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={
              handleSave
            }
          >
            Save Marks
          </Button>
        </>
      )}
    </Box>
  );
};

export default FacultyMarks;