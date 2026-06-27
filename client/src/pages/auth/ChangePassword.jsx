import { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(
        "New password and confirm password do not match."
      );
      return;
    }

    if (newPassword.length < 8) {
      alert(
        "Password must be at least 8 characters."
      );
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Password changed successfully. Please login again."
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to change password"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Paper sx={{ p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
          >
            Change Password
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Change Password
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default ChangePassword;