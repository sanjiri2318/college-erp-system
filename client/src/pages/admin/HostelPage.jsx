import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createHostel,
  updateHostel,
  deleteHostel,
} from "../../api/hostelApi";

import useHostels from "../../components/hostel/useHostels";

import HostelPageHeader from "../../components/hostel/HostelPageHeader";
import HostelStats from "../../components/hostel/HostelStats";
import HostelTable from "../../components/hostel/HostelTable";
import HostelDialog from "../../components/hostel/HostelDialog";
import HostelDeleteDialog from "../../components/hostel/HostelDeleteDialog";

function HostelPage() {
  const {
    hostels,
    loading,
    fetchHostels,
  } = useHostels();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedHostel, setSelectedHostel] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      gender: "",
      capacity: "",
      wardenName: "",
    });

  const filteredHostels =
    useMemo(() => {
      return hostels.filter((hostel) =>
        hostel.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [hostels, search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedHostel(null);

    setFormData({
      name: "",
      gender: "",
      capacity: "",
      wardenName: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (hostel) => {
    setSelectedHostel(hostel);

    setFormData({
      name: hostel.name,
      gender: hostel.gender,
      capacity: hostel.capacity,
      wardenName:
        hostel.wardenName,
    });

    setOpenDialog(true);
  };

  const handleDeleteClick = (
    hostel
  ) => {
    setSelectedHostel(hostel);
    setDeleteDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (selectedHostel) {
          await updateHostel(
            selectedHostel.id,
            formData
          );
        } else {
          await createHostel(
            formData
          );
        }

        setOpenDialog(false);
        fetchHostels();
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
        await deleteHostel(
          selectedHostel.id
        );

        setDeleteDialog(false);
        fetchHostels();
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
      <HostelPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <HostelStats
        hostels={
          filteredHostels
        }
      />

      <HostelTable
        hostels={
          filteredHostels
        }
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <HostelDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <HostelDeleteDialog
        open={deleteDialog}
        hostel={selectedHostel}
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

export default HostelPage;