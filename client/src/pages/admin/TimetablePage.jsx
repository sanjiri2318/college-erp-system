import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios";

import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Chip,
  InputAdornment,
  Divider,
  Stack,
  Tooltip,
  IconButton,
  alpha,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilterListIcon from "@mui/icons-material/FilterList";

const DAY_OPTIONS = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
];

const DAY_COLOR = {
  MONDAY: "#1565c0",
  TUESDAY: "#6a1b9a",
  WEDNESDAY: "#00695c",
  THURSDAY: "#e65100",
  FRIDAY: "#c62828",
  SATURDAY: "#4e342e",
};

const createEmptyForm = () => ({
  day: "",
  period: "",
  roomNumber: "",
  semester: "",
  departmentId: "",
  subjectId: "",
  facultyId: "",
});

const TABLE_HEAD_BG = "#1976d2";

const headerCellSx = {
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.813rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  py: 1.75,
  borderBottom: "none",
};

function TimetableFormBody({
  formData,
  handleChange,
  departments,
  subjects,
  faculty,
}) {
  return (
    <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Day"
          name="day"
          value={formData.day ?? ""}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="">Select Day</MenuItem>
          {DAY_OPTIONS.map((d) => (
            <MenuItem key={d.value} value={d.value}>
              {d.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Period"
          name="period"
          value={formData.period ?? ""}
          onChange={handleChange}
          size="small"
          placeholder="e.g. 1, 2, 3"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Room Number"
          name="roomNumber"
          value={formData.roomNumber ?? ""}
          onChange={handleChange}
          size="small"
          placeholder="e.g. A101"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Semester"
          name="semester"
          value={formData.semester ?? ""}
          onChange={handleChange}
          size="small"
          placeholder="e.g. 3"
        />
      </Grid>

      <Grid size={12}>
        <TextField
          select
          fullWidth
          label="Department"
          name="departmentId"
          value={formData.departmentId ?? ""}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="">Select Department</MenuItem>
          {departments.map((d) => (
            <MenuItem key={d.id} value={String(d.id)}>
              {d.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={12}>
        <TextField
          select
          fullWidth
          label="Subject"
          name="subjectId"
          value={formData.subjectId ?? ""}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="">Select Subject</MenuItem>
          {subjects.map((s) => (
            <MenuItem key={s.id} value={String(s.id)}>
              {s.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={12}>
        <TextField
          select
          fullWidth
          label="Faculty"
          name="facultyId"
          value={formData.facultyId ?? ""}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="">Select Faculty</MenuItem>
          {faculty.map((f) => (
            <MenuItem key={f.id} value={String(f.id)}>
              {f.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

function TimetablePage() {
  const [timetables, setTimetables] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  const [formData, setFormData] = useState(createEmptyForm());

  const [searchText, setSearchText] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [filterFaculty, setFilterFaculty] = useState("");
  const [filterSubject, setFilterSubject] = useState("");

  const scopedSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const matchesDept = formData.departmentId
        ? String(s.departmentId) === formData.departmentId
        : true;
      const matchesSemester = formData.semester
        ? String(s.semester) === formData.semester
        : true;
      return matchesDept && matchesSemester;
    });
  }, [subjects, formData.departmentId, formData.semester]);

  const scopedFaculty = useMemo(() => {
    return faculty.filter((f) => {
      return formData.departmentId
        ? String(f.departmentId) === formData.departmentId
        : true;
    });
  }, [faculty, formData.departmentId]);

  const loadTimetables = async () => {
    try {
      setLoading(true);
      const res = await API.get("/timetable");
      setTimetables(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    const res = await API.get("/departments");
    setDepartments(res.data.data.departments || []);
  };

  const loadSubjects = async () => {
    const res = await API.get("/subjects");
    setSubjects(res.data.data.subjects || []);
  };

  const loadFaculty = async () => {
    const res = await API.get("/faculty");
    setFaculty(res.data.data.faculty || []);
  };

  useEffect(() => {
    loadTimetables();
    loadDepartments();
    loadSubjects();
    loadFaculty();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ?? "",
      ...(name === "departmentId"
        ? { subjectId: "", facultyId: "" }
        : {}),
      ...(name === "semester" ? { subjectId: "" } : {}),
    }));
  };

  const resetFormData = () => {
    setFormData(createEmptyForm());
  };

  const handleAdd = async () => {
    if (
      !formData.day ||
      !formData.period ||
      !formData.semester ||
      !formData.departmentId ||
      !formData.subjectId ||
      !formData.facultyId
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);
      await API.post("/timetable", formData);
      setOpen(false);
      resetFormData();
      loadTimetables();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create timetable entry.");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (item) => {
    setSelectedTimetable(item);
    setFormData({
      day: item.day || "",
      period: item.period ? String(item.period) : "",
      roomNumber: item.roomNumber || "",
      semester: item.semester ? String(item.semester) : "",
      departmentId: item.departmentId ? String(item.departmentId) : "",
      subjectId: item.subjectId ? String(item.subjectId) : "",
      facultyId: item.facultyId ? String(item.facultyId) : "",
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedTimetable) {
      return;
    }

    if (
      !formData.day ||
      !formData.period ||
      !formData.semester ||
      !formData.departmentId ||
      !formData.subjectId ||
      !formData.facultyId
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);
      await API.put(`/timetable/${selectedTimetable.id}`, formData);
      setEditOpen(false);
      setSelectedTimetable(null);
      resetFormData();
      loadTimetables();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update timetable entry.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timetable entry?")) {
      return;
    }

    try {
      await API.delete(`/timetable/${id}`);
      loadTimetables();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete timetable entry.");
    }
  };

  const filteredTimetables = useMemo(() => {
    const q = searchText.toLowerCase().trim();

    return timetables.filter((t) => {
      const matchesDept = filterDept ? String(t.departmentId) === filterDept : true;
      const matchesSemester = filterSemester ? String(t.semester) === filterSemester : true;
      const matchesFaculty = filterFaculty ? String(t.facultyId) === filterFaculty : true;
      const matchesSubject = filterSubject ? String(t.subjectId) === filterSubject : true;

      if (!matchesDept || !matchesSemester || !matchesFaculty || !matchesSubject) {
        return false;
      }

      if (!q) {
        return true;
      }

      return (
        t.subject?.name?.toLowerCase().includes(q) ||
        t.subject?.code?.toLowerCase().includes(q) ||
        t.faculty?.name?.toLowerCase().includes(q) ||
        t.roomNumber?.toLowerCase().includes(q) ||
        t.day?.toLowerCase().includes(q) ||
        t.department?.name?.toLowerCase().includes(q) ||
        t.department?.code?.toLowerCase().includes(q) ||
        String(t.period || "").includes(q) ||
        String(t.semester || "").includes(q)
      );
    });
  }, [
    timetables,
    searchText,
    filterDept,
    filterSemester,
    filterFaculty,
    filterSubject,
  ]);

  const stats = useMemo(() => {
    const uniqueDepartments = new Set(filteredTimetables.map((t) => t.departmentId));
    const uniqueFaculty = new Set(filteredTimetables.map((t) => t.facultyId));
    const uniqueSubjects = new Set(filteredTimetables.map((t) => t.subjectId));

    return {
      total: filteredTimetables.length,
      departments: uniqueDepartments.size,
      faculty: uniqueFaculty.size,
      subjects: uniqueSubjects.size,
    };
  }, [filteredTimetables]);

  const dialogPaperProps = {
    sx: { borderRadius: 4, p: 1 },
  };

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 3, maxWidth: 1400, mx: "auto" }}>
      <Box
        display="flex"
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={2}
        mb={3}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: TABLE_HEAD_BG,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CalendarMonthIcon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              Timetable Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage class schedules across departments
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetFormData();
            setOpen(true);
          }}
          sx={{
            borderRadius: 2,
            px: 2.5,
            py: 1,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 2px 8px rgba(25,118,210,0.35)",
            "&:hover": { boxShadow: "0 4px 14px rgba(25,118,210,0.45)" },
          }}
        >
          Add Timetable
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            bgcolor: "#fafafa",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <TextField
            size="small"
            placeholder="Search subject, faculty, room, day..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ minWidth: 260, flex: 1 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            <FilterListIcon fontSize="small" color="action" />

            <TextField
              select
              size="small"
              label="Department"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All</MenuItem>
              {departments.map((d) => (
                <MenuItem key={d.id} value={String(d.id)}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Semester"
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              sx={{ minWidth: 130 }}
            >
              <MenuItem value="">All</MenuItem>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <MenuItem key={sem} value={String(sem)}>
                  Semester {sem}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Faculty"
              value={filterFaculty}
              onChange={(e) => setFilterFaculty(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All</MenuItem>
              {faculty.map((f) => (
                <MenuItem key={f.id} value={String(f.id)}>
                  {f.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Subject"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All</MenuItem>
              {subjects.map((s) => (
                <MenuItem key={s.id} value={String(s.id)}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>

        <Box
          sx={{
            px: 2.5,
            py: 1.25,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "#fcfcfc",
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Chip label={`Records: ${stats.total}`} size="small" />
          <Chip label={`Departments: ${stats.departments}`} size="small" />
          <Chip label={`Faculty: ${stats.faculty}`} size="small" />
          <Chip label={`Subjects: ${stats.subjects}`} size="small" />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ bgcolor: TABLE_HEAD_BG }}>
              <TableRow>
                {["Day", "Period", "Subject", "Faculty", "Room", "Semester", "Department", "Actions"].map(
                  (col) => (
                    <TableCell key={col} sx={headerCellSx}>
                      {col}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={36} thickness={4} />
                    <Typography variant="body2" color="text.secondary" mt={1.5}>
                      Loading timetable data...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : filteredTimetables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 7 }}>
                    <CalendarMonthIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
                      No Timetable Records Found
                    </Typography>
                    <Typography variant="body2" color="text.disabled" mt={0.5}>
                      {searchText || filterDept || filterSemester || filterFaculty || filterSubject
                        ? "Try adjusting your search or filters."
                        : 'Click "Add Timetable" to create the first entry.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTimetables.map((t, idx) => (
                  <TableRow
                    key={t.id}
                    sx={{
                      bgcolor: idx % 2 === 0 ? "#fff" : alpha("#1976d2", 0.03),
                      "&:hover": {
                        bgcolor: alpha("#1976d2", 0.07),
                        transition: "background-color 0.15s",
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={t.day}
                        size="small"
                        sx={{
                          bgcolor: alpha(DAY_COLOR[t.day] ?? "#555", 0.1),
                          color: DAY_COLOR[t.day] ?? "#555",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          height: 22,
                          letterSpacing: "0.03em",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          bgcolor: alpha(TABLE_HEAD_BG, 0.1),
                          color: TABLE_HEAD_BG,
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        {t.period}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight={600} color="text.primary">
                        {t.subject?.name ?? "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {t.faculty?.name ?? "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "monospace",
                          bgcolor: "#f5f5f5",
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          display: "inline-block",
                        }}
                      >
                        {t.roomNumber ?? "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        Sem {t.semester}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {t.department?.code ?? "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => openEdit(t)}
                            sx={{
                              color: TABLE_HEAD_BG,
                              bgcolor: alpha(TABLE_HEAD_BG, 0.08),
                              "&:hover": { bgcolor: alpha(TABLE_HEAD_BG, 0.18) },
                              borderRadius: 1.5,
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(t.id)}
                            sx={{
                              color: "error.main",
                              bgcolor: alpha("#d32f2f", 0.08),
                              "&:hover": { bgcolor: alpha("#d32f2f", 0.18) },
                              borderRadius: 1.5,
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        slotProps={{ paper: dialogPaperProps }}
      >
        <DialogTitle sx={{ pb: 0.5 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AddIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Add Timetable Entry
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Fill in the details to schedule a new class period.
          </Typography>
        </DialogTitle>

        <Divider sx={{ mt: 1.5 }} />

        <DialogContent sx={{ pt: 2.5 }}>
          <TimetableFormBody
            formData={formData}
            handleChange={handleChange}
            departments={departments}
            subjects={scopedSubjects}
            faculty={scopedFaculty}
          />
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={saving}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Save Entry
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="md"
        slotProps={{ paper: dialogPaperProps }}
      >
        <DialogTitle sx={{ pb: 0.5 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EditIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Edit Timetable Entry
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Update the details for this scheduled period.
          </Typography>
        </DialogTitle>

        <Divider sx={{ mt: 1.5 }} />

        <DialogContent sx={{ pt: 2.5 }}>
          <TimetableFormBody
            formData={formData}
            handleChange={handleChange}
            departments={departments}
            subjects={scopedSubjects}
            faculty={scopedFaculty}
          />
        </DialogContent>

        <Divider />

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button
            onClick={() => setEditOpen(false)}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={saving}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 3,
            }}
          >
            Update Entry
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TimetablePage;
