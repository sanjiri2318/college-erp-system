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
    studentName: "",
    regNumber: "",
    semester: 0,
    totalSubjects: 0,
    attendancePercentage: 0,
    averageMarks: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getStudentDashboard();

      console.log(
        "Student Dashboard Full Response:",
        res
      );

      // Handle all possible response structures
      if (res?.data) {
        setDashboard(res.data);
      } else if (res?.dashboard) {
        setDashboard(res.dashboard);
      } else {
        setDashboard(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Current Semester",
      value: dashboard?.semester ?? 0,
      icon: (
        <SchoolIcon sx={{ fontSize: 40 }} />
      ),
    },
    {
      title: "Subjects",
      value: dashboard?.totalSubjects ?? 0,
      icon: (
        <MenuBookIcon sx={{ fontSize: 40 }} />
      ),
    },
    {
      title: "Attendance %",
      value: `${
        dashboard?.attendancePercentage ?? 0
      }%`,
      icon: (
        <FactCheckIcon
          sx={{ fontSize: 40 }}
        />
      ),
    },
    {
      title: "Average Marks",
      value: dashboard?.averageMarks ?? 0,
      icon: (
        <AssignmentIcon
          sx={{ fontSize: 40 }}
        />
      ),
    },
  ];

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        Welcome,{" "}
        {dashboard?.studentName || "Student"}
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Registration Number:{" "}
        {dashboard?.regNumber || "-"}
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