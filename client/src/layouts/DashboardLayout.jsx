import {
  Outlet,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

function GlassItem({ to, text }) {
  return (
    <ListItem disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        component={Link}
        to={to}
        sx={{
          borderRadius: "20px",
          color: "#222",
          "&:hover": {
            background: "rgba(255,255,255,0.45)",
          },
        }}
      >
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
    });
  };

  if (
    location.pathname ===
    "/change-password"
  ) {
    return <Outlet />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f8cdda 0%, #f6d365 100%)",
      }}
    >
      {/* Navbar */}

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background:
            "rgba(255,255,255,0.15)",
          backdropFilter:
            "blur(25px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.25)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#222",
            }}
          >
            College ERP
          </Typography>

          <Typography
            sx={{
              mr: 3,
              color: "#222",
              fontWeight: 600,
            }}
          >
            {user?.role}
          </Typography>

          <Button
            onClick={logout}
            sx={{
              borderRadius: "30px",
              background:
                "rgba(255,255,255,0.45)",
              color: "#222",
              px: 3,
              "&:hover": {
                background:
                  "rgba(255,255,255,0.7)",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}

      <Box
        sx={{
          width: 280,
          p: 3,
          mt: 10,
        }}
      >
        <Paper
          sx={{
            p: 2,
            borderRadius: "35px",
            background:
              "rgba(255,255,255,0.18)",
            backdropFilter:
              "blur(30px)",
            border:
              "1px solid rgba(255,255,255,0.3)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          <List>

            {/* ADMIN */}

            {user?.role === "ADMIN" && (
              <>
                <GlassItem
                  to="/admin"
                  text="Dashboard"
                />

                <Divider sx={{ my: 1 }} />

                <GlassItem
                  to="/admin/students"
                  text="Students"
                />

                <GlassItem
                  to="/admin/faculty"
                  text="Faculty"
                />

                <GlassItem
                  to="/admin/departments"
                  text="Departments"
                />

                <GlassItem
                  to="/admin/subjects"
                  text="Subjects"
                />

                <GlassItem
                  to="/admin/exam-types"
                  text="Exam Types"
                />

                <GlassItem
                  to="/admin/exam-schedules"
                  text="Exam Schedule"
                />

                <GlassItem
                  to="/admin/mark-entries"
                  text="Mark Entries"
                />

                <GlassItem
                  to="/admin/results"
                  text="Results"
                />

                <GlassItem
                  to="/admin/semester-gpa"
                  text="Semester GPA"
                />

                <GlassItem
                  to="/admin/cgpa"
                  text="CGPA"
                />

                <GlassItem
                  to="/admin/transcript"
                  text="Transcript"
                />

                {/* NEW MENU */}
                <GlassItem
                  to="/admin/academic-rank"
                  text="Academic Rank"
                />

                <GlassItem
                  to="/admin/hostels"
                  text="Hostels"
                />

                <GlassItem
                  to="/admin/hostel-blocks"
                  text="Hostel Blocks"
                />

                <GlassItem
                  to="/admin/hostel-rooms"
                  text="Hostel Rooms"
                />

                <GlassItem
                  to="/admin/hostel-beds"
                  text="Hostel Beds"
                />

                <GlassItem
                  to="/admin/hostel-allocations"
                  text="Hostel Allocations"
                />

                <GlassItem
                  to="/admin/hostel-beds"
                  text="Hostel Beds"
                />

                <GlassItem
                  to="/admin/fee-categories"
                  text="Fee Categories"
                />

                <GlassItem
                  to="/admin/fee-structures"
                  text="Fee Structures"
                />

                <GlassItem
                  to="/admin/student-fees"
                  text="Student Fees"
                />

                <GlassItem
                  to="/admin/fee-payments"
                  text="Fee Payments"
                />

                <GlassItem
                  to="/admin/authors"
                  text="Authors"
                />

                <GlassItem
                  to="/admin/publishers"
                  text="Publishers"
                />

                <GlassItem
                  to="/admin/timetable"
                  text="Timetable"
                />

                <Divider sx={{ my: 1 }} />

                <GlassItem
                  to="/profile"
                  text="Profile"
                />

                <GlassItem
                  to="/change-password"
                  text="Change Password"
                />
              </>
            )}

            {/* FACULTY */}

            {user?.role ===
              "FACULTY" && (
              <>
                <GlassItem
                  to="/faculty"
                  text="Dashboard"
                />

                <GlassItem
                  to="/faculty/subjects"
                  text="My Subjects"
                />

                <GlassItem
                  to="/faculty/attendance"
                  text="Attendance"
                />

                <GlassItem
                  to="/faculty/marks"
                  text="Internal Marks"
                />

                <GlassItem
                  to="/faculty/timetable"
                  text="My Timetable"
                />

                <Divider sx={{ my: 1 }} />

                <GlassItem
                  to="/profile"
                  text="Profile"
                />

                <GlassItem
                  to="/change-password"
                  text="Change Password"
                />
              </>
            )}

            {/* STUDENT */}

            {user?.role ===
              "STUDENT" && (
              <>
                <GlassItem
                  to="/student"
                  text="Dashboard"
                />

                <GlassItem
                  to="/student/subjects"
                  text="My Subjects"
                />

                <GlassItem
                  to="/student/attendance"
                  text="Attendance"
                />

                <GlassItem
                  to="/student/marks"
                  text="Internal Marks"
                />

                <GlassItem
                  to="/student/timetable"
                  text="Timetable"
                />

                <Divider sx={{ my: 1 }} />

                <GlassItem
                  to="/profile"
                  text="Profile"
                />

                <GlassItem
                  to="/change-password"
                  text="Change Password"
                />
              </>
            )}

          </List>
        </Paper>
      </Box>

      {/* Main Content */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 10,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;