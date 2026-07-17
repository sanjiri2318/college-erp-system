import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const details =
    profile.role === "STUDENT"
      ? profile.student
      : profile.faculty;

  const displayName =
    profile.role === "ADMIN"
      ? "Administrator"
      : details?.name;

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        My Profile
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 4,
          maxWidth: 1100,
        }}
      >
        {/* Avatar */}
        <Box
          display="flex"
          mb={5}
          sx={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "primary.main",
              fontSize: 36,
              mb: 2,
            }}
          >
            {displayName?.charAt(0)}
          </Avatar>

          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {displayName}
          </Typography>

          <Typography color="text.secondary">
            {profile.role}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {/* Email */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Email
            </Typography>

            <Typography variant="h6">
              {profile.email}
            </Typography>
          </Grid>

          {/* Role */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Role
            </Typography>

            <Typography variant="h6">
              {profile.role}
            </Typography>
          </Grid>

          {/* STUDENT */}
          {profile.role === "STUDENT" && (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Name
                </Typography>

                <Typography variant="h6">
                  {details?.name}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Registration Number
                </Typography>

                <Typography variant="h6">
                  {details?.regNumber}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Semester
                </Typography>

                <Typography variant="h6">
                  {details?.semester}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Department
                </Typography>

                <Typography variant="h6">
                  {details?.department?.name}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Phone
                </Typography>

                <Typography variant="h6">
                  {details?.phone || "-"}
                </Typography>
              </Grid>
            </>
          )}

          {/* FACULTY */}
          {profile.role === "FACULTY" && (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Name
                </Typography>

                <Typography variant="h6">
                  {details?.name}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Employee ID
                </Typography>

                <Typography variant="h6">
                  {details?.empId}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Department
                </Typography>

                <Typography variant="h6">
                  {details?.department?.name}
                </Typography>
              </Grid>
            </>
          )}

          {/* ADMIN */}
          {profile.role === "ADMIN" && (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Created At
              </Typography>

              <Typography variant="h6">
                {new Date(
                  profile.createdAt
                ).toLocaleDateString()}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}

export default Profile;