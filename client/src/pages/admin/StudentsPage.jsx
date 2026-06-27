import { useEffect, useState } from "react";
import API from "../../api/axios";

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

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

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
      const res = await API.get("/students");
      setStudents(res.data.data.students);
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
          "Delete this student?"
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
      {/* Header */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Students Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            setOpen(true)
          }
        >
          Add Student
        </Button>
      </Box>

      {/* Table */}

      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor:
                "#1976d2",
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Reg Number
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Name
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Email
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Semester
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Department
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map(
              (student) => (
                <TableRow
                  key={student.id}
                  hover
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
                      variant="outlined"
                      size="small"
                      startIcon={
                        <EditIcon />
                      }
                      sx={{ mr: 1 }}
                      onClick={() =>
                        openEdit(
                          student
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={
                        <DeleteIcon />
                      }
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor:
              "#1976d2",
            color: "white",
            fontWeight:
              "bold",
          }}
        >
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
            variant="contained"
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            bgcolor:
              "#1976d2",
            color: "white",
            fontWeight:
              "bold",
          }}
        >
          Edit Student
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={
              formData.name ||
              ""
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
            variant="contained"
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

export default StudentsPage;