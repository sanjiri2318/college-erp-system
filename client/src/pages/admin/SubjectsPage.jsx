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

import { useEffect, useState } from "react";
import API from "../../api/axios";

const createEmptyFormData = () => ({
  code: "",
  name: "",
  semester: "",
  departmentId: "",
  facultyId: "",
});

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
    useState(createEmptyFormData());

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
      try {
        const res =
          await API.get(
            "/departments"
          );

        setDepartments(
          res.data.data
            .departments
        );
      } catch (err) {
        console.log(err);
      }
    };

  const loadFaculty =
    async () => {
      try {
        const res =
          await API.get(
            "/faculty"
          );

        setFaculty(
          res.data.data.faculty
        );
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    loadSubjects();
    loadDepartments();
    loadFaculty();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value ?? "",
    }));
  };

  const resetFormData = () => {
    setFormData(createEmptyFormData());
  };

  const handleAdd =
    async () => {
      try {
        await API.post(
          "/subjects",
          formData
        );

        setOpen(false);

        resetFormData();

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
      code: subject.code || "",
      name: subject.name || "",
      semester:
        subject.semester || "",
      departmentId:
        subject.departmentId ||
        "",
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
          "Delete this subject?"
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
          Subject Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetFormData();
            setOpen(true);
          }}
        >
          Add Subject
        </Button>
      </Box>

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
                Code
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
                Faculty
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
            {subjects.map(
              (subject) => (
                <TableRow
                  key={subject.id}
                  hover
                >
                  <TableCell>
                    {subject.code}
                  </TableCell>

                  <TableCell>
                    {subject.name}
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
                      variant="outlined"
                      size="small"
                      startIcon={
                        <EditIcon />
                      }
                      sx={{
                        mr: 1,
                      }}
                      onClick={() =>
                        openEdit(
                          subject
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
          Add Subject
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Code"
            name="code"
            fullWidth
            value={formData.code}
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Semester"
            name="semester"
            fullWidth
            value={formData.semester}
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
            value={formData.departmentId}
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
            value={formData.facultyId}
            onChange={
              handleChange
            }
          >
            <MenuItem value="">
              Not Assigned
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
            variant="contained"
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
              Not Assigned
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

export default SubjectsPage;