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

function SubjectsPage() {
  const [subjects, setSubjects] =
    useState([]);

  const [departments, setDepartments] =
    useState([]);

  const [faculty, setFaculty] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [formData, setFormData] =
    useState({
      code: "",
      name: "",
      semester: "",
      departmentId: "",
      facultyId: "",
    });

  const loadSubjects = async () => {
    try {
      const res =
        await API.get("/subjects");

      setSubjects(
        res.data.data.subjects
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadDepartments =
    async () => {
      const res =
        await API.get(
          "/departments"
        );

      setDepartments(
        res.data.data
          .departments
      );
    };

  const loadFaculty =
    async () => {
      const res =
        await API.get(
          "/faculty"
        );

      setFaculty(
        res.data.data.faculty
      );
    };

  useEffect(() => {
    loadSubjects();
    loadDepartments();
    loadFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd =
    async () => {
      try {
        await API.post(
          "/subjects",
          formData
        );

        setOpen(false);

        setFormData({
          code: "",
          name: "",
          semester: "",
          departmentId: "",
          facultyId: "",
        });

        loadSubjects();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  const openEdit = (subject) => {
    setSelectedSubject(
      subject
    );

    setFormData({
      code: subject.code,
      name: subject.name,
      semester:
        subject.semester,
      departmentId:
        subject.departmentId,
      facultyId:
        subject.facultyId ||
        "",
    });

    setEditOpen(true);
  };

  const handleUpdate =
    async () => {
      try {
        await API.put(
          `/subjects/${selectedSubject.id}`,
          formData
        );

        setEditOpen(false);

        loadSubjects();
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
          "Delete subject?"
        )
      )
        return;

      try {
        await API.delete(
          `/subjects/${id}`
        );

        loadSubjects();
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
        Subjects
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() =>
          setOpen(true)
        }
      >
        Add Subject
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Code
              </TableCell>

              <TableCell>
                Name
              </TableCell>

              <TableCell>
                Semester
              </TableCell>

              <TableCell>
                Department
              </TableCell>

              <TableCell>
                Faculty
              </TableCell>

              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {subjects.map(
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
                    {
                      subject
                        .department
                        ?.code
                    }
                  </TableCell>

                  <TableCell>
                    {subject
                      .faculty
                      ?.name ||
                      "Not Assigned"}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() =>
                        openEdit(
                          subject
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
                      onClick={() =>
                        handleDelete(
                          subject.id
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
          Add Subject
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Code"
            name="code"
            fullWidth
            onChange={
              handleChange
            }
          />

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

          <TextField
            select
            margin="dense"
            label="Faculty"
            name="facultyId"
            fullWidth
            onChange={
              handleChange
            }
          >
            <MenuItem value="">
              None
            </MenuItem>

            {faculty.map(
              (f) => (
                <MenuItem
                  key={f.id}
                  value={f.id}
                >
                  {f.name}
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
              handleAdd
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
          Edit Subject
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Code"
            name="code"
            fullWidth
            value={
              formData.code
            }
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={
              formData.name
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
              formData.semester
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
              formData.departmentId
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

          <TextField
            select
            margin="dense"
            label="Faculty"
            name="facultyId"
            fullWidth
            value={
              formData.facultyId
            }
            onChange={
              handleChange
            }
          >
            <MenuItem value="">
              None
            </MenuItem>

            {faculty.map(
              (f) => (
                <MenuItem
                  key={f.id}
                  value={f.id}
                >
                  {f.name}
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

export default SubjectsPage;