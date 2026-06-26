import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "../../api/axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      semester: "",
      departmentId: "",
    });

  const loadStudents = async () => {
    try {
      const res =
        await API.get("/students");

      setStudents(
        res.data.data.students
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadDepartments = async () => {
    try {
      const res =
        await API.get("/departments");

      setDepartments(
        res.data.data.departments
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStudents();
    loadDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAddStudent =
    async () => {
      try {
        await API.post(
          "/students",
          formData
        );

        setOpen(false);

        setFormData({
          name: "",
          email: "",
          phone: "",
          semester: "",
          departmentId: "",
        });

        loadStudents();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  const openEdit = (student) => {
    setSelectedStudent(student);

    setFormData({
      name: student.name,
      phone: student.phone,
      semester:
        student.semester,
      departmentId:
        student.departmentId,
    });

    setEditOpen(true);
  };

  const handleUpdate =
    async () => {
      try {
        await API.put(
          `/students/${selectedStudent.id}`,
          formData
        );

        setEditOpen(false);

        loadStudents();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete student?"
        )
      )
        return;

      try {
        await API.delete(
          `/students/${id}`
        );

        loadStudents();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
      >
        Students
      </Typography>

      <Button
        variant="contained"
        onClick={() =>
          setOpen(true)
        }
        sx={{ mb: 2 }}
      >
        Add Student
      </Button>

      <Paper>
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
                Email
              </TableCell>
              <TableCell>
                Semester
              </TableCell>
              <TableCell>
                Department
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map(
              (student) => (
                <TableRow
                  key={student.id}
                >
                  <TableCell>
                    {
                      student.regNumber
                    }
                  </TableCell>

                  <TableCell>
                    {student.name}
                  </TableCell>

                  <TableCell>
                    {
                      student.user
                        ?.email
                    }
                  </TableCell>

                  <TableCell>
                    {
                      student.semester
                    }
                  </TableCell>

                  <TableCell>
                    {
                      student
                        .department
                        ?.code
                    }
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() =>
                        openEdit(
                          student
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
                      onClick={() =>
                        handleDelete(
                          student.id
                        )
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Dialog */}

      <Dialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
      >
        <DialogTitle>
          Add Student
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Semester"
            name="semester"
            fullWidth
            onChange={
              handleChange
            }
          />

          <TextField
            select
            margin="dense"
            label="Department"
            name="departmentId"
            fullWidth
            onChange={
              handleChange
            }
          >
            {departments.map(
              (d) => (
                <MenuItem
                  key={d.id}
                  value={d.id}
                >
                  {d.name}
                </MenuItem>
              )
            )}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={
              handleAddStudent
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}

      <Dialog
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
      >
        <DialogTitle>
          Edit Student
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={
              formData.name || ""
            }
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={
              formData.phone ||
              ""
            }
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Semester"
            name="semester"
            fullWidth
            value={
              formData.semester ||
              ""
            }
            onChange={
              handleChange
            }
          />

          <TextField
            select
            margin="dense"
            label="Department"
            name="departmentId"
            fullWidth
            value={
              formData.departmentId ||
              ""
            }
            onChange={
              handleChange
            }
          >
            {departments.map(
              (d) => (
                <MenuItem
                  key={d.id}
                  value={d.id}
                >
                  {d.name}
                </MenuItem>
              )
            )}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setEditOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={
              handleUpdate
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Students;