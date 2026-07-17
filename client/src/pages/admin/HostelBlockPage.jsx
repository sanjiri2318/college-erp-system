import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createHostelBlock,
  updateHostelBlock,
  deleteHostelBlock,
} from "../../api/hostelBlockApi";

import useHostelBlocks from "../../components/hostelBlock/useHostelBlocks";
import useHostels from "../../components/hostel/useHostels";

import HostelBlockPageHeader from "../../components/hostelBlock/HostelBlockPageHeader";
import HostelBlockStats from "../../components/hostelBlock/HostelBlockStats";
import HostelBlockTable from "../../components/hostelBlock/HostelBlockTable";
import HostelBlockDialog from "../../components/hostelBlock/HostelBlockDialog";
import HostelBlockDeleteDialog from "../../components/hostelBlock/HostelBlockDeleteDialog";

function HostelBlockPage() {
  const {
    hostelBlocks,
    loading,
    fetchHostelBlocks,
  } = useHostelBlocks();

  const {
    hostels,
  } = useHostels();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedBlock, setSelectedBlock] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      hostelId: "",
    });

  const filteredBlocks =
    useMemo(() => {
      return hostelBlocks.filter(
        (block) =>
          block.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [hostelBlocks, search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedBlock(null);

    setFormData({
      name: "",
      hostelId: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (block) => {
    setSelectedBlock(block);

    setFormData({
      name: block.name,
      hostelId:
        block.hostelId,
    });

    setOpenDialog(true);
  };

  const handleDeleteClick = (
    block
  ) => {
    setSelectedBlock(block);
    setDeleteDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (selectedBlock) {
          await updateHostelBlock(
            selectedBlock.id,
            formData
          );
        } else {
          await createHostelBlock(
            formData
          );
        }

        setOpenDialog(false);
        fetchHostelBlocks();
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
        await deleteHostelBlock(
          selectedBlock.id
        );

        setDeleteDialog(false);
        fetchHostelBlocks();
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
      <HostelBlockPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <HostelBlockStats
        hostelBlocks={
          filteredBlocks
        }
      />

      <HostelBlockTable
        hostelBlocks={
          filteredBlocks
        }
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <HostelBlockDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        hostels={hostels}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <HostelBlockDeleteDialog
        open={deleteDialog}
        hostelBlock={
          selectedBlock
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

export default HostelBlockPage;