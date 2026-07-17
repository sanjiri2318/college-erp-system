import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createHostelBed,
  updateHostelBed,
  deleteHostelBed,
} from "../../api/hostelBedApi";

import useHostelBeds from "../../components/hostelBed/useHostelBeds";
import useHostelRooms from "../../components/hostelRoom/useHostelRooms";

import HostelBedPageHeader from "../../components/hostelBed/HostelBedPageHeader";
import HostelBedStats from "../../components/hostelBed/HostelBedStats";
import HostelBedTable from "../../components/hostelBed/HostelBedTable";
import HostelBedDialog from "../../components/hostelBed/HostelBedDialog";
import HostelBedDeleteDialog from "../../components/hostelBed/HostelBedDeleteDialog";

function HostelBedPage() {
  const {
    hostelBeds,
    loading,
    fetchHostelBeds,
  } = useHostelBeds();

  const {
    hostelRooms,
  } = useHostelRooms();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedBed, setSelectedBed] =
    useState(null);

  const [formData, setFormData] =
    useState({
      bedNumber: "",
      hostelRoomId: "",
      status: "AVAILABLE",
    });

  const filteredBeds =
    useMemo(() => {
      return hostelBeds.filter((bed) =>
        bed.bedNumber
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [hostelBeds, search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedBed(null);

    setFormData({
      bedNumber: "",
      hostelRoomId: "",
      status: "AVAILABLE",
    });

    setOpenDialog(true);
  };

  const handleEdit = (bed) => {
    setSelectedBed(bed);

    setFormData({
      bedNumber: bed.bedNumber,
      hostelRoomId:
        bed.hostelRoomId,
      status: bed.status,
    });

    setOpenDialog(true);
  };

  const handleDeleteClick = (
    bed
  ) => {
    setSelectedBed(bed);
    setDeleteDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (selectedBed) {
          await updateHostelBed(
            selectedBed.id,
            formData
          );
        } else {
          await createHostelBed(
            formData
          );
        }

        setOpenDialog(false);
        fetchHostelBeds();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleDelete =
    async () => {
      try {
        await deleteHostelBed(
          selectedBed.id
        );

        setDeleteDialog(false);
        fetchHostelBeds();
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
      <HostelBedPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <HostelBedStats
        hostelBeds={
          filteredBeds
        }
      />

      <HostelBedTable
        hostelBeds={
          filteredBeds
        }
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <HostelBedDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        hostelRooms={
          hostelRooms
        }
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <HostelBedDeleteDialog
        open={deleteDialog}
        hostelBed={
          selectedBed
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

export default HostelBedPage;