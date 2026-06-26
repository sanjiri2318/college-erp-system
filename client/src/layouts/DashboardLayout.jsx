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

  const drawerWidth = 220;

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

  // Hide navbar and sidebar on change password page
  if (
    location.pathname === "/change-password"
  ) {
    return <Outlet />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) =>
            theme.zIndex.drawer + 1,
        }}
      >
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
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: 8,
          },
        }}
      >
        <List>
          {/* ADMIN */}
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

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin/students"
                >
                  <ListItemText primary="Students" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin/faculty"
                >
                  <ListItemText primary="Faculty" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin/departments"
                >
                  <ListItemText primary="Departments" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin/subjects"
                >
                  <ListItemText primary="Subjects" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* FACULTY */}
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

          {/* STUDENT */}
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
          p: 4,
          mt: 8,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;