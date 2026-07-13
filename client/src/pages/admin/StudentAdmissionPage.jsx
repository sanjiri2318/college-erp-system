import { useEffect, useState } from "react";
import API from "../../api/axios";
import { createStudent } from "../../api/studentApi";

import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

function StudentAdmissionPage() {
  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    semester: "",
    departmentId: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data.data.departments);
    } catch {
      setError("Failed to load departments.");
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      semester: "",
      departmentId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await createStudent(formData);

      const student = res.data.student;

      setSuccess(
        `Student created successfully.

Registration No : ${student.regNumber}

Default Password : student123`
      );

      resetForm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create student."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Student Admission
      </Typography>

      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 900,
        }}
      >
        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
          >
            {success}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Student Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    Semester {sem}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                select
                label="Department"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              >
                {departments.map((dept) => (
                  <MenuItem
                    key={dept.id}
                    value={dept.id}
                  >
                    {dept.name} ({dept.code})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create Student Account"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default StudentAdmissionPage;