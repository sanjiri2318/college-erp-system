import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";

import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/studentApi";

function StudentDashboard() {
  const [dashboard, setDashboard] = useState({
    subjectCount: 0,
    attendanceCount: 0,
    marksCount: 0,
    semester: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getStudentDashboard();
        console.log("Student Dashboard:", res);

        setDashboard(res.dashboard);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Current Semester",
      value: dashboard.semester,
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Subjects",
      value: dashboard.subjectCount,
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Attendance Records",
      value: dashboard.attendanceCount,
      icon: <FactCheckIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "Internal Marks",
      value: dashboard.marksCount,
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Student Dashboard
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
}

export default StudentDashboard;