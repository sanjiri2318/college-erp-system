import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createStudentFee,
  updateStudentFee,
  deleteStudentFee,
} from "../../api/studentFeeApi";

import useStudentFees from "../../components/studentFee/useStudentFees";
import useStudents from "../../components/student/useStudents";
import useFeeStructures from "../../components/feeStructure/useFeeStructures";

import StudentFeePageHeader from "../../components/studentFee/StudentFeePageHeader";
import StudentFeeStats from "../../components/studentFee/StudentFeeStats";
import StudentFeeTable from "../../components/studentFee/StudentFeeTable";
import StudentFeeDialog from "../../components/studentFee/StudentFeeDialog";
import StudentFeeDeleteDialog from "../../components/studentFee/StudentFeeDeleteDialog";

function StudentFeePage() {
  const {
    studentFees,
    loading,
    fetchStudentFees,
  } = useStudentFees();

  const { students } =
    useStudents();

  const { feeStructures } =
    useFeeStructures();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedStudentFee, setSelectedStudentFee] =
    useState(null);

  const [formData, setFormData] =
    useState({
      studentId: "",
      feeStructureId: "",
      amount: "",
    });

  const filteredStudentFees =
    useMemo(() => {
      return studentFees.filter(
        (fee) =>
          fee.student?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      studentFees,
      search,
    ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedStudentFee(null);

    setFormData({
      studentId: "",
      feeStructureId: "",
      amount: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (fee) => {
    setSelectedStudentFee(fee);

    setFormData({
      studentId:
        fee.studentId || "",
      feeStructureId:
        fee.feeStructureId || "",
      amount:
        fee.amount || "",
    });

    setOpenDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (
          selectedStudentFee
        ) {
          await updateStudentFee(
            selectedStudentFee.id,
            formData
          );
        } else {
          await createStudentFee(
            formData
          );
        }

        setOpenDialog(false);

        fetchStudentFees();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleDeleteClick =
    (fee) => {
      setSelectedStudentFee(
        fee
      );

      setDeleteDialog(true);
    };

  const handleDelete =
    async () => {
      try {
        await deleteStudentFee(
          selectedStudentFee.id
        );

        setDeleteDialog(false);

        fetchStudentFees();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
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
      <StudentFeePageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <StudentFeeStats
        studentFees={
          filteredStudentFees
        }
      />

      <StudentFeeTable
        studentFees={
          filteredStudentFees
        }
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <StudentFeeDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        students={students}
        feeStructures={
          feeStructures
        }
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={
          !!selectedStudentFee
        }
      />

      <StudentFeeDeleteDialog
        open={deleteDialog}
        studentFee={
          selectedStudentFee
        }
        onClose={() =>
          setDeleteDialog(false)
        }
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default StudentFeePage;