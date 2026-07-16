import { useState } from "react";
import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createResult,
} from "../../api/resultApi";

import useResults from "../../components/result/useResults";

import ResultPageHeader from "../../components/result/ResultPageHeader";
import ResultTable from "../../components/result/ResultTable";
import ResultDialog from "../../components/result/ResultDialog";
import ResultDeleteDialog from "../../components/result/ResultDeleteDialog";

function ResultPage() {
  const {
    results,
    students,
    subjects,
    examTypes,
    loading,
    refresh,
  } = useResults();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [formData, setFormData] =
    useState({
      studentId: "",
      subjectId: "",
      examTypeId: "",
      remarks: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (
      [
        "studentId",
        "subjectId",
        "examTypeId",
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
    setFormData({
      studentId: "",
      subjectId: "",
      examTypeId: "",
      remarks: "",
    });

    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      await createResult(formData);

      setDialogOpen(false);

      refresh();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message
      );
    }
  };

  const filteredResults =
    results.filter((result) => {
      const matchesSearch =
        result.student?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        result.student?.regNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        result.subject?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        status === "" ||
        result.resultStatus === status;

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
      <ResultPageHeader
        results={results}
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

      <ResultTable
        results={filteredResults}
      />

      <ResultDialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        formData={formData}
        students={students}
        subjects={subjects}
        examTypes={examTypes}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <ResultDeleteDialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
      />
    </Box>
  );
}

export default ResultPage;
