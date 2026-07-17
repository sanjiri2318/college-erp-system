import { useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createCGPA,
} from "../../api/cgpaApi";

import useCGPAs from "../../components/cgpa/useCGPAs";

import CGPAPageHeader from "../../components/cgpa/CGPAPageHeader";
import CGPATable from "../../components/cgpa/CGPATable";
import CGPADialog from "../../components/cgpa/CGPADialog";

function CGPAPage() {
  const {
    cgpas,
    students,
    loading,
    refresh,
  } = useCGPAs();

  const [search, setSearch] =
    useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [formData, setFormData] =
    useState({
      studentId: "",
      academicYear: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "studentId") {
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
      academicYear: "",
    });

    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      await createCGPA(formData);

      setDialogOpen(false);

      refresh();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.message
      );
    }
  };

  const filteredCGPAs =
    cgpas.filter(
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
      <CGPAPageHeader
        cgpas={cgpas}
        search={search}
        onSearchChange={(e) =>
          setSearch(e.target.value)
        }
        onAdd={openAdd}
      />

      <CGPATable
        cgpas={filteredCGPAs}
      />

      <CGPADialog
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

export default CGPAPage;