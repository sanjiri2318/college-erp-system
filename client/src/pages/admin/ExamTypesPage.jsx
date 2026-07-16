import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import {
  createExamType,
  updateExamType,
  deleteExamType,
} from "../../api/examTypeApi";

import useExamTypes from "../../components/examType/useExamTypes";

import ExamTypePageHeader from "../../components/examType/ExamTypePageHeader";
import ExamTypeTable from "../../components/examType/ExamTypeTable";
import ExamTypeDialog from "../../components/examType/ExamTypeDialog";
import ExamTypeDeleteDialog from "../../components/examType/ExamTypeDeleteDialog";

function ExamTypesPage() {
  const {
    examTypes,
    loading,
    refresh,
  } = useExamTypes();

  const [search, setSearch] =
    useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedExamType, setSelectedExamType] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      isFinalExam: false,
      maxInternalMarks: 40,
      maxExternalMarks: 60,
      passMarks: 50,
    });

  const filteredExamTypes =
    examTypes.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (
        name === "maxInternalMarks" ||
        name === "maxExternalMarks" ||
        name === "passMarks"
    ) {
        newValue = Number(value);
    }

    if (name === "isFinalExam") {
        newValue = value === true;
    }

    setFormData((prev) => ({
        ...prev,
        [name]: newValue,
    }));
    };

  const openAdd = () => {
    setSelectedExamType(null);

    setFormData({
      name: "",
      description: "",
      isFinalExam: false,
      maxInternalMarks: 40,
      maxExternalMarks: 60,
      passMarks: 50,
    });

    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setSelectedExamType(item);

    setFormData({
      name: item.name,
      description:
        item.description,
      isFinalExam:
        item.isFinalExam,
      maxInternalMarks:
        item.maxInternalMarks,
      maxExternalMarks:
        item.maxExternalMarks,
      passMarks:
        item.passMarks,
    });

    setDialogOpen(true);
  };

  const openDelete = (item) => {
    setSelectedExamType(item);
    setDeleteOpen(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (selectedExamType) {
          await updateExamType(
            selectedExamType.id,
            formData
          );
        } else {
          await createExamType(
            formData
          );
        }

        setDialogOpen(false);

        refresh();
      } catch (err) {
        alert(
          err.response?.data
            ?.message
        );
      }
    };

  const handleDelete =
    async () => {
      try {
        await deleteExamType(
          selectedExamType.id
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
      <ExamTypePageHeader
        examTypes={examTypes}
        search={search}
        onSearchChange={(e) =>
          setSearch(e.target.value)
        }
        onAdd={openAdd}
      />

      <ExamTypeTable
        examTypes={
          filteredExamTypes
        }
        onEdit={openEdit}
        onDelete={(id) =>
          openDelete(
            examTypes.find(
              (x) => x.id === id
            )
          )
        }
      />

      <ExamTypeDialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={
          !!selectedExamType
        }
      />

      <ExamTypeDeleteDialog
        open={deleteOpen}
        examType={
          selectedExamType
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

export default ExamTypesPage;