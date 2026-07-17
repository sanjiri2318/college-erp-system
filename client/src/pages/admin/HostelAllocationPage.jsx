import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  allocateBed,
  checkoutAllocation,
  deleteAllocation,
} from "../../api/hostelAllocationApi";

import useHostelAllocations from "../../components/hostelAllocation/useHostelAllocations";
import useStudents from "../../components/student/useStudents";
import useHostelBeds from "../../components/hostelBed/useHostelBeds";

import HostelAllocationPageHeader from "../../components/hostelAllocation/HostelAllocationPageHeader";
import HostelAllocationStats from "../../components/hostelAllocation/HostelAllocationStats";
import HostelAllocationTable from "../../components/hostelAllocation/HostelAllocationTable";
import HostelAllocationDialog from "../../components/hostelAllocation/HostelAllocationDialog";
import HostelAllocationDeleteDialog from "../../components/hostelAllocation/HostelAllocationDeleteDialog";

function HostelAllocationPage() {
  const {
    hostelAllocations,
    loading,
    fetchHostelAllocations,
  } = useHostelAllocations();

  const { students } =
    useStudents();

  const { hostelBeds } =
    useHostelBeds();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedAllocation, setSelectedAllocation] =
    useState(null);

  const [formData, setFormData] =
    useState({
      studentId: "",
      hostelBedId: "",
      checkInDate: "",
    });

  const filteredAllocations =
    useMemo(() => {
      return hostelAllocations.filter(
        (allocation) =>
          allocation.student?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      hostelAllocations,
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
      hostelBedId: "",
      checkInDate: "",
    });

    setOpenDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        await allocateBed(
          formData
        );

        setOpenDialog(false);

        fetchHostelAllocations();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleCheckout =
    async (allocation) => {
      try {
        await checkoutAllocation(
          allocation.id
        );

        fetchHostelAllocations();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleDeleteClick =
    (allocation) => {
      setSelectedAllocation(
        allocation
      );

      setDeleteDialog(true);
    };

  const handleDelete =
    async () => {
      try {
        await deleteAllocation(
          selectedAllocation.id
        );

        setDeleteDialog(false);

        fetchHostelAllocations();
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
      <HostelAllocationPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <HostelAllocationStats
        hostelAllocations={
          filteredAllocations
        }
      />

      <HostelAllocationTable
        hostelAllocations={
          filteredAllocations
        }
        onCheckout={
          handleCheckout
        }
        onDelete={
          handleDeleteClick
        }
      />

      <HostelAllocationDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        students={students}
        hostelBeds={
          hostelBeds
        }
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <HostelAllocationDeleteDialog
        open={deleteDialog}
        allocation={
          selectedAllocation
        }
        onClose={() =>
          setDeleteDialog(false)
        }
        onDelete={
          handleDelete
        }
      />
    </Box>
  );
}

export default HostelAllocationPage;