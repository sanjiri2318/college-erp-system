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

function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedFaculty, setSelectedFaculty] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      departmentId: "",
    });

  const loadFaculty = async () => {
    try {
      const res =
        await API.get("/faculty");

      setFaculty(
        res.data.data.faculty
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

  useEffect(() => {
    loadFaculty();
    loadDepartments();
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
          "/faculty",
          formData
        );

        setOpen(false);

        setFormData({
          name: "",
          email: "",
          departmentId: "",
        });

        loadFaculty();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  const openEdit = (item) => {
    setSelectedFaculty(item);

    setFormData({
      name: item.name,
      departmentId:
        item.departmentId,
    });

    setEditOpen(true);
  };

  const handleUpdate =
    async () => {
      try {
        await API.put(
          `/faculty/${selectedFaculty.id}`,
          formData
        );

        setEditOpen(false);
        loadFaculty();
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
          "Delete this faculty?"
        )
      )
        return;

      try {
        await API.delete(
          `/faculty/${id}`
        );

        loadFaculty();
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
          Faculty Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            setOpen(true)
          }
        >
          Add Faculty
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
                Employee ID
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
            {faculty.map((f) => (
              <TableRow
                key={f.id}
                hover
              >
                <TableCell>
                  {f.empId}
                </TableCell>

                <TableCell>
                  {f.name}
                </TableCell>

                <TableCell>
                  {f.user?.email}
                </TableCell>

                <TableCell>
                  {
                    f.department
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
                      openEdit(f)
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
                        f.id
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Faculty */}

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
          Add Faculty
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
              handleAdd
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Faculty */}

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
          Edit Faculty
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

export default FacultyPage;