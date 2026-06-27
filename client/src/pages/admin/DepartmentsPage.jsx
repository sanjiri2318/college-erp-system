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
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function DepartmentsPage() {
  const [departments, setDepartments] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [
    selectedDepartment,
    setSelectedDepartment,
  ] = useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      code: "",
    });

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
    loadDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAddDepartment =
    async () => {
      try {
        await API.post(
          "/departments",
          formData
        );

        setOpen(false);

        setFormData({
          name: "",
          code: "",
        });

        loadDepartments();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  const openEdit = (
    department
  ) => {
    setSelectedDepartment(
      department
    );

    setFormData({
      name: department.name,
      code: department.code,
    });

    setEditOpen(true);
  };

  const handleUpdate =
    async () => {
      try {
        await API.put(
          `/departments/${selectedDepartment.id}`,
          formData
        );

        setEditOpen(false);

        loadDepartments();
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
          "Delete this department?"
        )
      )
        return;

      try {
        await API.delete(
          `/departments/${id}`
        );

        loadDepartments();
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
          Department Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            setOpen(true)
          }
        >
          Add Department
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
                Department Code
              </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Department Name
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
            {departments.map(
              (department) => (
                <TableRow
                  key={
                    department.id
                  }
                  hover
                >
                  <TableCell>
                    {
                      department.code
                    }
                  </TableCell>

                  <TableCell>
                    {
                      department.name
                    }
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
                          department
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
                          department.id
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
          Add Department
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Department Name"
            name="name"
            fullWidth
            onChange={
              handleChange
            }
          />

          <TextField
            margin="dense"
            label="Department Code"
            name="code"
            fullWidth
            onChange={
              handleChange
            }
          />
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
              handleAddDepartment
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
          Edit Department
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Department Name"
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
            label="Department Code"
            name="code"
            fullWidth
            value={
              formData.code ||
              ""
            }
            onChange={
              handleChange
            }
          />
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

export default DepartmentsPage;