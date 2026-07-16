import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import {
  createMarkEntry,
  updateMarkEntry,
  deleteMarkEntry,
} from "../../api/markEntryApi";

import useMarkEntries from "../../components/markEntry/useMarkEntries";

import MarkEntryPageHeader from "../../components/markEntry/MarkEntryPageHeader";
import MarkEntryTable from "../../components/markEntry/MarkEntryTable";
import MarkEntryDialog from "../../components/markEntry/MarkEntryDialog";
import MarkEntryDeleteDialog from "../../components/markEntry/MarkEntryDeleteDialog";

function MarkEntryPage() {
  const {
    markEntries,
    students,
    subjects,
    faculties,
    examTypes,
    loading,
    refresh,
  } = useMarkEntries();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedEntry, setSelectedEntry] =
    useState(null);

  const [formData, setFormData] =
    useState({
      studentId: "",
      subjectId: "",
      facultyId: "",
      examTypeId: "",
      marks: "",
      maxMarks: 100,
      remarks: "",
      status: "DRAFT",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (
      [
        "studentId",
        "subjectId",
        "facultyId",
        "examTypeId",
        "marks",
        "maxMarks",
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
    setSelectedEntry(null);

    setFormData({
      studentId: "",
      subjectId: "",
      facultyId: "",
      examTypeId: "",
      marks: "",
      maxMarks: 100,
      remarks: "",
      status: "DRAFT",
    });

    setDialogOpen(true);
  };

  const openEdit = (entry) => {
    setSelectedEntry(entry);

    setFormData({
      studentId: entry.studentId,
      subjectId: entry.subjectId,
      facultyId: entry.facultyId,
      examTypeId: entry.examTypeId,
      marks: entry.marks,
      maxMarks: entry.maxMarks,
      remarks: entry.remarks || "",
      status: entry.status,
    });

    setDialogOpen(true);
  };

  const openDelete = (entry) => {
    setSelectedEntry(entry);
    setDeleteOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedEntry) {
        await updateMarkEntry(
          selectedEntry.id,
          formData
        );
      } else {
        await createMarkEntry(
          formData
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

  const handleDelete = async () => {
    try {
      await deleteMarkEntry(
        selectedEntry.id
      );

      setDeleteOpen(false);

      refresh();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message
      );
    }
  };

  const filteredEntries =
    markEntries.filter((entry) => {
      const matchesSearch =
        entry.student?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        entry.subject?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "" ||
        entry.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

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
      <MarkEntryPageHeader
        markEntries={markEntries}
        search={search}
        status={status}
        onSearchChange={(e) =>
          setSearch(e.target.value)
        }
        onStatusChange={(e) =>
          setStatus(e.target.value)
        }
        onAdd={openAdd}
      />

      <MarkEntryTable
        markEntries={filteredEntries}
        onEdit={openEdit}
        onDelete={(id) =>
          openDelete(
            markEntries.find(
              (x) => x.id === id
            )
          )
        }
      />

      <MarkEntryDialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        formData={formData}
        students={students}
        subjects={subjects}
        faculties={faculties}
        examTypes={examTypes}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={!!selectedEntry}
      />

      <MarkEntryDeleteDialog
        open={deleteOpen}
        markEntry={selectedEntry}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={handleDelete}
      />
    </Box>
  );
}

export default MarkEntryPage;