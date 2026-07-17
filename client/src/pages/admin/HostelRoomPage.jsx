import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createHostelRoom,
  updateHostelRoom,
  deleteHostelRoom,
} from "../../api/hostelRoomApi";

import useHostelRooms from "../../components/hostelRoom/useHostelRooms";
import useHostelBlocks from "../../components/hostelBlock/useHostelBlocks";

import HostelRoomPageHeader from "../../components/hostelRoom/HostelRoomPageHeader";
import HostelRoomStats from "../../components/hostelRoom/HostelRoomStats";
import HostelRoomTable from "../../components/hostelRoom/HostelRoomTable";
import HostelRoomDialog from "../../components/hostelRoom/HostelRoomDialog";
import HostelRoomDeleteDialog from "../../components/hostelRoom/HostelRoomDeleteDialog";

function HostelRoomPage() {
  const {
    hostelRooms,
    loading,
    fetchHostelRooms,
  } = useHostelRooms();

  const {
    hostelBlocks,
  } = useHostelBlocks();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedRoom, setSelectedRoom] =
    useState(null);

  const [formData, setFormData] =
    useState({
      roomNumber: "",
      hostelBlockId: "",
      capacity: "",
    });

  const filteredRooms =
    useMemo(() => {
      return hostelRooms.filter(
        (room) =>
          room.roomNumber
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [hostelRooms, search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedRoom(null);

    setFormData({
      roomNumber: "",
      hostelBlockId: "",
      capacity: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);

    setFormData({
      roomNumber:
        room.roomNumber,
      hostelBlockId:
        room.hostelBlockId,
      capacity:
        room.capacity,
    });

    setOpenDialog(true);
  };

  const handleDeleteClick = (
    room
  ) => {
    setSelectedRoom(room);
    setDeleteDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (selectedRoom) {
          await updateHostelRoom(
            selectedRoom.id,
            formData
          );
        } else {
          await createHostelRoom(
            formData
          );
        }

        setOpenDialog(false);
        fetchHostelRooms();
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
        await deleteHostelRoom(
          selectedRoom.id
        );

        setDeleteDialog(false);
        fetchHostelRooms();
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
      <HostelRoomPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <HostelRoomStats
        hostelRooms={
          filteredRooms
        }
      />

      <HostelRoomTable
        hostelRooms={
          filteredRooms
        }
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <HostelRoomDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        hostelBlocks={
          hostelBlocks
        }
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <HostelRoomDeleteDialog
        open={deleteDialog}
        hostelRoom={
          selectedRoom
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

export default HostelRoomPage;