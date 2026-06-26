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

import { useEffect, useState } from "react";
import API from "../../api/axios";

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const loadDepartments = async () => {
    try {
      const res = await API.get("/departments");

      setDepartments(
        res.data.data.departments
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
          err.response?.data?.message
        );
      }
    };

  const openEdit = (department) => {
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
          err.response?.data?.message
        );
      }
    };

  const handleDelete =
    async (id) => {
      if (
        !window.confirm(
          "Delete department?"
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
          err.response?.data?.message
        );
      }
    };

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
      >
        Departments
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() =>
          setOpen(true)
        }
      >
        Add Department
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
                      onClick={() =>
                        openEdit(
                          department
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
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
      >
        <DialogTitle>
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
      >
        <DialogTitle>
          Edit Department
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Department Name"
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
            label="Department Code"
            name="code"
            fullWidth
            value={
              formData.code || ""
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