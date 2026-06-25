import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getFacultyDashboard } from "../../api/facultyApi";

const FacultyDashboard = () => {
  const { user } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState({
    subjectCount: 0,
    studentCount: 0,
    attendanceToday: 0,
    internalMarksCount: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getFacultyDashboard();
        console.log("Dashboard API =", res);

        setDashboard(res.dashboard);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Subjects Handled",
      value: dashboard.subjectCount,
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Total Students",
      value: dashboard.studentCount,
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Attendance Today",
      value: dashboard.attendanceToday,
      icon: <FactCheckIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Internal Marks",
      value: dashboard.internalMarksCount,
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Welcome, {user?.name}
      </Typography>

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
              sx={{
                borderRadius: 3,
                boxShadow: 5,
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography color="text.secondary">
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                    >
                      {card.value}
                    </Typography>
                  </Box>

                  {card.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FacultyDashboard;