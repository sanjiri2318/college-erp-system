import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createFeePayment,
  deletePayment,
} from "../../api/feePaymentApi";

import useFeePayments from "../../components/feePayment/useFeePayments";
import useStudents from "../../components/student/useStudents";

import FeePaymentPageHeader from "../../components/feePayment/FeePaymentPageHeader";
import FeePaymentStats from "../../components/feePayment/FeePaymentStats";
import FeePaymentTable from "../../components/feePayment/FeePaymentTable";
import FeePaymentDialog from "../../components/feePayment/FeePaymentDialog";
import FeePaymentDeleteDialog from "../../components/feePayment/FeePaymentDeleteDialog";

function FeePaymentPage() {
  const {
    feePayments,
    loading,
    fetchFeePayments,
  } = useFeePayments();

  const {
    students,
  } = useStudents();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [formData, setFormData] =
    useState({
      studentId: "",
      amount: "",
      paymentMethod: "",
      paymentDate: "",
    });

  const filteredPayments =
    useMemo(() => {
      return feePayments.filter(
        (payment) =>
          payment.student?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      feePayments,
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
    setFormData({
      studentId: "",
      amount: "",
      paymentMethod: "",
      paymentDate: "",
    });

    setOpenDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        await createFeePayment(
          formData
        );

        setOpenDialog(false);

        fetchFeePayments();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleDeleteClick =
    (payment) => {
      setSelectedPayment(
        payment
      );

      setDeleteDialog(true);
    };

  const handleDelete =
    async () => {
      try {
        await deletePayment(
          selectedPayment.id
        );

        setDeleteDialog(false);

        fetchFeePayments();
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
      <FeePaymentPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <FeePaymentStats
        feePayments={
          filteredPayments
        }
      />

      <FeePaymentTable
        feePayments={
          filteredPayments
        }
        onDelete={
          handleDeleteClick
        }
      />

      <FeePaymentDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        students={students}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <FeePaymentDeleteDialog
        open={deleteDialog}
        payment={
          selectedPayment
        }
        onClose={() =>
          setDeleteDialog(false)
        }
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default FeePaymentPage;