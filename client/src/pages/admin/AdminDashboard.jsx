import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getDashboardAnalytics } from "../../api/dashboardApi";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalDepartments: 0,
    totalSubjects: 0,
    totalAttendanceRecords: 0,
    totalInternalMarks: 0,
  });

  const [analytics, setAnalytics] = useState({
    studentsByDepartment: [],
    facultyByDepartment: [],
    subjectsBySemester: [],
  });

  useEffect(() => {
    fetchDashboard();
    fetchAnalytics();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/admin");
      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await getDashboardAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Students",
      value: dashboard.totalStudents,
    },
    {
      title: "Faculty",
      value: dashboard.totalFaculty,
    },
    {
      title: "Departments",
      value: dashboard.totalDepartments,
    },
    {
      title: "Subjects",
      value: dashboard.totalSubjects,
    },
    {
      title: "Attendance",
      value: dashboard.totalAttendanceRecords,
    },
    {
      title: "Internal Marks",
      value: dashboard.totalInternalMarks,
    },
  ];

  const COLORS = [
    "#1976d2",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
  ];

  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={card.title}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: 170,
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                    color: "#1976d2",
                  }}
                >
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid
        container
        spacing={3}
        sx={{ mt: 2 }}
      >
        {/* Students */}
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 450,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Students by Department
            </Typography>

            <ResponsiveContainer
              width="100%"
              height="90%"
            >
              <BarChart
                data={analytics.studentsByDepartment}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="count"
                  fill="#1976d2"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Faculty */}
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 450,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Faculty by Department
            </Typography>

            <ResponsiveContainer
              width="100%"
              height="90%"
            >
              <PieChart>
                <Pie
                  data={analytics.facultyByDepartment}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={2}
                  label
                >
                  {analytics.facultyByDepartment.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Subjects */}
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              height: 450,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
            >
              Subjects by Semester
            </Typography>

            <ResponsiveContainer
              width="100%"
              height="90%"
            >
              <BarChart
                data={analytics.subjectsBySemester}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />

                <Bar
                  dataKey="count"
                  fill="#2e7d32"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;