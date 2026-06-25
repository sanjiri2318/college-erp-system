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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", { replace: true });
  };

  // Don't show sidebar/navbar on change password page
  if (location.pathname === "/change-password") {
    return <Outlet />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Navbar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            College ERP
          </Typography>

          <Typography sx={{ mr: 3 }}>
            {user?.role}
          </Typography>

          <Button
            color="inherit"
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 220,
            boxSizing: "border-box",
            mt: 8,
          },
        }}
      >
        <List>
          {/* Admin Menu */}
          {user?.role === "ADMIN" && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin"
                >
                  <ListItemText primary="Admin Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/change-password"
                >
                  <ListItemText primary="Change Password" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* Faculty Menu */}
          {user?.role === "FACULTY" && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/faculty"
                >
                  <ListItemText primary="Faculty Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/faculty/subjects"
                >
                  <ListItemText primary="My Subjects" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/faculty/attendance"
                >
                  <ListItemText primary="Attendance" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/faculty/marks"
                >
                  <ListItemText primary="Internal Marks" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/change-password"
                >
                  <ListItemText primary="Change Password" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* Student Menu */}
          {user?.role === "STUDENT" && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/student"
                >
                  <ListItemText primary="Student Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/student/subjects"
                >
                  <ListItemText primary="My Subjects" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/student/attendance"
                >
                  <ListItemText primary="Attendance" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/student/marks"
                >
                  <ListItemText primary="Internal Marks" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/change-password"
                >
                  <ListItemText primary="Change Password" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: "220px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;