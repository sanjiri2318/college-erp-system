import { useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createSemesterGPA,
} from "../../api/semesterGPAApi";

import useSemesterGPAs from "../../components/semesterGPA/useSemesterGPAs";

import SemesterGPAPageHeader from "../../components/semesterGPA/SemesterGPAPageHeader";
import SemesterGPATable from "../../components/semesterGPA/SemesterGPATable";
import SemesterGPADialog from "../../components/semesterGPA/SemesterGPADialog";

function SemesterGPAPage() {
  const {
    semesterGPAs,
    students,
    loading,
    refresh,
  } = useSemesterGPAs();

  const [search, setSearch] =
    useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [formData, setFormData] =
    useState({
      studentId: "",
      semester: "",
      academicYear: "",
    });

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    let newValue = value;

    if (
      [
        "studentId",
        "semester",
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
      semester: "",
      academicYear: "",
    });

    setDialogOpen(true);
  };

  const handleSubmit =
    async () => {
      try {
        await createSemesterGPA(
          formData
        );

        setDialogOpen(false);

        refresh();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const filteredSemesterGPAs =
    semesterGPAs.filter(
      (item) =>
        item.student?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.student?.regNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
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
      <SemesterGPAPageHeader
        semesterGPAs={
          semesterGPAs
        }
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={openAdd}
      />

      <SemesterGPATable
        semesterGPAs={
          filteredSemesterGPAs
        }
      />

      <SemesterGPADialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        formData={formData}
        students={students}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export default SemesterGPAPage;