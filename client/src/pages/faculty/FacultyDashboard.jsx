import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
  Paper,
  Divider,
  LinearProgress,
} from "@mui/material";

import {
  MenuBook,
  Groups,
  FactCheck,
  Assignment,
  CalendarMonth,
  ArrowForward,
} from "@mui/icons-material";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { getFacultyDashboard } from "../../api/facultyApi";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const { user } =
    useContext(AuthContext);

  const [dashboard, setDashboard] =
    useState({
      facultyName: "",
      totalSubjectsHandled: 0,
      totalStudents: 0,
      attendanceMarkedToday: 0,
      internalMarksEntered: 0,
    });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data =
        await getFacultyDashboard();

      setDashboard(data);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Subjects",
      value:
        dashboard.totalSubjectsHandled,
      color: "#1976d2",
      icon: <MenuBook />,
    },
    {
      title: "Students",
      value:
        dashboard.totalStudents,
      color: "#2e7d32",
      icon: <Groups />,
    },
    {
      title: "Attendance Today",
      value:
        dashboard.attendanceMarkedToday,
      color: "#ed6c02",
      icon: <FactCheck />,
    },
    {
      title: "Internal Marks",
      value:
        dashboard.internalMarksEntered,
      color: "#9c27b0",
      icon: <Assignment />,
    },
  ];

  return (
    <Box p={4}>
      {/* Welcome Banner */}

      <Paper
        elevation={4}
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#1976d2,#42a5f5)",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          👋 Welcome,
          {" "}
          {dashboard.facultyName ||
            user?.name}
        </Typography>

        <Typography mt={1}>
          Manage your classes,
          attendance,
          internal marks,
          and timetable from one place.
        </Typography>
      </Paper>

      {/* Statistics */}

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={card.title}
          >
            <Card
              elevation={5}
              sx={{
                borderRadius: 4,
                transition: ".3s",
                "&:hover": {
                  transform:
                    "translateY(-6px)",
                },
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      mt={1}
                    >
                      {card.value}
                    </Typography>
                  </Box>

                  <Avatar
                    sx={{
                      bgcolor:
                        card.color,
                      width: 60,
                      height: 60,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
            {/* Today's Classes + Quick Actions */}

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Today's Classes */}

        <Grid item xs={12} lg={8}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                📅 Today's Classes
              </Typography>

              <CalendarMonth color="primary" />
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {/* Demo Cards */}

            {dashboard.todayClasses?.length > 0 ? (
              dashboard.todayClasses.map((cls) => (
                <Paper
                  key={cls.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography fontWeight="bold">
                        {cls.subject.name}
                      </Typography>

                      <Typography color="text.secondary">
                        Period {cls.period}
                      </Typography>

                      <Typography color="text.secondary">
                        Room {cls.roomNumber || "-"}
                      </Typography>
                    </Box>

                    <Stack spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate("/faculty/attendance")
                        }
                      >
                        Attendance
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          navigate("/faculty/marks")
                        }
                      >
                        Marks
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              ))
            ) : (
              <Typography color="text.secondary">
                No classes scheduled today.
              </Typography>
)}
            ))
          </Paper>
        </Grid>

        {/* Quick Actions */}

        <Grid item xs={12} lg={4}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              mb={2}
            >
              ⚡ Quick Actions
            </Typography>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<FactCheck />}
                onClick={() =>
                  navigate(
                    "/faculty/attendance"
                  )
                }
              >
                Take Attendance
              </Button>

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<Assignment />}
                onClick={() =>
                  navigate(
                    "/faculty/marks"
                  )
                }
              >
                Enter Marks
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<MenuBook />}
                onClick={() =>
                  navigate(
                    "/faculty/subjects"
                  )
                }
              >
                My Subjects
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Performance Summary */}

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Attendance Progress
            </Typography>

            <Typography
              mt={2}
              mb={1}
            >
              Today's Attendance
            </Typography>

            <LinearProgress
              variant="determinate"
              value={82}
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />

            <Typography mt={1}>
              82%
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Marks Progress
            </Typography>

            <Typography
              mt={2}
              mb={1}
            >
              Internal Marks
            </Typography>

            <LinearProgress
              color="secondary"
              variant="determinate"
              value={64}
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />

            <Typography mt={1}>
              64%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
            {/* Recent Activity */}

      <Grid
        container
        spacing={3}
        sx={{ mt: 1 }}
      >
        <Grid item xs={12}>
          <Paper
            elevation={5}
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                📰 Recent Activity
              </Typography>

              <Button
                endIcon={<ArrowForward />}
                size="small"
              >
                View All
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {[
              "Attendance submitted for DBMS",
              "Internal marks uploaded for Java Programming",
              "New timetable assigned for Thursday",
              "Semester report generated successfully",
            ].map((activity, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor:
                      "#f5f7fa",
                  },
                }}
              >
                <Typography>
                  {activity}
                </Typography>
              </Paper>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}

      <Typography
        align="center"
        color="text.secondary"
        sx={{
          mt: 5,
          fontSize: 14,
        }}
      >
        College ERP • Faculty Dashboard
      </Typography>
    </Box>
  );
};

export default FacultyDashboard;