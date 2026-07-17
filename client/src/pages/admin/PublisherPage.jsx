import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createPublisher,
  updatePublisher,
  deletePublisher,
} from "../../api/publisherApi";

import usePublishers from "../../components/publisher/usePublishers";

import PublisherPageHeader from "../../components/publisher/PublisherPageHeader";
import PublisherStats from "../../components/publisher/PublisherStats";
import PublisherTable from "../../components/publisher/PublisherTable";
import PublisherDialog from "../../components/publisher/PublisherDialog";
import PublisherDeleteDialog from "../../components/publisher/PublisherDeleteDialog";

function PublisherPage() {
  const {
    publishers,
    loading,
    fetchPublishers,
  } = usePublishers();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedPublisher, setSelectedPublisher] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      address: "",
    });

  const filteredPublishers =
    useMemo(() => {
      return publishers.filter(
        (publisher) =>
          publisher.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      publishers,
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
    setSelectedPublisher(null);

    setFormData({
      name: "",
      address: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (publisher) => {
    setSelectedPublisher(
      publisher
    );

    setFormData({
      name:
        publisher.name || "",
      address:
        publisher.address ||
        "",
    });

    setOpenDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (
          selectedPublisher
        ) {
          await updatePublisher(
            selectedPublisher.id,
            formData
          );
        } else {
          await createPublisher(
            formData
          );
        }

        setOpenDialog(false);

        fetchPublishers();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleDeleteClick =
    (publisher) => {
      setSelectedPublisher(
        publisher
      );

      setDeleteDialog(true);
    };

  const handleDelete =
    async () => {
      try {
        await deletePublisher(
          selectedPublisher.id
        );

        setDeleteDialog(false);

        fetchPublishers();
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
      <PublisherPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <PublisherStats
        publishers={
          filteredPublishers
        }
      />

      <PublisherTable
        publishers={
          filteredPublishers
        }
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <PublisherDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={
          !!selectedPublisher
        }
      />

      <PublisherDeleteDialog
        open={deleteDialog}
        publisher={
          selectedPublisher
        }
        onClose={() =>
          setDeleteDialog(false)
        }
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default PublisherPage;