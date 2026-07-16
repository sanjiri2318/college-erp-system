import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import {
  createExamSchedule,
  updateExamSchedule,
  deleteExamSchedule,
} from "../../api/examScheduleApi";

import useExamSchedules from "../../components/examSchedule/useExamSchedules";

import ExamSchedulePageHeader from "../../components/examSchedule/ExamSchedulePageHeader";
import ExamScheduleTable from "../../components/examSchedule/ExamScheduleTable";
import ExamScheduleDialog from "../../components/examSchedule/ExamScheduleDialog";
import ExamScheduleDeleteDialog from "../../components/examSchedule/ExamScheduleDeleteDialog";

function ExamSchedulePage() {
  const {
    examSchedules,
    examTypes,
    subjects,
    faculties,
    loading,
    refresh,
  } = useExamSchedules();

  const [search, setSearch] =
    useState("");

  const [semester, setSemester] =
    useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedSchedule, setSelectedSchedule] =
    useState(null);

  const [formData, setFormData] =
    useState({
      examTypeId: "",
      subjectId: "",
      facultyId: "",
      semester: "",
      examDate: "",
      startTime: "",
      endTime: "",
      totalMarks: 100,
      hall: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (
      [
        "examTypeId",
        "subjectId",
        "facultyId",
        "semester",
        "totalMarks",
      ].includes(name)
    ) {
      newValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const openAdd = () => {
    setSelectedSchedule(null);

    setFormData({
      examTypeId: "",
      subjectId: "",
      facultyId: "",
      semester: "",
      examDate: "",
      startTime: "",
      endTime: "",
      totalMarks: 100,
      hall: "",
    });

    setDialogOpen(true);
  };

  const openEdit = (schedule) => {
    setSelectedSchedule(schedule);

    setFormData({
        examTypeId: schedule.examTypeId,
        subjectId: schedule.subjectId,
        facultyId: schedule.facultyId,
        semester: schedule.semester,

        examDate: schedule.examDate
        .split("T")[0],

        startTime: new Date(schedule.startTime)
        .toISOString()
        .slice(11, 16),

        endTime: new Date(schedule.endTime)
        .toISOString()
        .slice(11, 16),

        hall: schedule.hall,

        totalMarks: schedule.totalMarks,
    });

    setDialogOpen(true);
    };

  const openDelete = (schedule) => {
    setSelectedSchedule(schedule);
    setDeleteOpen(true);
  };

  const handleSubmit = async () => {
    try {
        const payload = {
        ...formData,

        examDate: formData.examDate,

        startTime: `${formData.examDate}T${formData.startTime}:00`,

        endTime: `${formData.examDate}T${formData.endTime}:00`,
        };

        if (selectedSchedule) {
        await updateExamSchedule(
            selectedSchedule.id,
            payload
        );
        } else {
        await createExamSchedule(
            payload
        );
        }

        setDialogOpen(false);

        refresh();
    } catch (err) {
        alert(
        err.response?.data?.message ||
        err.message
        );
    }
    };

  const handleDelete =
    async () => {
      try {
        await deleteExamSchedule(
          selectedSchedule.id
        );

        setDeleteOpen(false);

        refresh();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  const filteredSchedules =
    examSchedules.filter(
      (schedule) => {
        const matchesSearch =
          schedule.subject?.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          schedule.examType?.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          schedule.hall
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesSemester =
          semester === "" ||
          Number(
            schedule.semester
          ) === Number(semester);

        return (
          matchesSearch &&
          matchesSemester
        );
      }
    );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <ExamSchedulePageHeader
        examSchedules={
          examSchedules
        }
        search={search}
        semester={semester}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onSemesterChange={(e) =>
          setSemester(
            e.target.value
          )
        }
        onAdd={openAdd}
      />

      <ExamScheduleTable
        examSchedules={
          filteredSchedules
        }
        onEdit={openEdit}
        onDelete={(id) =>
          openDelete(
            examSchedules.find(
              (x) => x.id === id
            )
          )
        }
      />

      <ExamScheduleDialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        formData={formData}
        examTypes={examTypes}
        subjects={subjects}
        faculties={faculties}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={
          !!selectedSchedule
        }
      />

      <ExamScheduleDeleteDialog
        open={deleteOpen}
        examSchedule={
          selectedSchedule
        }
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={
          handleDelete
        }
      />
    </Box>
  );
}

export default ExamSchedulePage;